import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'; 
// 🔹 Se eliminó 'Alert' porque no se usa

import { useCart } from './_layout';
import { Link } from 'expo-router';

const CartPage = () => {
  const { cart, removeFromCart, calculateTotal } = useCart();
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tu Carrito de Compras</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Tu carrito está vacío.</Text>
          <Link href="/index" asChild>
            <TouchableOpacity>
              <Text style={styles.emptyCartLink}>Explora nuestros productos</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <>
          {cart.map(item => (
            <View key={item.product._id} style={styles.cartItem}>
              <Image 
                source={{ uri: item.product.url_imagen || "https://placehold.co/100x120" }} 
                style={styles.cartItemImage} 
              />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.product.nombre}</Text>
                <Text style={styles.cartItemPrice}>
                  ${(item.product.precio * item.quantity).toFixed(2)}
                </Text>
                <Text style={styles.cartItemQuantity}>Cantidad: {item.quantity}</Text>
              </View>
              <TouchableOpacity 
                onPress={() => removeFromCart(item.product._id)} 
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Pagar</Text>
            </TouchableOpacity>
          </View>
        </>

