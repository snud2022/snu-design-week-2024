import React, { useState } from "react";
import { NextPage } from "next";
import Marquee from "react-fast-marquee";
import { useRatio } from "utils/useRatio";
import SearchAndInstagram from "components/search-and-instagram";
import MainDescription from "components/main-description";
import Image from "next/image";
import _useWindowSize from "utils/useWindowSize";
import MobileMenuOverlay from "components/mobile-menu-overlay";
import { MenuMobile } from "icons/MenuMobile";

const Landing: NextPage = () => {
  const { isMobileView, windowSize } = _useWindowSize();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ratio = useRatio();

  return (
    <div className="bg-primary flex flex-col h-screen w-full relative overflow-hidden">
      {!isMobileView ? (
        <div className="pt-[92px] h-full">
          <SearchAndInstagram />
          <MainDescription />
          <div className="absolute bottom-0 w-full mb-[20px]">
            <Marquee gradient={false} speed={50}>
              <Image
                src='/img/pc-main-partners.svg'
                alt="partners-logo"
                width={windowSize.width}
                height={windowSize.width * 50 / 1722}
              />
            </Marquee>
          </div>
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%-92px)] w-full`}
          >
            <Image
              src="/img/pc-main-animation.gif"
              alt="main-page-animation"
              width={windowSize.width}
              height={windowSize.width * 800 / 2560}
              unoptimized={true}
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
      ) : (
        <>
          <MobileMenuOverlay isVisible={isMobileMenuOpen} setIsVisible={setIsMobileMenuOpen} />
          <div className="absolute w-full h-full overflow-hidden">
            <Image
              src="/img/mobile-main-animation.gif"
              alt="main-page-animation"
              width={393 * ratio.width}
              height={windowSize.height}
              unoptimized={true}
              priority={true}
            />
          </div>

          {!isMobileMenuOpen &&
            <>
              <div className="absolute right-[24px] top-0 z-30" onClick={() => setIsMobileMenuOpen(true)}>
                <MenuMobile />
              </div>
              <div className="flex flex-col mt-[70px] gap-[11px] ml-[23px] z-30">
                <div className="text-secondary text-[30px] font-[700] whitespace-pre-line leading-[37px] tracking-[-0.3px]">
                  {`SNU DESIGN WEEK\n2024\n애벌레 행동`}
                </div>
                <div className="text-secondary text-[12px] font-[500] leading-[18px] whitespace-pre-line tracking-[-0.12px]">
                  {`2024.11.28. - 2024.12.03. 10AM - 6PM\n1, GWANAK-RO, GWANAK-GU, SEOUL\n49, COLLEGE OF FINE ARTS, SEOUL NAT’L UNIVERSITY`}
                </div>
              </div>
            </>}
        </>
      )}
    </div>
  );
};

export default Landing;
