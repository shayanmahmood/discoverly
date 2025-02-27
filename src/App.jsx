/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import CategorySection from "./pages/CategorySection";
import SubTopicCarousel from "./pages/SubTopicsSlider";
import UpCommingEvts from "./pages/UpCommingEvts";
import FeaturedEvents from "./pages/FeaturedEvents";
import Testmonials from "./pages/Testmonials";
import BlogsSection from "./pages/BlogsSection";
import NewsLetter from "./pages/NewsLetter";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <SubTopicCarousel />
        <UpCommingEvts />
        <FeaturedEvents />
        <Testmonials />
        <BlogsSection />
        <NewsLetter />
        <Footer />
      </main>
    </div>
  );
}

export default App;
