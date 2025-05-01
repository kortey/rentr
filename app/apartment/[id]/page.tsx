"use client";
import React, { useState, useEffect } from "react";
import ImageGallery from "../../../components/apartment/ImageGallery";
import ApartmentDetails from "../../../components/apartment/ApartmentDetails";
import Sidebar from "../../../components/apartment/Sidebar";
import { ApartmentData } from "../../../types/apartment";
import { useParams } from "next/navigation";

const ApartmentDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [apartmentData, setApartmentData] = useState<ApartmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchApartmentData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/properties/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch apartment data');
        }
        
        const data = await response.json();
        
        // Transform the data to match ApartmentData interface if needed
        const transformedData: ApartmentData = {
          Id: data.id,
          title: data.title,
          Description: data.description,
          image: data.image,
          galery: data.gallery || [],
          location: {
            region: data.location?.region || "",
            district: data.location?.district || "",
            area: data.location?.area || "",
            nearbyLandmarks: data.location?.nearbyLandmarks || [],
            distanceToTown: data.location?.distanceToTown || ""
          },
          price: data.price,
          type: data.type,
          amenities: data.amenities || [],
          specifications: {
            bedrooms: data.specifications?.bedrooms || 0,
            bathrooms: data.specifications?.bathrooms || 0,
            squareFootage: data.specifications?.squareFootage || 0,
            furnished: data.specifications?.furnished || false,
            yearBuilt: data.specifications?.yearBuilt || 0
          },
          utilities: {
            water: data.utilities?.water || false,
            electricity: data.utilities?.electricity || false,
            internet: data.utilities?.internet || false,
            maintenance: data.utilities?.maintenance || ""
          },
          agent: {
            name: data.agent?.name || "",
            phone: data.agent?.phone || "",
            email: data.agent?.email || "",
            experience: data.agent?.experience || "",
            languages: data.agent?.languages || []
          },
          leaseTerms: {
            minimumStay: data.leaseTerms?.minimumStay || "",
            securityDeposit: data.leaseTerms?.securityDeposit || 0,
            petsAllowed: data.leaseTerms?.petsAllowed || false,
            availableFrom: data.leaseTerms?.availableFrom || ""
          }
        };
        
        setApartmentData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApartmentData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-24">
        <div className="animate-pulse">
          <div className="h-[500px] bg-gray-200 rounded-xl mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-24">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      </div>
    );
  }

  if (!apartmentData) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-24">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded relative">
          Apartment not found
        </div>
      </div>
    );
  }

  const allImages = [apartmentData.image, ...(Array.isArray(apartmentData.galery) ? apartmentData.galery : [])];

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