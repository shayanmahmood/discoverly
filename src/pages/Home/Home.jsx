import React from "react";
import Hero from "../../components/Home/Hero";
import CategorySection from "../../components/Home/CategorySection";
import SubTopicCarousel from "../../components/Home/SubTopicsSlider";
import UpCommingEvts from "../../components/Home/UpCommingEvts";
import FeaturedEvents from "../../components/Home/FeaturedEvents";
import Testmonials from "../../components/Home/Testmonials";
import BlogsSection from "../../components/Home/BlogsSection";
import NewsLetter from "../../components/Home/NewsLetter";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <SubTopicCarousel />
      <UpCommingEvts />
      <FeaturedEvents />
      <Testmonials />
      <BlogsSection />
      <NewsLetter />
    </>
  );
}

export default Home;
