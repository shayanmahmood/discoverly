import CategoryCard from "../components/CategoryCard";

function CatogarySection() {
  return (
    <section className="py-10 sm:py-16 container mx-auto px-4">
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
          Explore Event Categories
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover events across various categories that match your interests
          and passions
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        <CategoryCard
          title="Technology"
          icon="Monitor"
          description="Tech conferences, workshops, and meetups"
          color="bg-blue-500"
        />
        <CategoryCard
          title="Business"
          icon="Briefcase"
          description="Networking, seminars, and professional events"
          color="bg-amber-500"
        />
        <CategoryCard
          title="Art & Culture"
          icon="Palette"
          description="Exhibitions, performances, and cultural festivals"
          color="bg-pink-500"
        />
        <CategoryCard
          title="Health & Wellness"
          icon="Heart"
          description="Fitness classes, wellness retreats, and health expos"
          color="bg-green-500"
        />
        <CategoryCard
          title="Entertainment"
          icon="Music"
          description="Concerts, shows, and entertainment events"
          color="bg-purple-500"
        />
      </div>
    </section>
  );
}

export default CatogarySection;
