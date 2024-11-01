import * as React from "react";

import {
  Collection,
  CollectionView,
  ImageBlock,
  PageBlock,
} from "notion-types";

import { useNotionContext } from "../context";
import { CollectionViewProps } from "../types";
import { cs } from "../utils";
import { CollectionCard } from "./collection-card";
import { CollectionGroup } from "./collection-group";
import { getCollectionGroups } from "./collection-utils";
import { LazyImage } from "@/components/lazy-image";
import { mapImageUrl } from "@/lib/map-image-url";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { HiOutlineChevronLeft } from "@react-icons/all-files/hi/HiOutlineChevronLeft";
import { HiOutlineChevronRight } from "@react-icons/all-files/hi/HiOutlineChevronRight";
import { Left } from "icons/Left";
import { Right } from "icons/Right";
import useWindowSize from "utils/useWindowSize";

export const CollectionViewGallery: React.FC<CollectionViewProps> = ({
  collection,
  collectionView,
  collectionData,
}) => {
  const isGroupedCollection = collectionView?.format?.collection_group_by;

  const blockIds =
    (collectionData["collection_group_results"]?.blockIds ??
      // @ts-ignore
      collectionData["results:relation:uncategorized"]?.blockIds ??
      collectionData.blockIds) ||
    [];

  return (
    <Gallery
      collectionView={collectionView}
      collection={collection}
      blockIds={blockIds}
    />
  );
};

interface CoverContent {
  src: string;
  caption?: string;
}
interface GalleryProps {
  blockIds: string[];

  collection: Collection;
  collectionView: CollectionView;
}

function Gallery({ blockIds, collectionView, collection }: GalleryProps) {
  const { recordMap } = useNotionContext();
  const {
    gallery_cover = { type: "none" },
    gallery_cover_size = "medium",
    gallery_cover_aspect = "cover",
  } = collectionView.format || {};

  function getImageFromContent(block: PageBlock) {
    let coverContent: CoverContent | null = null;
    const contentBlockId = block.content?.find((blockId) => {
      const block = recordMap.block[blockId]?.value;

      if (block?.type === "image") {
        return true;
      }
    });

    if (contentBlockId) {
      const contentBlock = recordMap.block[contentBlockId]?.value as ImageBlock;

      const source =
        contentBlock.properties?.source?.[0]?.[0] ??
        contentBlock.format?.display_source;

      if (source) {
        const src = mapImageUrl(source, contentBlock);
        const caption = contentBlock.properties?.caption?.[0]?.[0];
        if (src) {
          coverContent = {
            src,
            caption,
          };
        }
      }
    }

    return coverContent;
  }

  const coverContentsArray: CoverContent[] = blockIds
    ?.map((blockId) => {
      const block = recordMap.block[blockId]?.value as PageBlock;
      return getImageFromContent(block);
    })
    .filter((content) => content !== null) as CoverContent[];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const arrowSize = "2rem";

  const { isMobileView } = useWindowSize();

  interface ArrowProps {
    type: "PREV" | "NEXT";
  }

  function Arrow({ type }: ArrowProps) {
    if (isMobileView) return null;
    const pointer =
      type === "PREV" ? <Left color="#E22613" /> : <Right color="#E22613" />;

    const isFirst = selectedItemIndex === 0;
    const isLast = selectedItemIndex === coverContentsArray.length - 1;
    const onClick = () => {
      if (type === "PREV") {
        if (isFirst) {
          setSelectedItemIndex(coverContentsArray.length - 1);
        } else {
          setSelectedItemIndex(selectedItemIndex - 1);
        }
      } else {
        if (isLast) {
          setSelectedItemIndex(0);
        } else {
          setSelectedItemIndex(selectedItemIndex + 1);
        }
      }
    };

    const prevClassName = "-left-5 md:-left-[100px]";
    const nextClassName = "-right-7 md:-right-[100px]";
    const addClaseName = type === "PREV" ? prevClassName : nextClassName;
    return (
      <div
        className={
          `flex flex-col justify-center  cursor-pointer w-[100px] absolute h-full z-10 ` +
          addClaseName
        }
        onClick={onClick}
      >
        {pointer}
      </div>
    );
  }

  return (
    <div className="notion-gallery flex flex-row w-full text-primary relative justify-center items-center contents-center notion-margin-hard">
      <Arrow type="PREV" />
      <div className="notion-gallery-view max-h-[320px] w-screen md:w-11/12  md:min-w-full md:max-h-[600px] md:h-[600px]   ">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          selectedItem={selectedItemIndex}
          onChange={(index) => setSelectedItemIndex(index)}
          // centerMode
          // centerSlidePercentage={isMobileView ? 80 : 100}
        >
          {coverContentsArray.map((coverContent, index) => (
            <div className=" max-h-[320px] md:max-h-[600px] md:h-[600px] w-full">
              <img
                className="object-contain  max-h-[320px] md:max-h-[600px] md:h-[600px] w-full"
                src={coverContent.src}
                alt={coverContent.caption || "notion-image"}

                // fill
              />
            </div>
          ))}
        </Carousel>
        <div className="h-6 w-full" />
        <div className="w-full flex justify-center ">
          {coverContentsArray.map((coverContent, index) => {
            const isSelected = selectedItemIndex === index;
            const bgColor = isSelected
              ? "bg-[#00BD84]"
              : "bg-[#00BD84] opacity-30";
            return (
              <div
                className={
                  `w-[0.6rem] h-[0.6rem] rounded-full z-10 mx-1 cursor-pointer ` +
                  `${bgColor} `
                }
                onClick={() => setSelectedItemIndex(index)}
              />
            );
          })}
        </div>
      </div>
      <Arrow
        type="NEXT"
        onClick={() => setSelectedItemIndex(selectedItemIndex + 1)}
        isEdge={selectedItemIndex === coverContentsArray.length - 1}
      />
    </div>
  );

  return (
    <div className="notion-gallery">
      <div className="notion-gallery-view">
        <div
          className={cs(
            "notion-gallery-grid",
            `notion-gallery-grid-size-${gallery_cover_size}`
          )}
        >
          {blockIds?.map((blockId) => {
            const block = recordMap.block[blockId]?.value as PageBlock;
            if (!block) return null;

            return (
              <CollectionCard
                collection={collection}
                block={block}
                cover={gallery_cover}
                coverSize={gallery_cover_size}
                coverAspect={gallery_cover_aspect}
                properties={collectionView.format?.gallery_properties}
                key={blockId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
