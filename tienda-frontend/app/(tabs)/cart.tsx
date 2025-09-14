import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
              <Image source={{ uri: item.product.url_imagen || "https://placehold.co/100x120" }} style={styles.cartItemImage} />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.product.nombre}</Text>
                <Text style={styles.cartItemPrice}>${(item.product.precio * item.quantity).toFixed(2)}</Text>
                <Text style={styles.cartItemQuantity}>Cantidad: {item.quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.product._id)} style={styles.removeButton}>
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
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#1F2937',
  },
  emptyCartContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 10,
  },
  emptyCartLink: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cartItemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: 'bold',
    marginTop: 4,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#EF4444',
    padding: 8,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  checkoutButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CartPage;
