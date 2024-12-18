"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import { IconButton, Box, Modal } from "@mui/material";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn,
  Circle,
  CircleDot,
  X
} from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

const ImageGallery = ({ 
  images, 
  currentImageIndex, 
  setCurrentImageIndex 
}: ImageGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  }, [currentImageIndex, images.length, setCurrentImageIndex]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  }, [currentImageIndex, images.length, setCurrentImageIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      prevImage();
    } else if (event.key === 'ArrowRight') {
      nextImage();
    } else if (event.key === 'Escape') {
      setIsModalOpen(false);
    }
  }, [nextImage, prevImage]);

  React.useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image Container */}
        <div 
          className="relative h-[500px] w-full rounded-xl overflow-hidden group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={images[currentImageIndex]}
            alt="Apartment view"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />

          {/* Zoom Button */}
          <IconButton
            onClick={() => setIsModalOpen(true)}
            className={`absolute top-4 right-4 bg-black/50 hover:bg-black/70 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            sx={{ color: 'white' }}
          >
            <ZoomIn className="h-5 w-5" />
          </IconButton>

          {/* Navigation Arrows */}
          <div className={`absolute inset-0 flex items-center justify-between p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <IconButton
              onClick={prevImage}
              className="bg-black/50 hover:bg-black/70"
              sx={{ color: 'white' }}
            >
              <ChevronLeft className="h-6 w-6" />
            </IconButton>
            <IconButton
              onClick={nextImage}
              className="bg-black/50 hover:bg-black/70"
              sx={{ color: 'white' }}
            >
              <ChevronRight className="h-6 w-6" />
            </IconButton>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1.5 rounded-full text-white text-sm font-medium">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="p-1 focus:outline-none"
              >
                {index === currentImageIndex ? (
                  <CircleDot className="w-4 h-4 text-white" />
                ) : (
                  <Circle className="w-4 h-4 text-white/70" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 px-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                currentImageIndex === index 
                  ? 'ring-2 ring-blue-600 opacity-100' 
                  : 'hover:opacity-75'
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 16vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="flex items-center justify-center"
      >
        <Box className="relative max-w-7xl mx-auto w-full h-full flex items-center justify-center">
          <IconButton
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 z-50"
            sx={{ color: 'white' }}
          >
            <X className="h-5 w-5" />
          </IconButton>

          <div className="relative w-full h-[90vh]">
            <Image
              src={images[currentImageIndex]}
              alt="Apartment view"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-between p-4">
            <IconButton
              onClick={prevImage}
              className="bg-black/50 hover:bg-black/70"
              sx={{ color: 'white' }}
            >
              <ChevronLeft className="h-6 w-6" />
            </IconButton>
            <IconButton
              onClick={nextImage}
              className="bg-black/50 hover:bg-black/70"
              sx={{ color: 'white' }}
            >
              <ChevronRight className="h-6 w-6" />
            </IconButton>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ImageGallery; 