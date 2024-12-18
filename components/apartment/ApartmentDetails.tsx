import React from "react";
import { Chip } from "@mui/material";
import { ApartmentData } from "../../types/apartment";

interface ApartmentDetailsProps {
  apartmentData: ApartmentData;
}

const ApartmentDetails = ({ apartmentData }: ApartmentDetailsProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Main Content Container */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {apartmentData.title}
        </h1>

        {/* Location Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip
            label={apartmentData.loction.region}
            className="bg-blue-600 text-white"
          />
          <Chip
            label={apartmentData.loction.district}
            className="bg-blue-600 text-white"
          />
          <Chip
            label={apartmentData.loction.area}
            className="bg-blue-600 text-white"
          />
        </div>

        {/* Description Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {apartmentData.Description}
          </p>
        </div>

        {/* Specifications Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Specifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Bedrooms:</span>
              <span className="text-gray-600">
                {apartmentData.specifications.bedrooms}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Bathrooms:</span>
              <span className="text-gray-600">
                {apartmentData.specifications.bathrooms}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Area:</span>
              <span className="text-gray-600">
                {apartmentData.specifications.squareFootage} sq ft
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Furnished:</span>
              <span className="text-gray-600">
                {apartmentData.specifications.furnished ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Year Built:</span>
              <span className="text-gray-600">
                {apartmentData.specifications.yearBuilt}
              </span>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Amenities & Utilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {apartmentData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-gray-600 capitalize">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Utilities Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Utilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Water:</span>
              <span className="text-gray-600">
                {apartmentData.utilities.water ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Electricity:</span>
              <span className="text-gray-600">
                {apartmentData.utilities.electricity ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Internet:</span>
              <span className="text-gray-600">
                {apartmentData.utilities.internet ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Maintenance:</span>
              <span className="text-gray-600">
                {apartmentData.utilities.maintenance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetails;
