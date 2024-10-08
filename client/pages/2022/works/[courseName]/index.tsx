import * as React from "react";

import { NotionPage } from "@/components/NotionPage";
import { resolveNotionPage } from "@/lib/resolve-notion-page";
import XWrapper from "components/x-wrapper";
import { getPageProperty, parsePageId } from "notion-utils";
import { domain, isDev } from "@/lib/config";
import backButtonImg from "assets/back-button.png";
import { PageProps, Params } from "@/lib/types";
import courseList from 'wordings/course'
import { useRouter } from "next/router";
import Image from "next/image";


const DATABASE_ID = "9ef7308ccb9a497faa98df8561eab643";
export const getStaticProps = async () => {
  try {

    const props: PageProps = await resolveNotionPage(domain, DATABASE_ID);
    return { props, revalidate: 10 };
  } catch (err) {
    console.error("page error", domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

interface StaticPageProps {
  courseName: string;
  params?: string;
}

export function getStaticPaths(): {
  paths: { params: StaticPageProps }[];
  fallback: boolean;
} {
  const courseNameList = courseList.map((course) => course.path);

  const staticPaths = {
    paths: courseNameList.map((name: string) => {
      return {
        params: {
          courseName: name,
        },
      };
    }),
    fallback: false,
  };

  return staticPaths;
}

export default function CoursePage(props: PageProps) {
  const router = useRouter();
  const courseName = router.query.courseName as string;
  const pageId = parsePageId(props.pageId);
  const recordMap = props.recordMap!;
  const collection = recordMap.collection;
  const block = recordMap.block
  // block to array
  const blockArray = Object.keys(block).map((key) => block[key].value);
  // filter out the collection view
  const pages = blockArray.filter(
    (block) => block?.type === "page" && block?.parent_id === "989f931c-a428-4d70-8094-879dbffedfe2"
  )

  // get a item from collection that item.value.parent_id is equal to the dbId
  const pageData = Object.values(collection).find((item: any) => {
    // if item has value and value has parent_id
    if (item && item.value && item.value.parent_id) {
      // if item.value.parent_id without - is equal to dbId
      if (item.value.parent_id.replace(/-/g, "") === DATABASE_ID) {
        return item;
      }
    }
  });

  const schema = pageData?.value.schema || {};
  // convert schema to array w/ name
  const schemaArray = Object.values(schema).map((item) => {
    return item.name;
  });

  const pageBlock = recordMap.block[pageId].value;

  // get page properties object from pageBlock with schemaArray
  const pageProperties: { [x: string]: string | undefined } = {};
  schemaArray.map((item) => {
    pageProperties[item] = getPageProperty<string>(item, pageBlock, recordMap);
  });

  //  <div className="flex-1 w-screen bg-white align-center-top">

  const courseData = courseList.find((course) => course.path === courseName);
  return (
    <>
      <div className="w-screen h-fit md:h-[215px] flex justify-center items-center content-center text-primary text-2xl font-bold p-6">
        <XWrapper className="justify-between md:mt-3 md:pb-12 border-b border-b-primary">
          <div className="flex flex-1 md:flex-row">
            <div
              className="mr-4 md:hidden"
              onClick={() => {
                router.back();
              }}
            >
              <Image
                src={backButtonImg}
                alt="button"
                width={14}
                height={7}
                className="mt-2"
              />
            </div>
            <div className="flex flex-col relative md:flex-row justify-start items-start h-full flex-1 text-base tracking-wide">
              <div
                className="absolute -left-[74px] hidden md:block cursor-pointer"
                onClick={() => {
                  router.back();
                }}
              >
                <Image
                  src={backButtonImg}
                  alt="button"
                  layout="intrinsic"
                  width={14}
                  height={7}
                  className="relative mt-2"
                />
              </div>
              <div className="flex flex-col relative ml-[0.3rem] ">
                <h1 className="font-bold text-[1.2rem] leading-6 ">{courseData?.korean_text}</h1>
                <h1 className="mt-[4px] font-bold text-[1.2rem] leading-6  ">{courseData?.english_text}</h1>

                <h2 className="text-[1.1rem] leading-6 -tracking-[0.2px] mt-5">지도교수 | {courseData?.advisor}</h2>
                <h2 className="text-[1.1rem] leading-6 -tracking-[0.2px]">Advisor | {courseData?.advisor_eng}</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start h-full flex-1 mytext-2 pr-4 py-6 md:py-0">
            <p className=" ">
              {courseData?.description}
            </p>
          </div>
        </XWrapper>
      </div>
      <XWrapper>
        <NotionPage {...props} />
      </XWrapper>
    </>
  );
}
