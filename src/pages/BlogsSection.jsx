/* eslint-disable react/react-in-jsx-scope */
import { ArrowRight } from "lucide-react";
import BlogCard from "../components/BlogCard";

function BlogsSection() {
  return (
    <section className="py-10 sm:py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
              Event Insights & Tips
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Stay updated with the latest event trends and planning advice
            </p>
          </div>
          <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base">
            View All Articles <ArrowRight size={16} className="ml-1 sm:ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <BlogCard
            title="10 Tips for Networking at Business Events"
            category="Business"
            date="April 28, 2025"
            image="https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            excerpt="Learn how to make meaningful connections and maximize your networking opportunities at business events."
          />
          <BlogCard
            title="The Rise of Virtual Reality in Events"
            category="Technology"
            date="April 25, 2025"
            image="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            excerpt="Discover how VR technology is transforming the event industry and creating immersive experiences."
          />
          <BlogCard
            title="How to Choose the Right Events for Your Personal Growth"
            category="Lifestyle"
            date="April 22, 2025"
            image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            excerpt="Find out how to select events that align with your personal and professional development goals."
          />
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;
