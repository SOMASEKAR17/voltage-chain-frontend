import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  location,
  price,
}) => {
  return (
    <div className="shadow border-black h-[300px] flex flex-col items-center rounded-lg overflow-hidden hover:border-cyan-400/60 transition-colors cursor-pointer">
      <div className=" h-[60%] w-[70%] rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className=" mx-auto mt-10 w-full h-full rounded-lg bg-black object-cover "
        />
      </div>
      <div className="p-3 font-avant">
        <h4 className="text-white text-sm font-semibold mb-1 line-clamp-2">
          {title}
        </h4>
        <p className="text-gray-400 text-xs mb-2">{location}</p>
        <p className="text-cyan-400 font-bold text-sm">{price}</p>
      </div>
    </div>
  );
};

const productsData = [
  {
    image: "https://5.imimg.com/data5/CY/HS/VU/SELLER-743647/exide-inverter-battery.jpeg",
    title: "Mens Desi Hanging Watch Casual Watch",
    location: "New Delhi",
    price: "$19.00",
  },
  {
    image: "https://media.istockphoto.com/id/1384336411/photo/battery-choice-car-battery-without-brand-surrounded-by-other-batteries-3d-illustration.jpg?s=612x612&w=0&k=20&c=k61kGIR7iBfQfmvGucRipWk4Ut86CxFAc9jxRE0w1VU=",
    title: "Mens Desi Hanging Watch Casual Watch",
    location: "New Delhi",
    price: "$19.00",
  },
  {
    image: "https://m.media-amazon.com/images/I/41KD-sbulKL.jpg",
    title: "Mens Desi Hanging Watch Casual Watch",
    location: "New Delhi",
    price: "$19.00",
  },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {productsData.map((product, index) => (
        <ProductCard
          key={index}
          image={product.image}
          title={product.title}
          location={product.location}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
