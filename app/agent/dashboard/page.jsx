"use client";
import React, { useState, useOptimistic } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import AddPropertyModal from '../../../components/agent/AddPropertyModal';
import PropertyCard from '../../../components/agent/PropertyCard';
import DashboardStats from '../../../components/agent/DashboardStats';

const AgentDashboard = ({ initialProperties = [] }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [optimisticProperties, addOptimisticProperty] = useOptimistic(
    initialProperties,
    (state, newProperty) => [...state, newProperty]
  );

  const handleAddProperty = (newProperty) => {
    addOptimisticProperty(newProperty);
  };

  const handleDeleteProperty = (propertyId) => {
    setProperties(properties.filter(prop => prop.id !== propertyId));
  };

  return (
    <Box className="p-6 mt-20">
      <Box className="flex justify-between items-center mb-8">
        <Typography variant="h4" className="text-gray-800">
          Agent Dashboard
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Property
        </Button>
      </Box>

      <DashboardStats properties={optimisticProperties} />

      <Typography variant="h5" className="mb-4 mt-8">
        My Properties
      </Typography>

      <Grid container spacing={3}>
        {optimisticProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <PropertyCard 
              property={property} 
              onDelete={handleDeleteProperty}
            />
          </Grid>
        ))}
      </Grid>

      <AddPropertyModal 
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onOptimisticAdd={handleAddProperty}
      />
    </Box>
  );
};

export default AgentDashboard; 