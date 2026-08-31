"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { videoTestimonials, type VideoTestimonial } from "@/data/videoTestimonials";
import { adaptCmsToVideoTestimonials } from "@/lib/adapters/testimonial-presentation";
import { listPublicTestimonials } from "@/lib/api/testimonials";
import "swiper/css";
import "swiper/css/free-mode";

export default function ClientStories() {
  const [videos, setVideos] = useState<VideoTestimonial[]>(videoTestimonials);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeIndexRef = useRef<number | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    void listPublicTestimonials({ type: "video", limit: 20 })
      .then((data) => {
        if (data?.testimonials && data.testimonials.length > 0) {
          setVideos(adaptCmsToVideoTestimonials(data.testimonials, videoTestimonials));
        }
      })
      .catch(() => undefined);
  }, []);

  const carouselTestimonials = Array.from({ length: 3 }, (_, copy) =>
    videos.map((testimonial, sourceIndex) => ({
      ...testimonial,
      sourceIndex,
      loopKey: `${copy}-${testimonial.id}-${sourceIndex}`,
    })),
  ).flat();

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
        initialSlide={videos.length + 2}
        spaceBetween={24}
        loop
        loopAdditionalSlides={videos.length}
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
                <div className="cs-company">
                  <span className="cs-company-mark" aria-hidden="true">
                    {Array.from({ length: 7 }, (_, dot) => <i key={dot} />)}
                  </span>
                  <strong>{testimonial.company}</strong>
                </div>
                <p>{testimonial.quote}</p>
                <h3>{testimonial.name}</h3>
                <small>{testimonial.role}</small>
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
          border: 1px solid #896add;
          border-radius: 999px;
          color: #6845b8;
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
          aspect-ratio: 9 / 16;
          overflow: hidden;
          border-radius: 24px;
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
          height: 52%;
          background: linear-gradient(to bottom, transparent 0%, rgba(8, 8, 12, .68) 34%, rgba(7, 7, 11, .98) 100%);
          content: "";
          pointer-events: none;
        }

        .cs-play {
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 50%;
          display: grid;
          width: 38px;
          height: 46px;
          place-items: center;
          border: 0;
          background: transparent;
          opacity: 1;
          transform: translate(-50%, -50%);
          transition: opacity 180ms ease;
        }

        .cs-play[data-hidden="true"] { opacity: 0; }

        .cs-play i {
          width: 0;
          height: 0;
          margin-left: 3px;
          border-top: 14px solid transparent;
          border-bottom: 14px solid transparent;
          border-left: 23px solid #fff;
          filter: drop-shadow(0 2px 5px rgba(0,0,0,.24));
        }

        .cs-card-copy {
          position: absolute;
          z-index: 2;
          right: 31px;
          bottom: 26px;
          left: 31px;
          color: #fff;
        }

        .cs-company {
          display: flex;
          margin-bottom: 22px;
          align-items: center;
          gap: 10px;
        }

        .cs-company > strong {
          display: block;
          max-width: 165px;
          font-size: 16px;
          line-height: 1.08;
        }

        .cs-company-mark {
          position: relative;
          display: block;
          width: 24px;
          height: 29px;
          flex: none;
        }

        .cs-company-mark i {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
        }

        .cs-company-mark i:nth-child(1) { top: 0; left: 9px; }
        .cs-company-mark i:nth-child(2) { top: 6px; left: 0; }
        .cs-company-mark i:nth-child(3) { top: 6px; right: 0; }
        .cs-company-mark i:nth-child(4) { top: 12px; left: 9px; }
        .cs-company-mark i:nth-child(5) { top: 18px; left: 0; }
        .cs-company-mark i:nth-child(6) { top: 18px; right: 0; }
        .cs-company-mark i:nth-child(7) { top: 24px; left: 9px; }

        .cs-card-copy > p {
          display: -webkit-box;
          margin: 0;
          overflow: hidden;
          color: #fff;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.55;
          letter-spacing: -.2px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .cs-card-copy h3 {
          margin: 17px 0 5px;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -.25px;
        }

        .cs-card-copy small {
          display: block;
          color: rgba(255, 255, 255, .76);
          font-size: 16px;
          line-height: 1.3;
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
          .cs-card { border-radius: 18px; }
          .cs-card-copy { right: 22px; bottom: 22px; left: 22px; }
        }
      `}</style>
    </section>
  );
}
