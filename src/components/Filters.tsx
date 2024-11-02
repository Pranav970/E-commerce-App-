import React from 'react';
import { FilterState, SortOption } from '../types';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: SortOption) => void;
  sortOption: SortOption;
}

export function Filters({ filters, onFilterChange, onSortChange, sortOption }: FiltersProps) {
  const categories = ['T-Shirts', 'Jeans', 'Jackets', 'Dresses'];
  const colors = ['white', 'black', 'blue', 'red', 'green', 'beige', 'floral'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md sticky top-24"
    >
      <motion.div
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="flex items-center gap-2 mb-6"
      >
        <SlidersHorizontal className="text-gray-600" />
        <h2 className="text-xl font-semibold">Filters</h2>
      </motion.div>
      
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) })}
              placeholder="Min"
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
              placeholder="Max"
              className="w-full rounded-lg border-gray-200 shadow-sm focus:border-black focus:ring-black transition-colors"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <motion.button
                key={color}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const newColors = filters.colors.includes(color)
                    ? filters.colors.filter((c) => c !== color)
                    : [...filters.colors, color];
                  onFilterChange({ ...filters, colors: newColors });
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.colors.includes(color)
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {color}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <motion.button
                key={size}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const newSizes = filters.sizes.includes(size)
                    ? filters.sizes.filter((s) => s !== size)
                    : [...filters.sizes, size];
                  onFilterChange({ ...filters, sizes: newSizes });
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                  filters.sizes.includes(size)
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}