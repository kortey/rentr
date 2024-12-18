"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "./ui/image-slider";
import { Input } from "@mui/material";
import { Search } from "@mui/icons-material";
import { LocationCity } from "@mui/icons-material";

export function ImagesSliderDemo() {
  const images = [
    "/images/house1.jpg",
    "/images/house2.jpg",
    "/images/house3.jpg",
    "/images/house3.jpg",
  ];
  return (
    <section>
      <ImagesSlider className="h-screen" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: -80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="text-white text-2xl md:text-4xl lg:text-5xl text-center"
          >
            END UP THE THAT SERENE APARTMENT YOU HAVE BEEN LOOKING FOR!
          </motion.div>
        </motion.div>
      </ImagesSlider>
    </section>
  );
}
