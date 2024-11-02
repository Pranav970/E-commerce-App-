import React from 'react';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, isOpen, onClose }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ShoppingBag className="text-gray-700" />
                Shopping Cart
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X />
              </motion.button>
            </div>

            <div className="p-4 space-y-4 h-[calc(100vh-200px)] overflow-auto">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-gray-500 py-8"
                  >
                    Your cart is empty
                  </motion.p>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 border-b pb-4"
                    >
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span>{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus size={16} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, color: '#ef4444' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto text-red-500"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t"
            >
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="font-bold"
                >
                  ${total.toFixed(2)}
                </motion.span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
                onClick={() => alert('Checkout functionality would be implemented here')}
              >
                Checkout
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}