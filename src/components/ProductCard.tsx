import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

export function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-black transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="mt-3 flex gap-2">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}