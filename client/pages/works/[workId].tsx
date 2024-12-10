import * as React from "react";

import { NotionPage } from "@/components/NotionPage";
import { domain, isDev } from "@/lib/config";
import { resolveNotionPage } from "@/lib/resolve-notion-page";
import { PageBlock, PageProps } from "@/lib/types";
import XWrapper from "components/x-wrapper";
import { getPageProperty, idToUuid, parsePageId } from "notion-utils";
import { FiInstagram } from "@react-icons/all-files/fi/FiInstagram";
import { getSiteMap } from "@/lib/get-site-map";
import courseList from "wordings/course";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import Link from "next/link";
import { HiArrowNarrowLeft } from "@react-icons/all-files/hi/HiArrowNarrowLeft";
import { HiArrowNarrowRight } from "@react-icons/all-files/hi/HiArrowNarrowRight";
import CONFIGS from "configs";
import { mapImageUrl } from "@/lib/map-image-url";
import getGroup from "utils/getGroup";
const DATABASE_ID = CONFIGS.databaseId;
const VIEW_ID = "1192cfba780a8116a18d000c0625e864";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config.js";
import { useWindowScroll } from "react-use";
import { ArrowRight } from "icons/ArrowRight";
import { ArrowLeft } from "icons/ArrowLeft";
import Image from "next/image";
import _useWindowSize from "utils/useWindowSize";
import Head from "next/head";

export const getStaticProps = async (context: {
  params: { courseName: any; workId: any };
}) => {
  const { courseName, workId } = context.params;
  try {
    // parse pageId from url
    const pageId = parsePageId(workId);

    const props: PageProps = await resolveNotionPage(domain, pageId);

    const entireDatabaseProps: PageProps = await resolveNotionPage(
      domain,
      DATABASE_ID
    );
    return {
      props: {
        ...props,
        entireDatabaseProps,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.error("page error", domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

export async function getStaticPaths() {
  // if (isDev) {
  //   return {
  //     paths: [],
  //     fallback: true
  //   }
  // }

  const siteMap = await getSiteMap();
  const nowDomain = isDev ? "localhost:3000" : domain;
  const props: PageProps = await resolveNotionPage(nowDomain, DATABASE_ID);
  const block = props?.recordMap?.block;
  // block to array
  const blockArray = Object.keys(block).map((key) => block[key].value);
  // filter out the collection view
  const pages = blockArray.filter(
    (block) =>
      block?.type === "page" && block?.parent_id === idToUuid(DATABASE_ID)
  );
  const courseNameList = courseList.map((course) => course.path);
  interface Path {
    params: { courseName: string; workId: string };
  }
  const paths: Path[] = [];
  courseNameList.map((courseName) => {
    const newPaths: Path[] = pages
      .map((page) => {
        if (!page?.properties) return;
        const title = page.properties.title?.[0][0] as string;
        const pageCourseName = page.properties?.vABH?.[0][0];

        const pageId = page.id;
        const cannonicalPageId = Object.keys(siteMap.canonicalPageMap).find(
          (key) => siteMap.canonicalPageMap[key] === pageId
        );

        if (pageCourseName === courseName) {
          return {
            params: {
              courseName: courseName,

              workId: cannonicalPageId,
            },
          };
        }
      })
      .filter((path) => path !== undefined) as Path[];
    paths.push(...newPaths);
  });

  const staticPaths = {
    paths: paths,
    fallback: true,
  };

  return staticPaths;
}

export default function WorkPage(
  props: PageProps & {
    entireDatabaseProps: PageProps;
  }
) {
  const pageId = parsePageId(props.pageId);
  const recordMap = props.recordMap!;

  const entireDatabaseProps = props.entireDatabaseProps!;

  const router = useRouter();
  if (!props.recordMap) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const collection = recordMap.collection;
  const topRef = React.useRef<HTMLDivElement>(null);

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
  // get blocks without pageBlock
  const blocks = Object.values(recordMap.block).filter(
    (block) => block.value?.id !== pageId
  );
  // console.log("BLOCKs", blocks);
  // get types of blocks
  const blockTypes = blocks.map((block) => block.value?.type);
  // print blockTypes
  // console.log("BLOCK TYPES", blockTypes);

  // get page properties object from pageBlock with schemaArray
  const pageProperties: { [x: string]: string | undefined } = {};
  schemaArray.map((item) => {
    pageProperties[item] = getPageProperty<string>(item, pageBlock, recordMap);
  });
  const socialImage = mapImageUrl(
    getPageProperty<string>("Social Image", pageBlock, recordMap) ||
      (pageBlock as PageBlock).format?.page_cover ||
      "",
    pageBlock
  );
  const coverPosition = (pageBlock as PageBlock).format?.page_cover_position;

  const allowedTypes = [
    "text",
    "image",
    "video",
    "embed",
    "collection_view",
    "column",
    "column_list",
    "header",
    "page",
  ];

  // filter blocks with allowedTypes
  const filteredBlocks = blocks.filter((block) => {
    const type = block.value?.type;
    if (allowedTypes.includes(type)) {
      return block;
    }
  });

  // inject filteredBlocks and pageBlock to props
  const newProps = {
    ...props,
    recordMap: {
      ...recordMap,
      block: {
        [pageId]: {
          ...recordMap.block[pageId],
        },
        ...filteredBlocks.reduce((acc, block) => {
          // @ts-ignore
          acc[block?.value?.id] = block;
          return acc;
        }, {}),
      },
    },
  };
  const anotherWorkPath = pageProperties["다른 작품 링크"]?.replace(
    "https://snudesignweek.com",
    ""
  );

  function scrollTop() {
    if (topRef.current) {
      topRef.current.scrollIntoView();
      window.scrollTo({
        top: topRef.current.offsetTop,
      });
    }
  }
  React.useEffect(() => {
    // scroll to topRef over 60px when page is loaded
    scrollTop();
  }, [pageId]);

  const entireRecordMap = entireDatabaseProps.recordMap;

  const group = React.useMemo(() => {
    if (!entireRecordMap) return;

    const collectionId = "1192cfba-780a-8135-80b7-000b2aaefd43";

    const collectionViewId = idToUuid(VIEW_ID);
    const collectionData =
      entireRecordMap?.collection_query[collectionId]?.[collectionViewId];

    const collectionView =
      entireRecordMap?.collection_view[collectionViewId]?.value;
    const courseName = getPageProperty<string>("수업", pageBlock, recordMap)[0];

    const group = getGroup({ collectionView, collectionData, courseName });
    return group;
  }, [entireRecordMap]);

  const groupBlockIds: string[] = group?.blockIds;

  const pageIndex = groupBlockIds.findIndex((id) => id === pageId);

  const prevId =
    pageIndex > 0
      ? groupBlockIds[pageIndex - 1]
      : groupBlockIds[groupBlockIds.length - 1];
  const nextId =
    pageIndex < groupBlockIds.length - 1
      ? groupBlockIds[pageIndex + 1]
      : groupBlockIds[0];

  const { theme } = resolveConfig(tailwindConfig);

  const { y: scrollY } = useWindowScroll();

  function getOtherWorkId() {
    const propertyName = "다른 작품";
    const property = Object.values(schema).find((p) => {
      return p.property && p.name === propertyName;
    });
    if (property) {
      return pageBlock?.properties?.[property?.property][0][1][0][1];
    }
    return null;
  }
  function getPropertyFromProperties(propertyName: string, properties: any) {
    const property = Object.keys(schema).find((key) => {
      const p = schema[key];
      return p.name === propertyName;
    });
    if (property) {
      return properties?.[property]?.[0]?.[0];
    }
    return null;
  }

  const isScrollStarted = React.useMemo(() => {
    scrollY > 10;
  }, [scrollY]);

  const getBlockWithId = (id: string) => {
    return entireRecordMap?.block[id]?.value;
  };

  const otherWorkBlock = getBlockWithId(getOtherWorkId());

  const otherId = getOtherWorkId();

  const getInfoById = (_id: string) => {
    const block = getBlockWithId(_id);
    if (!block) return;
    const properties = block?.properties;
    const studentName = getPropertyFromProperties("학생이름", properties);
    const studentNameEn = getPropertyFromProperties(
      "학생이름_영문",
      properties
    );
    const cover = mapImageUrl(block?.format?.page_cover, block);
    const coverPosition = block?.format?.page_cover_position;
    return {
      id: _id,
      cover,
      coverPosition,
      studentName,
      studentNameEn,
    };
  };

  const { cover: otherCover, coverPosition: otherCoverPosition } =
    getInfoById(otherId);

  const randomOtherWork = React.useMemo(() => {
    // get random 3 indeces from groupBlockIds
    const randomIndexes: number[] = [];

    const workNumber = Math.min(3, groupBlockIds.length - 1);

    while (randomIndexes.length < workNumber) {
      const randomIndex = Math.floor(Math.random() * groupBlockIds.length);
      if (
        !randomIndexes.includes(randomIndex) &&
        pageId !== groupBlockIds[randomIndex]
      ) {
        randomIndexes.push(randomIndex);
      }
    }

    return randomIndexes.map((value) => getInfoById(groupBlockIds[value]));
  }, [groupBlockIds, pageId]);
  const { isMobileView } = _useWindowSize();

  const randomWorkCards = randomOtherWork.map((data) => {
    if (!data) return;

    const { id, cover, coverPosition, studentName, studentNameEn } = data;
    return (
      <Link
        href={`/works/${id}`}
        key={id}
        className="w-[292px] h-[150px] overflow-hidden min-w-[292px] min-h-[150px] rounded-2xl hover:opacity-80"
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: coverPosition,
        }}
      >
        <div className="bg-black/30 w-full h-full text-secondary flex flex-col justify-start items-start p-4">
          <p className="font-bold text-[20px]">{studentName}</p>
          <p className="font-regular text-[16px]">{studentNameEn}</p>
        </div>
      </Link>
    );
  });

  const backdropBlur = isScrollStarted ? "backdrop-blur" : "backdrop-blur-none";

  return (
    <>
      {/* <div className={"w-full h-[60px] md:h-[80px]"} /> */}
      {/* top bar */}

      <Head>
        <title>
          {pageProperties?.["학생이름"] + " - " + pageProperties?.["작품이름"]}{" "}
        </title>
      </Head>
      <div
        className={`fixed w-screen z-30 h-fit flex justify-between items-center content-center text-primary text-2xl font-bold px-5 py-3  md:px-10 md:py-5  transition-all duration-300 md:mt-[92px] ${backdropBlur} md:gap-10`}
      >
        {/* authorContainer */}
        <div
          className="w-fit h-full hidden md:block relative cursor-pointer"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft color={theme.colors.primary} size={48} />
        </div>
        <div className="flex flex-1 flex-row items-center justify-between h-fit md:min-h-[52px] md:mb-0 ">
          <div
            className="flex h-fit w-full transition-all duration-300 flex-row ease-in-out items-center justify-between"
            style={{
              opacity: isScrollStarted ? 1 : 0,
            }}
          >
            <div className="flex flex-1 text-[14px] md:text-[20px] gap-[10px] mr-3 min-w-[86px]">
              <p className="font-semibold md:font-bold">
                {pageProperties["학생이름"]}
              </p>
              <p className="font-semibold md:font-bold">
                {pageProperties["학생이름_영문"]}
              </p>
            </div>
            <p className="flex-1 text-right md:text-center text-[14px] md:text-3xl font-bold truncate md:leading-9">
              {pageProperties["작품이름"]}
            </p>
            <div className="hidden md:flex flex-1 flex-col items-end font-bold gap-1 h-fit">
              <p className="text-[20px] font-bold leading-6">
                {"@" + pageProperties["인스타 아이디"]}
              </p>
              <p className="text-[20px] font-bold leading-6">
                {pageProperties["Email"]}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center h-full tcursor-pointer w-fit ml-3 md:ml-0  transition-all duration-300 "
          onClick={() => {
            // open instagram link in new tab
            window.open(
              `https://www.instagram.com/${pageProperties["인스타 아이디"]}`,
              "_blank"
            );
          }}
          style={{
            opacity: isMobileView && !isScrollStarted ? 0 : 1,
          }}
        >
          {/* @ts-ignore */}
          <FiInstagram
            className="inline-block mr-2"
            size={isMobileView ? 24 : 36}
          />
        </div>
      </div>

      {/* content */}
      <div className="w-full justify-center items-center flex">
        <div
          className="w-full aspect-video absolute top-0 md:top-[69px] left-0"
          style={{
            backgroundSize: "cover",
            backgroundPosition: coverPosition,
            // no-repeat
            backgroundRepeat: "no-repeat",
            // gradient image from top to bottom
            backgroundImage: `url(${socialImage})`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-secondary"></div>
        </div>
        <XWrapper>
          <div className="w-full  p-6 md:p-0">
            <div className="w-full h-[150px] md:h-[440px]" />
            <div className="w-full h-fit relative z-10 min-h-[72px]">
              <div
                className="w-full h-fit transition-all duration-300 ease-in-out "
                style={{
                  opacity: isScrollStarted ? 0 : 1,
                }}
              >
                <p className="text-primary text-[20px] md:text-3xl font-bold md:mb-5">
                  {pageProperties["작품이름"]}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-start ">
                    <p className="font-medium md:font-bold text-primary text-[14px] md:text-[20px] whitespace-pre">
                      {pageProperties["학생이름"]}
                      {isMobileView ? "  |  " : " "}
                      {pageProperties["학생이름_영문"]}
                    </p>
                  </div>

                  <div className="hidden md:flex flex-row items-end gap-5">
                    <p className="font-bold text-primary text-[20px]">
                      {"@" + pageProperties["인스타 아이디"]}
                    </p>

                    <p className="font-bold text-primary text-[20px]">
                      {pageProperties["Email"]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <NotionPage {...newProps} />
          </div>
        </XWrapper>
      </div>
      <div className="flex md:hidden w-full h-fit justify-center items-center mb-[50px] ">
        <div className="h-[2px] w-[110px] bg-[#00BD84]" />
      </div>
      <XWrapper className="flex justify-center items-center h-full md:py-20 px-6 md:px-0">
        <div className="w-full h-fit transition-all duration-300 ease-in-out ">
          <p className="text-primary text-[24px] md:text-3xl font-semibold md:font-bold ">
            {pageProperties["작품이름"]}
          </p>
          <div className="flex flex-row justify-between items-center mt-8 ">
            <div className="w-full md:w-fit flex flex-row  justify-between md:justify-start items-start">
              <div className="w-[205px]">
                <p className="font-semibold md:font-bold text-primary text-[15px] md:text-[20px]">
                  EMAIL
                </p>
                <p className="font-regular text-primary text-[15px]">
                  {pageProperties["Email"]}
                </p>
              </div>
              <div>
                <p className="font-semibold md:font-bold text-primary text-[15px] md:text-[20px]">
                  INSTAGRAM
                </p>
                <p className="font-regular text-primary text-[15px]">
                  {"@" + pageProperties["인스타 아이디"]}
                </p>
              </div>
            </div>
          </div>
        </div>
        {otherWorkBlock ? (
          <>
            <p className="text-primary text-[15px] font-semibold md:hidden mt-10 self-start mb-4 md:mb-0">
              OTHER WORK
            </p>
            <Link
              className="w-full aspect-[16/9] md:w-[292px] md:h-[150px] overflow-hidden min-w-[292px] min-h-[150px] rounded-2xl hover:opacity-80 "
              href={"/works/" + otherId}
              style={{
                backgroundImage: `url(${otherCover})`,
                backgroundSize: "cover",
                backgroundPosition: otherCoverPosition,
              }}
            >
              <div className="bg-black/30 w-full h-full text-secondary flex flex-col justify-start items-start md:items-end p-4">
                <p className="text-[20px] font-bold">다른 작품</p>
                <p className="text-[16px] font-regular">OTHER WORK</p>
              </div>
            </Link>
          </>
        ) : (
          <></>
        )}
      </XWrapper>
      <XWrapper className="flex md:flex-col justify-center items-center h-full mb-[50px] md:mb-[600px] py-[10px] md:py-20 px-6 md:px-0">
        <div className="hidden md:block">
          <div className="mb-[30px]">
            <h1 className="text-primary text-3xl leading-[130%] font-bold">
              다른 작품 보기
            </h1>
            <h1 className="text-primary text-3xl leading-[130%] font-bold">
              OTHER WORKS
            </h1>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-[10px] md:mb-5">
            {randomWorkCards}
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-center text-primary">
          <Link href={`/works/${prevId}`}>
            <ArrowLeft color={theme.colors.primary} size={48} />
            <p>Previous</p>
          </Link>
          <Link
            href={`/works/${nextId}`}
            className="flex flex-col  items-center "
          >
            <ArrowRight color={theme.colors.primary} size={48} />
            <p>Next</p>
          </Link>
        </div>
      </XWrapper>

      <Head>
        <title>
          {pageProperties?.["학생이름"] + " - " + pageProperties?.["작품이름"]}{" "}
        </title>
      </Head>
    </>
  );
}
