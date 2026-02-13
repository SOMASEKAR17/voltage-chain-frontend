import React, { useState } from "react";
import { batteryService } from "@/services/batteryService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  readOnly?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  readOnly = false,
}) => {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );
};

const ListBattery: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    battery_code: '',
    brand: '',
    initial_capacity: '',
    current_capacity: '',
    manufacture_year: '',
    charging_cycles: '',
    owner_wallet: '0x533FEd3e4486D029E20387031EfD9E87cBBbc5fd', 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(true);

    try {
      const payload = {
        ...formData,
        initial_capacity: Number(formData.initial_capacity),
        current_capacity: Number(formData.current_capacity),
        manufacture_year: Number(formData.manufacture_year),
        charging_cycles: formData.charging_cycles ? Number(formData.charging_cycles) : undefined,
      };

      const response = await batteryService.listBattery(payload);
      
      if (response.success) {
        toast.success(`Success! Battery listed. Token ID: ${response.data?.nft_token_id || 'Pending'}`);
        // Redirect to my-orders or dashboard after success
        setTimeout(() => {
           // Reloading to ensuring state is fresh or navigation? 
           // For now just redirecting? usage of window.location.reload() might be too aggressive.
           // router.push('/dashboard'); 
           // Reset form?
           setFormData({
            battery_code: '',
            brand: '',
            initial_capacity: '',
            current_capacity: '',
            manufacture_year: '',
            charging_cycles: '',
            owner_wallet: '0xTestOwnerWallet',
           })
        }, 2000);
      } else {
        toast.error(`Error: ${response.error || response.message}`);
      }
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="font-avant text-2xl text-white font-semibold mb-6">
        List a Battery
      </h2>

      <div className="shadow border-black rounded-2xl p-8 max-w-2xl bg-gray-900/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
                label="Battery Code" 
                placeholder="Enter battery code" 
                name="battery_code"
                value={formData.battery_code}
                onChange={handleChange}
                required
            />
            <FormInput 
                label="Brand" 
                placeholder="Enter brand" 
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <FormInput 
                label="Initial Capacity (mAh)" 
                placeholder="Enter initial capacity" 
                type="number"
                name="initial_capacity"
                value={formData.initial_capacity}
                onChange={handleChange}
                required
            />
             <FormInput 
                label="Current Capacity (mAh)" 
                placeholder="Enter current capacity" 
                type="number"
                name="current_capacity"
                value={formData.current_capacity}
                onChange={handleChange}
                required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
                label="Manufacture Year" 
                placeholder="Enter year" 
                type="number"
                name="manufacture_year"
                value={formData.manufacture_year}
                onChange={handleChange}
                required
            />
            <FormInput 
                label="Charging Cycles" 
                placeholder="Enter cycles" 
                type="number"
                name="charging_cycles"
                value={formData.charging_cycles}
                onChange={handleChange}
            />
          </div>
          
           <div>
            <FormInput 
                label="Owner Wallet" 
                placeholder="Wallet Address" 
                name="owner_wallet"
                value={formData.owner_wallet}
                onChange={handleChange}
                readOnly
            />
          </div>

          {/* 
            Description and Image Upload were in the original UI but are not in the current API service payload.
            Hiding them for now to match functionality, or we could add them to payload if backend supports.
          */}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-avant font-semibold py-3 rounded-lg hover:shadow-lg transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}
          >
            {loading ? 'Processing...' : 'List Battery'}
          </button>


        </form>
      </div>
    </div>
  );
};

export default ListBattery;
