"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import HouseCard from "./housecard";
import {useParams} from "next/navigation"


const HouseSection = ({ houses }: { houses: any[] }) => {
  const {id} = useParams()
  return (
    <Box className="mb-10 mt-10">
      <Typography className = "text-[50px] text-blue-600 ml-[20px]">Appartments</Typography>
      <div className="slider-container">
        <Grid container spacing={2}>
          {houses.map((house, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={`${house.Id}-${index}`}>
              <HouseCard house={house} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default HouseSection;

