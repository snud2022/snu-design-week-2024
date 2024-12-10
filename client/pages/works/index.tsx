import * as React from "react";

import { NotionPage } from "@/components/NotionPage";
import { resolveNotionPage } from "@/lib/resolve-notion-page";
import XWrapper from "components/x-wrapper";
import { getPageProperty, parsePageId } from "notion-utils";
import { domain } from "@/lib/config";
import { PageProps } from "@/lib/types";
import courseList from "wordings/course";
import { useRouter } from "next/router";

import CONFIGS from "configs";
import { useState } from "react";
import useCourseStore from "store/courseStore";
import PCTitle from "components/pc-title";
import _useWindowSize from "utils/useWindowSize";
import Image from "next/image";
import SearchAndInstagram from "components/search-and-instagram";
import useSearchStore from "store/searchStore";

const DATABASE_ID = CONFIGS.databaseId;

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

export default function CoursePage(props: PageProps) {
  const router = useRouter();

  const courseName = useCourseStore((state) => state.courseName);
  const setCourseName = useCourseStore((state) => state.setCourseName);

  const courseData = courseList.find((course) => course.path === courseName);
  const courseTitle = courseData?.title;
  const path = courseData?.path;
  const titleList = courseList.map((value) => value.title);

  const pageId = parsePageId(props.pageId);
  const recordMap = props.recordMap!;
  const collection = recordMap.collection;
  React.useLayoutEffect(() => {
    setCourseName("brand-design");
    return () => {
      setCourseName("");
    };
  }, [setCourseName]);

  const setSearchText = useSearchStore((state) => state.setSearchText);

  React.useLayoutEffect(() => {
    setSearchText("");
  }, [setSearchText]);

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

  const { isMobileView } = _useWindowSize();
  //  <div className="flex-1 w-screen bg-white align-center-top">

  const [isClassListOpen, setIsClassListOpen] = useState(false);

  const isClassListShown = isMobileView && isClassListOpen;

  return (
    <>
      <div className="w-screen h-full flex-col flex justify-center items-center content-center text-primary text-2xl font-bold py-[20px] pt-[92px]">
        <div className="hidden md:flex w-full h-[88px] justify-end items-center">
          <SearchAndInstagram />
        </div>

        <PCTitle imgsrc="/img/pc-title-work.svg" className="mb-5" />
        <div
          className="flex flex-row gap-[10px] md:hidden w-fit self-center border-b-2 border-b-[#00BD84] cursor-pointer"
          onClick={() => setIsClassListOpen(!isClassListOpen)}
        >
          <p className="text-[30px] font-semibold leading-[30px] text-center max-w-[200px]">
            {courseTitle?.toUpperCase()}
          </p>
          <Image
            src={"/img/dropDown.svg"}
            alt="title"
            width={15}
            height={10}
            className={`transition-all duration-300 ${
              isClassListOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        <div
          className={`flex flex-col items-center transition-all duration-300 ${
            isClassListShown
              ? "flex opacity-100 gap-[30px] h-fit my-[50px]"
              : "flex opacity-0 gap-0 h-0"
          }`}
        >
          {courseList.map((value, index) => {
            return (
              <p
                key={`class-${index}`}
                className={`text-[24px] font-semibold leading-[30px] cursor-pointer ${
                  isClassListShown ? "top-0" : "-top-10"
                }`}
                onClick={() => {
                  setCourseName(value.path);
                  setIsClassListOpen(false);
                }}
              >
                {value.title.toUpperCase()}
              </p>
            );
          })}
        </div>

        <XWrapper className="hidden md:flex justify-between ">
          {courseList.map((value, index) => {
            const isSelected = courseTitle === value.title;
            const opacityClassName = isSelected ? "" : "opacity-20";
            return (
              <div
                key={`titlebutton-${index}`}
                className={
                  "h-fit rounded-full  outline-2 border-primary py-[10px] px-[22px] text-center shadow-inner cursor-pointer " +
                  opacityClassName +
                  " hover:opacity-100"
                }
                onClick={() => {
                  setCourseName(value.path);
                }}
              >
                <p className="font-semibold text-[16px] leading-[19px]">
                  {value.title}
                </p>
              </div>
            );
          })}
        </XWrapper>

        <div
          className={`flex flex-col justify-center items-center transition-all duration-300 ${
            !isClassListShown ? "opacity-100 h-fit" : "opacity-0 h-0"
          }`}
        >
          <XWrapper className="flex flex-col md:flex-col px-[20px] justify-between gap-6 my-[50px] ">
            <div>
              <div className="flex flex-col relative md:flex-row justify-start items-start h-full flex-1 text-base tracking-wide">
                <div className="flex flex-col relative ">
                  <h1 className="font-bold text-[24px] leading-[24px] md:text-3xl md:leading-3xl ">
                    {courseData?.korean_text}
                  </h1>
                  <h1 className="mt-[4px] font-bold text-3xl leading-3xl hidden md:block  ">
                    {courseData?.english_text}
                  </h1>
                  <h2 className="text-[14px] md:text-[20px] font-bold leading-6 -tracking-[0.2px] mt-5">
                    지도교수 | {courseData?.advisor}
                  </h2>
                  <h2 className="text-[14px] md:text-[16px] leading-6 -tracking-[0.2px]">
                    Advisor | {courseData?.advisor_eng}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-8 text-[15px] leading-[160%]">
              <div className="flex flex-col justify-start items-start h-full flex-1">
                <p className=" ">{courseData?.description}</p>
              </div>
              <div className="hidden md:flex flex-col justify-start items-start h-full flex-1 ">
                <p className=" ">{courseData?.description_eng}</p>
              </div>
            </div>
          </XWrapper>
          <XWrapper>
            <NotionPage {...props} />
          </XWrapper>
        </div>
      </div>
    </>
  );
}
