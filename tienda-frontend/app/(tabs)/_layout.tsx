import React, { useState, useEffect, createContext, useContext } from 'react';
import { Stack, Link } from 'expo-router';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
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
    Alert.alert("Éxito", `${product.nombre} ha sido añadido al carrito.`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
    Alert.alert("Producto Eliminado", "El producto ha sido eliminado del carrito.");
  };

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + (item.product.precio * item.quantity), 0);
    return total.toFixed(2);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

const TabBarIcon = ({ name, color }: { name: any; color: string }) => (
  <FontAwesome5 size={20} style={{ marginBottom: -3 }} name={name} color={color} />
);

const AppLayout = () => {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Tienda de Ropa',
            headerRight: () => (
              <Link href="/cart" asChild>
                <TouchableOpacity style={styles.headerRightContainer}>
                  <TabBarIcon name="shopping-cart" color="#3B82F6" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: 'Detalles del Producto',
            headerRight: () => (
              <Link href="/cart" asChild>
                <TouchableOpacity style={styles.headerRightContainer}>
                  <TabBarIcon name="shopping-cart" color="#3B82F6" />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: 'Tu Carrito',
          }}
        />
      </Stack>
    </CartProvider>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    paddingHorizontal: 15,
  },
});

export default AppLayout;
