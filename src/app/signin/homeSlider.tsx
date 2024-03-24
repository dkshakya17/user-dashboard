'use client';

import { useEffect, useState } from 'react';
import { postData } from '@/data/profile-data';
import { usePathname } from 'next/navigation';
import { Modal } from '@/components/ui/modal';
import homeBanner from '@public/images/login-slider/1.png';
import homeBanner1 from '@public/images/login-slider/2.png';
import homeBanner2 from '@public/images/login-slider/3.png';
import homeBanner3 from '@public/images/login-slider/4.png';
import homeBanner4 from '@public/images/login-slider/5.png';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

import {
  Swiper,
  SwiperSlide,
  Pagination,
  Autoplay,
} from '@/components/ui/carousel/carousel';

const images = [homeBanner, homeBanner1, homeBanner2, homeBanner3, homeBanner4];
export default function HomeSlider({ data }: any) {
  return (
    <Swiper
      speed={500}
      spaceBetween={0}
      slidesPerView={1}
      modules={[Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      pagination={{
        clickable: true,
      }}
      className="profileModalCarousel h-full min-h-[420px] xs:min-h-[300px]"
    >
      {images.map((item: any, index: number) => (
        <SwiperSlide key={`profile-modal-slider-${index}`}>
          <div className="relative h-full">
            <Image
              src={item}
              alt="random images"
              fill
              priority
              sizes="(max-width: 320px) 100vw"
              className="aspect-[500/800] h-full w-full w-full object-contain sm:aspect-auto"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
