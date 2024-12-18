import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const PropertyCard = ({ property, onDelete }) => {
  return (
    <Card className="relative">
      <div className="relative h-48 w-full">
        <Image
          src={property.image}
          alt={property.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent>
        <Typography variant="h6" className="mb-2">
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          {property.location}
        </Typography>
        <Typography variant="h6" className="text-blue-600 mb-2">
          GH₵ {property.price}/month
        </Typography>
        <Chip 
          label={property.status}
          className={`${
            property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        />
        <Box className="flex justify-end mt-4 gap-2">
          <IconButton size="small" color="primary">
            <Visibility />
          </IconButton>
          <IconButton size="small" color="primary">
            <Edit />
          </IconButton>
          <IconButton 
            size="small" 
            color="error"
            onClick={() => onDelete(property.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard; 