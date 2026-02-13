import React from "react";

const SwapOrder: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="font-avant text-2xl text-white font-semibold mb-6">
        Swap / Order Battery
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Swap Request */}
        <div className="shadow border-black rounded-2xl p-8">
          <h3 className="font-avant text-xl text-white font-semibold mb-6">
            Create Swap Request
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
                I have (My Battery)
              </label>
              <input
                type="text"
                placeholder="Select your battery"
                className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
                I want (Battery to swap with)
              </label>
              <input
                type="text"
                placeholder="Select battery to swap"
                className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
                Additional Notes
              </label>
              <textarea
                placeholder="Add any additional notes"
                rows={4}
                className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
              ></textarea>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-avant font-semibold py-3 rounded-lg hover:shadow-lg transition-all">
              Request Swap
            </button>
          </div>
        </div>

        {/* Order Battery */}
        <div className="shadow border-black rounded-2xl p-8">
          <h3 className="font-avant text-xl text-white font-semibold mb-6">
            Order Battery
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
                Select Battery
              </label>
              <select className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors">
                <option>Choose a battery</option>
                <option>Tesla Model 3 Battery</option>
                <option>Lithium Ion 5000mAh</option>
                <option>Lead Acid 12V</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                placeholder="Enter quantity"
                className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
                Shipping Address
              </label>
              <textarea
                placeholder="Enter your shipping address"
                rows={4}
                className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
              ></textarea>
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-avant font-semibold py-3 rounded-lg hover:shadow-lg transition-all">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapOrder;
