import React, { useState, useMemo, createContext, useContext } from 'react';
import { Stack, Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, Alert, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Definir los tipos de datos para productos y carrito
interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tallas_disponibles: string[];
  colores: string[];
  url_imagen: string;
  cantidad_en_stock: number;
}
interface CartItem {
  product: Product;
  quantity: number;
}

// Crear un contexto para el carrito de compras
const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  calculateTotal: () => string;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  calculateTotal: () => '0.00',
});

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
