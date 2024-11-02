import React, { useState } from 'react';
import { ShoppingCart as CartIcon, Star, Send, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, CartItem, FilterState, SortOption } from './types';
import { products } from './data/products';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { Cart } from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    colors: [],
    sizes: [],
  });
  const [sortOption, setSortOption] = useState<SortOption>('price-asc');

  const filteredProducts = products
    .filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
      if (filters.colors.length > 0 && !filters.colors.includes(product.color)) return false;
      if (filters.sizes.length > 0 && !product.sizes.some(size => filters.sizes.includes(size))) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: product.sizes[0] }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-gray-900"
            >
              Fashion Store
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <CartIcon />
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </motion.div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">About Our Collection</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 leading-relaxed">
                Discover our curated collection of contemporary fashion pieces designed for the modern individual. 
                From casual essentials to elegant evening wear, each item is carefully selected to ensure quality, 
                style, and comfort.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Premium materials and craftsmanship
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Sustainable and ethical production
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Inclusive sizing options
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Free shipping on orders over $100
                </li>
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800"
                alt="Fashion Collection"
                className="rounded-lg shadow-md w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Feedback Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Customer Feedback</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "Amazing quality and fast shipping. The dress fits perfectly!",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150"
              },
              {
                name: "Michael Chen",
                rating: 5,
                comment: "Great selection of clothes. The size guide was very helpful.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150"
              },
              {
                name: "Emma Williams",
                rating: 5,
                comment: "Excellent customer service and beautiful clothes!",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
              }
            ].map((feedback, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={feedback.image}
                    alt={feedback.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{feedback.name}</h3>
                    <div className="flex gap-1">
                      {Array.from({ length: feedback.rating }).map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{feedback.comment}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 mb-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-600" />
                  <span>support@fashionstore.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-600" />
                  <span>123 Fashion Street, New York, NY 10001</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold mb-2">Business Hours</h4>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 focus:border-black focus:ring-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 focus:border-black focus:ring-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border-gray-200 focus:border-black focus:ring-black transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>

      <Cart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default App;