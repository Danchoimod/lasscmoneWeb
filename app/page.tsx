import Carousel from "@/components/features/Carousel";
import FilterSection from "@/components/features/FilterSection";
import ContentGrid from "@/components/features/ContentGrid";

export default function LoginPage() {
  return (
    <div className="bg-[#F6F6F6] font-sans text-zinc-900">
      {/* Hero Carousel Section */}
      <Carousel />

      {/* Main Content Area */}
      <div className="w-full pb-20">
        {/* Search and Filters */}
        <FilterSection />

        {/* Content Grid */}
        <ContentGrid />
      </div>
    </div>
  );
}
