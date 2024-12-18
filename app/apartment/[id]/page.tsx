"use client";
import React, { useState } from "react";
import ImageGallery from "../../../components/apartment/ImageGallery";
import ApartmentDetails from "../../../components/apartment/ApartmentDetails";
import Sidebar from "../../../components/apartment/Sidebar";
import { ApartmentData } from "../../../types/apartment";

const ApartmentDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const apartmentData: ApartmentData = {
    Id: 1,
    title: "Two bedroom self contain",
    Description: "A beautiful apartment with modern amenities",
    image: "/images/house1.jpg",
    galery: [],
    loction: {
      region: "eastern",
      district: "asougyaman",
      area: "Akosombo Combine",
      nearbyLandmarks: [],
      distanceToTown: "2.5 km"
    },
    price: 300,
    type: "self contain",
    amenities: ["wifi", "parking", "pool"],
    specifications: {
      bedrooms: 2,
      bathrooms: 1,
      squareFootage: 850,
      furnished: true,
      yearBuilt: 2022
    },
    utilities: {
      water: true,
      electricity: true,
      internet: true,
      maintenance: "Included"
    },
    agent: {
      name: "John Doe",
      phone: "0540000000",
      email: "john.doe@example.com",
      experience: "5+ years",
      languages: ["English", "Twi"]
    },
    leaseTerms: {
      minimumStay: "1 year",
      securityDeposit: 600,
      petsAllowed: true,
      availableFrom: "2024-04-01"
    }
  };

  const allImages = [apartmentData.image, ...(Array.isArray(apartmentData.galery) ? apartmentData.galery : [])];

  if (!apartmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <ImageGallery
        images={allImages}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ApartmentDetails apartmentData={apartmentData} />
        <Sidebar apartmentData={apartmentData} />
      </div>
    </div>
  );
};

export default ApartmentDetail; 