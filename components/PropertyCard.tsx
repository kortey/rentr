import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import Link from 'next/link';
import { ApartmentData } from '../types/apartment';

interface PropertyCardProps {
  property: ApartmentData;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link href={`/apartment/${property.Id}`} className="block">
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>
        <CardContent>
          <Typography variant="h6" className="mb-2 line-clamp-1">
            {property.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-2">
            {property.loction.area}, {property.loction.district}
          </Typography>
          <Box className="flex justify-between items-center mb-2">
            <Typography variant="h6" className="text-blue-600">
              GH₵ {property.price}/month
            </Typography>
            <Chip 
              label={property.type}
              size="small"
              className="bg-blue-100 text-blue-800"
            />
          </Box>
          <Box className="flex gap-2 flex-wrap">
            <Typography variant="body2" color="text.secondary">
              {property.specifications.bedrooms} beds
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {property.specifications.bathrooms} baths
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {property.specifications.squareFootage} sq ft
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard; 