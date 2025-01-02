"use client";
import React, { useState } from "react";
import { createProperty } from "../app/actions/property";
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
} from "@mui/material";
import { useRouter } from "next/navigation";

const PropertyForm = () => {
  const router = useRouter();
  const [switches, setSwitches] = useState({
    furnished: false,
    water: false,
    electricity: false,
    internet: false,
    petsAllowed: false,
  });

  const handleSwitchChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSwitches((prev) => ({
        ...prev,
        [name]: event.target.checked,
      }));
    };

  async function clientAction(formData: FormData) {
    // Add switch values to form data
    Object.entries(switches).forEach(([key, value]) => {
      formData.set(key, value.toString());
    });

    const result = await createProperty(formData);

    if (result.success) {
      router.push("/agent/dashboard");
      router.refresh();
    } else {
      console.error("Failed to create property");
    }
  }

  return (
    <Paper className="p-6 max-w-4xl mx-auto">
      <form action={clientAction} className="space-y-6">
        <Typography variant="h5" className="mb-6">
          Add New Property
        </Typography>

        {/* Basic Information */}
        <Box className="space-y-4">
          <Typography variant="h6">Basic Information</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Title" name="title" required />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select name="type" required>
                  <MenuItem value="single room">Single Room</MenuItem>
                  <MenuItem value="self contain">Self Contain</MenuItem>
                  <MenuItem value="chember and hall">Chember and Hall</MenuItem>
                  <MenuItem value="bongallow">Bongallow</MenuItem>
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
              <TextField fullWidth label="Region" name="region" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="District" name="district" required />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Area" name="area" required />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Distance to Town"
                name="distanceToTown"
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
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Bathrooms"
                name="bathrooms"
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Square Footage"
                name="squareFootage"
                required
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Year Built"
                name="yearBuilt"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.furnished}
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
                    checked={switches.water}
                    onChange={handleSwitchChange("water")}
                    name="water"
                  />
                }
                label="Water"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.electricity}
                    onChange={handleSwitchChange("electricity")}
                    name="electricity"
                  />
                }
                label="Electricity"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.internet}
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
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Security Deposit"
                name="securityDeposit"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={switches.petsAllowed}
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
            <Typography variant="subtitle1">Main Image</Typography>
            <input
              type="file"
              accept="image/*"
              name="mainImage"
              id="main-image-upload"
            />
          </Box>

          {/* Gallery Images Upload */}
          <Box className="space-y-2">
            <Typography variant="subtitle1">Gallery Images</Typography>
            <input
              type="file"
              accept="image/*"
              name="gallery"
              id="gallery-images-upload"
              multiple
            />
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className="mt-6"
        >
          Create Property
        </Button>
      </form>
    </Paper>
  );
};

export default PropertyForm;
