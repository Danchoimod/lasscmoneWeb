import Navbar from "@/components/common/Navbar"; 
import Footer from "@/components/common/Footer";
import Carousel from "@/components/features/Carousel";
import FilterSection from "@/components/features/FilterSection";
import ContentGrid from "@/components/features/ContentGrid";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F6F6] font-sans text-zinc-900">
      {/* Navbar at the top */}
      <Navbar />

      {/* Hero Carousel Section */}
      <Carousel />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20">
        {/* Search and Filters */}
        <FilterSection />

        {/* Content Grid */}
        <ContentGrid />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
