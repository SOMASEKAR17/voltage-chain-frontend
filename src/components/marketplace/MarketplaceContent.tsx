import React from "react";
import SearchBar from "./SearchBar";
import CategorySection from "./CategorySection";
import PriceRangeSection from "./PriceRangeSection";
import BrandsSection from "./BrandsSection";
import TagsSection from "./TagsSection";
import ProductGrid from "./ProductGrid";

const MarketplaceContent = () => {
  return (
    <div className="w-full pt-20">
      <h1 className="text-4xl w-[50vw] px-10 py-5 rounded-2xl font-avant leading-tight shadow text-white mb-8">MARKETPLACE</h1>

      <SearchBar />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <CategorySection />
          <PriceRangeSection />
          {/* <BrandsSection />
          <TagsSection /> */}
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceContent;
