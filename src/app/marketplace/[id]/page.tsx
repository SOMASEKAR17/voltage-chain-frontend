"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { listingService } from "@/services/listingService";
import { Listing, ApiResponse } from "@/types/api.types";
import Link from "next/link";

const ProductDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [buyingLoading, setBuyingLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        console.log(`[Product Detail] Fetching listing with ID: ${id}`);
        const response = await listingService.getListingById(id);

        if (response && response.data) {
          console.log("[Product Detail] Listing loaded:", response.data);
          setListing(response.data);
        } else {
          toast.error("Listing not found");
        }
      } catch (error) {
        console.error("[Product Detail] Fetch error:", error);
        toast.error(
          `Failed to load listing: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  const handleBuy = async () => {
    const walletAddress = prompt("Enter your wallet address:");
    if (!walletAddress) return;

    setBuyingLoading(true);
    try {
      const response = await listingService.buyListing(id, walletAddress);

      if (response && response.success) {
        toast.success("Battery purchased successfully!");
        setListing((prev) => (prev ? { ...prev, status: "sold" } : null));
      } else {
        toast.error("Failed to purchase battery");
      }
    } catch (error) {
      console.error("[Product Detail] Buy error:", error);
      toast.error(
        `Failed to complete purchase: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setBuyingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading product details...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-bold mb-4">
          Listing Not Found
        </h1>
        <Link href="/marketplace" className="text-cyan-400 hover:text-cyan-300">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const mainImage =
    listing.images && listing.images.length > 0
      ? listing.images.find((img) => img.position === 0)?.image_url ||
        listing.images[0]?.image_url
      : "https://5.imimg.com/data5/CY/HS/VU/SELLER-743647/exide-inverter-battery.jpeg";

  const displayImages =
    listing.images && listing.images.length > 0 ? listing.images : [];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link
            href="/marketplace"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
          >
            ← Back to Marketplace
          </Link>
          <span
            className={`px-4 py-2 rounded-full text-sm font-bold ${
              listing.status === "sold"
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {listing.status === "sold" ? "SOLD" : "AVAILABLE"}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-800 flex items-center justify-center border border-cyan-400/30">
              <img
                src={mainImage}
                alt={listing.battery_code || "Battery"}
                className="w-full h-full object-cover"
              />
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={img.id}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-cyan-400`}
                  >
                    <img
                      src={img.image_url}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-8">
            {/* Header Info */}
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {listing.brand}
                </h1>
                <p className="text-cyan-400 text-lg">
                  Battery Code: {listing.battery_code}
                </p>
              </div>

              {/* AI Verified Badge */}
              {listing.ai_verified && (
                <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg w-fit">
                  <span className="text-2xl">✓</span>
                  <span className="font-semibold">AI Verified</span>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="border-t border-b border-cyan-400/20 py-6">
              <div className="text-gray-400 text-sm mb-2">Price</div>
              <div className="text-5xl font-bold text-cyan-400">
                ${listing.price.toFixed(2)}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-400/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">⚡</span> Specifications
              </h3>

              <div className="space-y-4">
                {listing.health_score !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Health Score</span>
                    <div className="flex items-center gap-3">
                      <div className="w-64 bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            listing.health_score >= 80
                              ? "bg-green-500"
                              : listing.health_score >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${listing.health_score}%` }}
                        />
                      </div>
                      <span className="text-white font-bold w-12 text-right">
                        {listing.health_score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}

                {listing.user_voltage !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">User Voltage</span>
                    <span className="text-white font-semibold">
                      {listing.user_voltage.toFixed(2)}V
                    </span>
                  </div>
                )}

                {listing.predicted_voltage !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Predicted Voltage</span>
                    <span className="text-white font-semibold">
                      {listing.predicted_voltage.toFixed(2)}V
                    </span>
                  </div>
                )}

                {listing.battery_code && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Battery Code</span>
                    <span className="text-white font-mono">
                      {listing.battery_code}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Info */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-400/20">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">🔍</span> Verification Status
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">AI Verified</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    listing.ai_verified
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {listing.ai_verified ? "Verified" : "Pending"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleBuy}
                disabled={listing.status === "sold" || buyingLoading}
                className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                  listing.status === "sold" || buyingLoading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white"
                }`}
              >
                {buyingLoading
                  ? "Processing..."
                  : listing.status === "sold"
                    ? "Sold Out"
                    : "Buy Now"}
              </button>

              <button className="px-6 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all font-bold">
                Add to Wishlist
              </button>
            </div>

            {/* Created Date */}
            {listing.created_at && (
              <div className="text-gray-500 text-sm text-center pt-4 border-t border-gray-800">
                Listed on {new Date(listing.created_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
