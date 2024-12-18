import PCTitle from "components/pc-title";
import { useState } from "react";
import ExhibitionOverview from "./_components/exhibition-overview";
import VisualIdentity from "./_components/visual-identity";
import SNUDesignWeekPreparationCommittee from "./_components/snu-design-week-preparation-committee";
import ThanksTo from "./_components/thanks-to";
import _useWindowSize from "utils/useWindowSize";
import Category from "./_components/category";
import SearchAndInstagram from "components/search-and-instagram";

export default function AboutPage() {
  const [selectedCategory, setSelectedCategory] = useState("Exhibition Overview");

  const { isMobileView } = _useWindowSize();

  const categoryWrapperDesign = !isMobileView ? `flex flex-row justify-between w-full items-start` : `flex flex-col w-auto gap-[6px] justify-start items-start`;

  return (
    <div className="md:pt-[92px] md:mb-[88px] mb-[50px] w-full flex flex-col items-center">
      <div className="absolute right-0">
        <SearchAndInstagram />
      </div>
      <div className="md:w-[900px] w-full flex flex-col md:items-center items-start md:gap-[50px] gap-[40px] md:pt-[88px] pt-[35px] md:px-0 px-[24px]">
        <PCTitle imgsrc="/img/pc-title-about.svg" />
        <div className={categoryWrapperDesign}>
          <Category kor="전시 개요" eng="Exhibition Overview" isMobileView={isMobileView} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <Category kor="비주얼 아이덴티티" eng="Visual Identity" isMobileView={isMobileView} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <Category kor="졸업주간 준비위원회" eng={"SNU DESIGN WEEK\nPreparation Committee"} isMobileView={isMobileView} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <Category kor="도움주신 분들" eng="Thanks to" isMobileView={isMobileView} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="md:w-[900px] w-full">
          {selectedCategory === "Exhibition Overview" && <ExhibitionOverview />}
          {selectedCategory === "Visual Identity" && <VisualIdentity />}
          {selectedCategory === "SNU DESIGN WEEK\nPreparation Committee" && <SNUDesignWeekPreparationCommittee />}
          {selectedCategory === "Thanks to" && <ThanksTo />}
        </div>
      </div>
    </div>
  );
}
