"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { listingService } from "@/services/listingService";
import { Listing } from "@/types/api.types";

const ListingDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    
    const [listing, setListing] = useState<Listing | null>(null);
    const [loading, setLoading] = useState(true);
    const [buying, setBuying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchListing = async () => {
            try {
                const response = await listingService.getListingById(id as string);
                if (response.success && response.data) {
                    setListing(response.data);
                } else {
                    setError(response.error || "Failed to load listing");
                }
            } catch (err: any) {
                 setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };
        fetchListing();
    }, [id]);

    const handleBuy = async () => {
        if (!listing) return;
        setBuying(true);
        // TODO: Get real buyer wallet from auth context
        const buyer_wallet = "0xTestBuyerWallet"; 
        
        try {
            const response = await listingService.buyListing(listing.id, buyer_wallet);
            if (response.success) {
                alert(`Successfully purchased! TX: ${response.data?.txHash}`);
                router.push('/dashboard'); // Redirect to dashboard
            } else {
                alert(`Purchase failed: ${response.error}`);
            }
        } catch (err: any) {
            alert(`Purchase failed: ${err.message}`);
        } finally {
            setBuying(false);
        }
    };

    if (loading) return <div className="text-white text-center pt-20">Loading...</div>;
    if (error) return <div className="text-red-500 text-center pt-20">Error: {error}</div>;
    if (!listing) return <div className="text-white text-center pt-20">Listing not found</div>;

    const mainImage = listing.images.find(img => img.position === 0)?.image_url || listing.images[0]?.image_url || "https://5.imimg.com/data5/CY/HS/VU/SELLER-743647/exide-inverter-battery.jpeg";

    return (
        <div className="w-full pt-28 px-10 min-h-screen text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image Section */}
                <div>
                     <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-900 h-[400px]">
                        <img src={mainImage} alt={listing.battery_code} className="w-full h-full object-contain" />
                     </div>
                     <div className="flex gap-2 mt-4 overflow-x-auto">
                        {listing.images.map((img) => (
                            <div key={img.id} className="w-20 h-20 rounded-md overflow-hidden border border-gray-700 cursor-pointer">
                                <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                     </div>
                </div>

                {/* Details Section */}
                <div>
                    <h1 className="text-4xl font-bold mb-2">{listing.brand} {listing.battery_code}</h1>
                    <p className="text-gray-400 mb-6">Listed Price: <span className="text-cyan-400 text-2xl font-bold ml-2">{listing.price} ETH</span></p>

                    <div className="bg-gray-800 rounded-xl p-6 mb-8">
                        <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Battery Health</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-sm">Health Score</p>
                                <p className="text-2xl font-bold text-green-400">{listing.health_score ? `${listing.health_score.toFixed(1)}%` : 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Predicted Voltage</p>
                                <p className="text-xl font-semibold">{listing.predicted_voltage} V</p>
                            </div>
                             <div>
                                <p className="text-gray-400 text-sm">Actual Voltage</p>
                                <p className="text-xl font-semibold">{listing.user_voltage || 'N/A'} V</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">AI Verified</p>
                                <p className={`text-xl font-semibold ${listing.ai_verified ? 'text-blue-400' : 'text-gray-500'}`}>
                                    {listing.ai_verified ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {listing.status === 'sold' ? (
                        <button disabled className="w-full py-4 bg-gray-600 text-white font-bold rounded-xl cursor-not-allowed">
                            SOLD OUT
                        </button>
                    ) : (
                         <button 
                            onClick={handleBuy}
                            disabled={buying}
                            className={`w-full py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-xl transition-all ${buying ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {buying ? 'Processing...' : 'Buy Now'}
                        </button>
                    )}
                   
                </div>
            </div>
        </div>
    );
};

export default ListingDetailsPage;
