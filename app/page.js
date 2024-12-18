import Image from "next/image";
import { ImagesSliderDemo } from "../components/image-slider";
import Navbar from "../components/navbar";
import Houses from "../components/housessection";

export default function Home() {
  return (
    <main className=" min-h-screen flex-col">
      <Navbar />
      <ImagesSliderDemo />
      <Houses />
    </main>
  );
}
