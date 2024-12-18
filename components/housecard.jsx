import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import Image from "next/image";
import dynamic from "next/dynamic";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HouseCard = ({ house }) => (
  <Card className="mx-2 my-4 h-full shadow-lg">
    <CardMedia component="div" className="h-48 relative">
      <Image
        src={house.image}
        alt={house.title}
        width={300}
        height={300}
        className="rounded-t-lg w-full h-[200px]"
      />
    </CardMedia>
    <CardContent className="bg-white">
      <Link href={`/apartment/${house.Id}`} passHref>
        <Typography
          variant="h6"
          component="div"
          className="mb-2 text-[#3B82F6]"
        >
          {house.title}
        </Typography>
      </Link>
      <Typography variant="body2" color="text.secondary" className="mb-2">
        {house.Description.substring(0, 100)}...
      </Typography>
      <Box className="flex flex-wrap gap-2 mb-2">
        <Chip
          label={house.loction.region}
          size="small"
          className="bg-[#10B981] text-white"
        />
        <Chip
          label={house.loction.district}
          size="small"
          className="bg-[#10B981] text-white"
        />
        <Chip
          label={house.loction.area}
          size="small"
          className="bg-[#10B981] text-white"
        />
      </Box>
      <Typography variant="body2" className="text-[#F59E0B]">
        Gallery: {house.galery.length} photos
      </Typography>
    </CardContent>
  </Card>
);

export default HouseCard;
