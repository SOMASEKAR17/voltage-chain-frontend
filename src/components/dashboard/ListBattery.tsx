import React, { useState } from "react";

interface FormInputProps {
  label: string;
  placeholder: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  type = "text",
}) => {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
      />
    </div>
  );
};

const ListBattery: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="font-avant text-2xl text-white font-semibold mb-6">
        List a Battery
      </h2>

      <div className="shadow border-black rounded-2xl p-8 max-w-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Battery Name" placeholder="Enter battery name" />
            <FormInput label="Brand" placeholder="Enter brand" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Model" placeholder="Enter model number" />
            <FormInput
              label="Capacity (mAh)"
              placeholder="Enter capacity"
              type="number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Voltage (V)"
              placeholder="Enter voltage"
              type="number"
            />
            <FormInput label="Price" placeholder="Enter price" type="number" />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Condition
            </label>
            <select className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400/60 transition-colors">
              <option>Select condition</option>
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter battery description"
              rows={5}
              className="w-full bg-black/40 border border-cyan-400/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-avant font-semibold mb-2">
              Battery Image
            </label>
            <div className="border-2 border-dashed border-cyan-400/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-400/60 transition-colors">
              <p className="text-gray-400">
                Drag and drop your image here, or click to select
              </p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-avant font-semibold py-3 rounded-lg hover:shadow-lg transition-all">
            List Battery
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListBattery;
