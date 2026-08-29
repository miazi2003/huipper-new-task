"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { videoTestimonials } from "@/data/videoTestimonials";
import "swiper/css";
import "swiper/css/free-mode";

const carouselTestimonials = Array.from({ length: 3 }, (_, copy) =>
  videoTestimonials.map((testimonial, sourceIndex) => ({
    ...testimonial,
    sourceIndex,
    loopKey: `${copy}-${testimonial.id}`,
  })),
).flat();

export default function ClientStories() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndexRef = useRef<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const pauseActiveVideo = useCallback(() => {
    const activeIndex = activeIndexRef.current;
    if (activeIndex === null) return;

    videoRefs.current[activeIndex]?.pause();
    activeIndexRef.current = null;
    setPlayingIndex(null);
  }, []);

  const playVideo = useCallback(
    (index: number, hasVideo: boolean) => {
      const video = videoRefs.current[index];
      if (!video || !hasVideo) return;

      if (activeIndexRef.current !== index) pauseActiveVideo();

      video
        .play()
        .then(() => {
          activeIndexRef.current = index;
          setPlayingIndex(index);
        })
        .catch(() => undefined);
    },
    [pauseActiveVideo],
  );

  const handleCardTap = (index: number, hasVideo: boolean) => {
    if (!window.matchMedia("(hover: none)").matches) return;

    if (activeIndexRef.current === index) {
      pauseActiveVideo();
    } else {
      playVideo(index, hasVideo);
    }
  };

  const pauseOnDrag = () => pauseActiveVideo();

  useEffect(() => pauseActiveVideo, [pauseActiveVideo]);

  return (
    <section className="cs-section" aria-labelledby="client-stories-heading">
      <div className="cs-heading">
        <p>Client Stories</p>
        <h2 id="client-stories-heading">
          Success <em>Stories</em>
          <br />
          That <em>Inspire Us</em>
        </h2>
      </div>

      <Swiper
        className="cs-slider"
        modules={[FreeMode]}
        slidesPerView="auto"
        centeredSlides
        initialSlide={videoTestimonials.length + 2}
        spaceBetween={24}
        loop
        loopAdditionalSlides={videoTestimonials.length}
        freeMode={{ enabled: true, momentum: true, momentumRatio: 0.75 }}
        grabCursor
        onSliderMove={pauseOnDrag}
        onTouchStart={pauseOnDrag}
        onSlideChangeTransitionStart={pauseOnDrag}
      >
        {carouselTestimonials.map((testimonial, index) => (
          <SwiperSlide className="cs-slide" key={testimonial.loopKey}>
            <article
              className="cs-card"
              style={{ backgroundColor: testimonial.backgroundColor }}
              onMouseEnter={() => playVideo(index, Boolean(testimonial.videoSrc))}
              onMouseLeave={pauseActiveVideo}
              onClick={() => handleCardTap(index, Boolean(testimonial.videoSrc))}
            >
              {testimonial.videoSrc || testimonial.poster ? (
                <video
                  ref={(element) => { videoRefs.current[index] = element; }}
                  poster={testimonial.poster || undefined}
                  src={testimonial.videoSrc || undefined}
                  muted
                  playsInline
                  preload="metadata"
                  onPlay={() => setPlayingIndex(index)}
                  onPause={() => {
                    if (activeIndexRef.current === index) setPlayingIndex(null);
                  }}
                />
              ) : (
                <div className="cs-media-placeholder" aria-hidden="true" />
              )}

              <span className="cs-play" data-hidden={playingIndex === index} aria-hidden="true">
                <i />
              </span>

              <div className="cs-card-copy">
                <strong>{testimonial.company}</strong>
                <p>{testimonial.quote}</p>
                <small>{testimonial.name}</small>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .cs-section {
          padding: 96px 0 0;
          overflow: hidden;
          background: #fbfbfb;
          color: #0a0a0a;
        }

        .cs-heading {
          width: min(1254px, calc(100% - 48px));
          margin: 0 auto;
        }

        .cs-heading > p {
          display: flex;
          width: max-content;
          height: 34px;
          margin: 0 0 22px;
          padding: 0 13px;
          align-items: center;
          border: 1px solid #00bd68;
          border-radius: 999px;
          color: #008d4e;
          font-size: 15px;
          line-height: 1;
        }

        .cs-heading h2 {
          margin: 0;
          font-size: 48px;
          font-weight: 500;
          line-height: 1.27;
          letter-spacing: -1.8px;
        }

        .cs-heading h2 em {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
        }

        .cs-slider {
          width: 100%;
          margin-top: 58px;
          overflow: visible;
        }

        .cs-slide {
          width: clamp(310px, 20.65vw, 396px);
          height: auto;
        }

        .cs-card {
          position: relative;
          width: 100%;
          aspect-ratio: 0.593;
          overflow: hidden;
          border-radius: 24px 24px 0 0;
          cursor: pointer;
          isolation: isolate;
        }

        .cs-card video,
        .cs-media-placeholder {
          position: absolute;
          z-index: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cs-media-placeholder {
          background: inherit;
        }

        .cs-card::after {
          position: absolute;
          z-index: 1;
          right: 0;
          bottom: 0;
          left: 0;
          height: 43%;
          background: linear-gradient(to bottom, transparent, rgba(7, 7, 12, 0.9));
          content: "";
          pointer-events: none;
        }

        .cs-play {
          position: absolute;
          z-index: 3;
          top: 53%;
          left: 50%;
          display: grid;
          width: 62px;
          height: 62px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.28);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
          opacity: 1;
          transform: translate(-50%, -50%);
          transition: opacity 180ms ease;
          -webkit-backdrop-filter: blur(5px);
          backdrop-filter: blur(5px);
        }

        .cs-play[data-hidden="true"] { opacity: 0; }

        .cs-play i {
          width: 0;
          height: 0;
          margin-left: 4px;
          border-top: 14px solid transparent;
          border-bottom: 14px solid transparent;
          border-left: 22px solid #fff;
        }

        .cs-card-copy {
          position: absolute;
          z-index: 2;
          right: 32px;
          bottom: 28px;
          left: 32px;
          color: #fff;
        }

        .cs-card-copy strong {
          display: block;
          margin-bottom: 21px;
          font-size: 19px;
          line-height: 1;
        }

        .cs-card-copy p {
          display: -webkit-box;
          margin: 0;
          overflow: hidden;
          color: rgba(255, 255, 255, 0.68);
          font-size: 16px;
          line-height: 1.55;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .cs-card-copy small {
          display: block;
          margin-top: 18px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .cs-section { padding-top: 72px; }
          .cs-heading { width: calc(100% - 32px); }
          .cs-heading h2 { font-size: clamp(38px, 8vw, 48px); }
          .cs-slider { margin-top: 44px; }
          .cs-slide { width: min(72vw, 350px); }
        }

        @media (max-width: 560px) {
          .cs-slide { width: 82vw; }
          .cs-heading h2 { font-size: 38px; }
          .cs-card { border-radius: 18px 18px 0 0; }
          .cs-card-copy { right: 22px; bottom: 22px; left: 22px; }
        }
      `}</style>
    </section>
  );
}
