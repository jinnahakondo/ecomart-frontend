'use client';

import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css/bundle';


const slides = [
    {
        id: 1,
        title: 'Upgrade Your Lifestyle With Smart Tech',
        subtitle: 'Latest gadgets at unbeatable prices',
        image:
            'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&q=80',
        discount: '30% OFF',
        cta: 'Shop Now',
        link: '/products',
    },
    {
        id: 2,
        title: 'Fresh Fashion Collection 2026',
        subtitle: 'Trendy styles for the modern you',
        image:
            'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
        discount: '50% OFF',
        cta: 'Explore Fashion',
        link: '/products?category=womens-dresses',
    },
    {
        id: 3,
        title: 'Modern Home Starts Here',
        subtitle: 'Transform your space with premium furniture',
        image:
            'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80',
        discount: '40% OFF',
        cta: 'Explore Decoration',
        link: '/products?category=home-decoration',
    },
];

export default function Hero() {
    const router = useRouter();

    return (
        <div className="relative h-125 md:h-150 overflow-hidden bg-background">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                slidesPerView={1}
                loop
                effect="fade"
                speed={700}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: '.hero-prev',
                    nextEl: '.hero-next',
                }}
                pagination={{
                    clickable: true,
                    el: '.hero-pagination',
                    bulletClass: 'hero-bullet',
                    bulletActiveClass: 'hero-bullet-active',
                }}
                className="h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full">
                            {/* bg image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                }}
                            />

                            {/* overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

                            {/* content */}
                            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                                <div className="max-w-2xl text-white space-y-5">
                                    <span className="inline-block rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                                        {slide.discount}
                                    </span>

                                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                        {slide.title}
                                    </h1>

                                    <p className="text-lg md:text-xl text-white/80">
                                        {slide.subtitle}
                                    </p>

                                    <button
                                        onClick={() => router.push(slide.link)}
                                        className="rounded-lg bg-primary text-primary-foreground px-6 py-3 text-sm md:text-base font-medium hover:opacity-90 transition"
                                    >
                                        {slide.cta}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* prev */}
            <button className="hero-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 backdrop-blur-md hover:bg-background/30 transition flex items-center justify-center text-white">
                <ChevronLeft className="h-6 w-6" />
            </button>

            {/* next */}
            <button className="hero-next absolute right-4 top-1/2 z-20 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 backdrop-blur-md hover:bg-background/30 transition flex items-center justify-center text-white">
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* pagination */}
            <div className="hero-pagination absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex gap-2" />

            <style jsx global>{`
        .hero-bullet {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .hero-bullet-active {
          width: 32px;
          background: white;
        }
      `}</style>
        </div>
    );
}