"use client"

import Image from "next/image";
import { ImagesSliderDemo } from "../components/image-slider";
import Navbar from "../components/navbar";
import HouseSection from "../components/housessection";
import { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    
    fetchProperties();
  }, []);

  return (
    <main className=" min-h-screen flex-col">
      <Navbar />
      <ImagesSliderDemo />
      <HouseSection houses={properties} />
    </main>
  );
}
