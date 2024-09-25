"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  video: string;
  image: ImageProps;
};

export type Header109Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header109 = (props: Header109Props) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const { heading, description, buttons, video, image } = {
    ...Header109Defaults,
    ...props,
  } as Props;

  const { scrollYProgress } = useScroll(); // Capture scroll progress
  const [widthRange, setWidthRange] = useState(["100%", "10%"]); // Default for larger screens
  const [heightRange, setHeightRange] = useState(["100%", "20%"]); // Default for larger screens

  useEffect(() => {
    const updateRanges = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setWidthRange(["100%", "50%"]);
        setHeightRange(["100%", "25%"]);
      } else if (window.matchMedia("(max-width: 991px)").matches) {
        setWidthRange(["100%", "25%"]);
        setHeightRange(["100%", "30%"]);
      } else {
        setWidthRange(["100%", "10%"]);
        setHeightRange(["100%", "20%"]);
      }
    };

    updateRanges();

    window.addEventListener("resize", updateRanges);

    return () => window.removeEventListener("resize", updateRanges);
  }, []);

  const width = useTransform(scrollYProgress, [0, 0.7], widthRange);
  const height = useTransform(scrollYProgress, [0, 0.7], heightRange);

  
  const translateY = useTransform(scrollYProgress, [0.5, 0.7], ["0vh", "40vh"]);

  return (
    <section id="relume " >
      <div className="relative h-[300vh] ">
        <div className="sticky top-0 h-screen ">
          <Dialog>
            <div className="w-full h-screen flex items-center justify-center ">
              <motion.div
                style={{ width, height, translateY }}
              >
                <DialogTrigger className="w-full h-full ">
                  <div className="relative flex items-center justify-center w-full h-full">
                    <img src={image.src} className="w-full h-full object-cover" alt={image.alt} />
                    <Play className="absolute z-20 size-20 text-white" />
                    <span className="absolute inset-0 z-10 bg-black/50 " />
                  </div>
                </DialogTrigger>
              </motion.div>
            </div>
            <DialogPortal>
              <DialogOverlay className="bg-black/90" />
              <DialogContent>
                {!isIframeLoaded && <Loading className="mx-auto size-16 text-white" />}
                <iframe
                  className={clsx(
                    "z-0 mx-auto aspect-video h-full w-full md:w-[738px] lg:w-[940px]",
                    {
                      visible: isIframeLoaded,
                      hidden: !isIframeLoaded,
                    },
                  )}
                  src={video}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIsIframeLoaded(true)}
                ></iframe>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </div>
      <div className="px-[5%] pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-6 lg:pb-28">
      <div className="container">
          <div className="flex flex-col items-center overflow-x-auto">
            <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
              <div className="w-full max-w-lg">
                <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-[2.5rem] lg:text-10xl">
                  {heading}
                </h1>
                <p className="md:text-md">{description}</p>
                <div className="mt-6 flex items-center justify-center gap-x-4 gap-y-4 md:mt-8 flex-wrap">
                  {buttons.map((button, index) => (
                    <Button key={index} {...button}>
                      {button.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Header109Defaults: Header109Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
  video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail-landscape.svg",
    alt: "Relume placeholder image",
  },
};

const Play = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.333 32C5.333 17.272 17.273 5.333 32 5.333A26.667 26.667 0 0 1 58.666 32c0 14.728-11.939 26.667-26.666 26.667-14.728 0-26.667-11.94-26.667-26.667ZM27.12 43.413l15.546-9.706a2.027 2.027 0 0 0 0-3.414l-15.6-9.706A2 2 0 0 0 24 22.267v19.466a2 2 0 0 0 3.12 1.68Z"
      />
    </svg>
  );
};

const Loading = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor">
        <path
          strokeDasharray={60}
          strokeDashoffset={60}
          strokeOpacity={0.3}
          d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0" />
        </path>
        <path strokeDasharray={15} strokeDashoffset={15} d="M12 3a9 9 0 0 1 9 9">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </g>
    </svg>

  );
};