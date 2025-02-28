import React from "react";

import BlogsSection from "../components/Home/BlogsSection";
import CategorySection from "../components/Home/CategorySection";
import FeaturedEvents from "../components/Home/FeaturedEvents";
import Hero from "../components/Home/Hero";
import NewsLetter from "../components/Home/NewsLetter";
import SubTopicCarousel from "../components/Home/SubTopicsSlider";
import Testmonials from "../components/Home/Testmonials";
import UpCommingEvts from "../components/Home/UpCommingEvts";

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
