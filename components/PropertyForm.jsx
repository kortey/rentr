"use client";
import React, { useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress
} from "@mui/material";
import { useRouter } from "next/navigation";

const PropertyForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Consolidated form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "",
    region: "",
    district: "",
    area: "",
    distanceToTown: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    yearBuilt: "",
    maintenance: "",
    minimumStay: "",
    securityDeposit: "",
    furnished: false,
    water: false,
    electricity: false,
    internet: false,
    petsAllowed: false
  });

  // State for images
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle switch changes
  const handleSwitchChange = (name) => (event) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  // Handle main image change
  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery images change
  const handleGalleryImagesChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setGalleryImages(files);
      
      // Create previews
      const previews = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      });
      
      Promise.all(previews).then(urls => {
        setGalleryPreviews(urls);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("User not authenticated");
      }

      const submitFormData = new FormData();
      
      // Append user ID
      submitFormData.append('userId', session.user.id);

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitFormData.append(key, value.toString());
      });
      
      // Append images
      if (mainImage) {
        submitFormData.append('mainImage', mainImage);
      }
      
      if (galleryImages.length > 0) {
        galleryImages.forEach((image) => {
          submitFormData.append('gallery', image);
        });
      }

      const response = await fetch('/api/properties', {
        method: 'POST',
        body: submitFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create property');
      }

      const result = await response.json();
      console.log(formData)
      if (result.success) {
        router.refresh();
      }
    } catch (error) {
      setError(error.message);
      console.error("Submit Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="p-6 max-w-4xl mx-auto">
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Typography variant="h5" className="mb-6">
          Add New Property
        </Typography>

        {/* Basic Information */}
        <Box className="space-y-4">
          <Typography variant="h6">Basic Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label="Title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
                required 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select 
                  name="type" 
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="single room">Single Room</MenuItem>
                  <MenuItem value="self contain">Self Contain</MenuItem>
                  <MenuItem value="chember and hall">Chamber and Hall</MenuItem>
                  <MenuItem value="bungalow">Bungalow</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Location */}
        <Box className="space-y-4">
          <Typography variant="h6">Location</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth 
                label="Region" 
                name="region" 
                value={formData.region}
                onChange={handleInputChange}
                required 
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth 
                label="District" 
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                required 
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField 
                fullWidth 
                label="Area" 
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                required 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Distance to Town"
                name="distanceToTown"
                value={formData.distanceToTown}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </Box>

        {/* Specifications */}
        <Box className="space-y-4">
          <Typography variant="h6">Specifications</Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Square Footage"
                name="squareFootage"
                value={formData.squareFootage}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Year Built"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.furnished}
                    onChange={handleSwitchChange("furnished")}
                    name="furnished"
                  />
                }
                label="Furnished"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Utilities */}
        <Box className="space-y-4">
          <Typography variant="h6">Utilities</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.water}
                    onChange={handleSwitchChange("water")}
                    name="water"
                  />
                }
                label="Water"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.electricity}
                    onChange={handleSwitchChange("electricity")}
                    name="electricity"
                  />
                }
                label="Electricity"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.internet}
                    onChange={handleSwitchChange("internet")}
                    name="internet"
                  />
                }
                label="Internet"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Maintenance Details"
                name="maintenance"
                value={formData.maintenance}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        </Box>

        {/* Lease Terms */}
        <Box className="space-y-4">
          <Typography variant="h6">Lease Terms</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Stay"
                name="minimumStay"
                value={formData.minimumStay}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Security Deposit"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.petsAllowed}
                    onChange={handleSwitchChange("petsAllowed")}
                    name="petsAllowed"
                  />
                }
                label="Pets Allowed"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Image Upload Section */}
        <Box className="space-y-4">
          <Typography variant="h6">Images</Typography>

          {/* Main Image Upload */}
          <Box className="space-y-2">
            <Typography variant="subtitle1">Main Image (Required)</Typography>
            <input
              type="file"
              accept="image/*"
              name="mainImage"
              id="main-image-upload"
              onChange={handleMainImageChange}
              required
              className="mb-2"
            />
            {mainImagePreview && (
              <img 
                src={mainImagePreview} 
                alt="Main preview" 
                className="max-w-xs h-auto mb-2"
              />
            )}
          </Box>

          {/* Gallery Images Upload */}
          <Box className="space-y-2">
            <Typography variant="subtitle1">Gallery Images (At least one required)</Typography>
            <input
              type="file"
              accept="image/*"
              name="gallery"
              id="gallery-images-upload"
              multiple
              onChange={handleGalleryImagesChange}
              required
              className="mb-2"
            />
            <Grid container spacing={2}>
              {galleryPreviews.map((preview, index) => (
                <Grid item xs={4} sm={3} md={2} key={index}>
                  <img 
                    src={preview} 
                    alt={`Gallery preview ${index + 1}`}
                    className="w-full h-auto"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className="mt-6"
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={24} className="mr-2" />
              Creating Property...
            </>
          ) : (
            'Create Property'
          )}
        </Button>
      </form>
    </Paper>
  );
};

export default PropertyForm;