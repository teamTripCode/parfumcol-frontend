import CatalogPreview from "@/components/AllLotions";
import BlockchainDeliverySection from "@/components/Delivery";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import NavBar from "@/components/NavBar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <CatalogPreview />
      <BlockchainDeliverySection />
      <Footer />
    </>
  );
}