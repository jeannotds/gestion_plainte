import React from 'react';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
}

export default function ProductCard({ image, name, price, category }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{category}</p>
        <h3 className="text-sm font-medium text-gray-900 mt-1">{name}</h3>
        <p className="text-sm font-semibold text-gray-900 mt-1">{price}</p>
      </div>
    </div>
  );
}