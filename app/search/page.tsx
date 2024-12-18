"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Grid, Typography, Box, Chip } from "@mui/material";
import PropertyCard from "../../components/PropertyCard";
import { ApartmentData } from "../../types/apartment";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const apartmentType = searchParams.get("type");
  const location = searchParams.get("location");

  // Mock data - replace with your actual data source
  const mockProperties: ApartmentData[] = [
    {
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
    },
    // Add more mock properties...
  ];

  // Filter properties based on both type and location
  const filteredProperties = mockProperties.filter(property => {
    const matchesType = !apartmentType || 
      property.type.toLowerCase().includes(apartmentType.toLowerCase());
    const matchesLocation = !location || 
      property.loction.area.toLowerCase().includes(location.toLowerCase()) ||
      property.loction.district.toLowerCase().includes(location.toLowerCase()) ||
      property.loction.region.toLowerCase().includes(location.toLowerCase());
    
    return matchesType && matchesLocation;
  });

  return (
    <Box className="max-w-7xl mx-auto p-6 mt-24">
      {/* Search Filters */}
      <Box className="mb-8">
        <Typography variant="h4" className="text-gray-800 mb-2">
          Search Results
        </Typography>
        <Box className="flex flex-wrap items-center gap-2">
          {apartmentType && (
            <Chip 
              label={`Type: ${apartmentType}`}
              className="bg-blue-100 text-blue-800"
              onDelete={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('type');
                window.history.pushState({}, '', `/search?${params.toString()}`);
              }}
            />
          )}
          {location && (
            <Chip 
              label={`Location: ${location}`}
              className="bg-green-100 text-green-800"
              onDelete={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('location');
                window.history.pushState({}, '', `/search?${params.toString()}`);
              }}
            />
          )}
        </Box>
      </Box>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" className="mb-6">
        Found {filteredProperties.length} properties
      </Typography>

      {/* Results Grid */}
      <Grid container spacing={4}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.Id}>
            <PropertyCard property={property} />
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {filteredProperties.length === 0 && (
        <Box className="text-center py-12">
          <Typography variant="h6" color="text.secondary">
            No properties found matching your search criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchResults; 