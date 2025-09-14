import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCart } from './_layout';

// Definir los tipos de datos para productos
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

const ProductDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el producto.');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        Alert.alert("Error", "No se pudo cargar los detalles del producto.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Cargando detalles del producto...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Producto no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.url_imagen || "https://placehold.co/400x500" }}
        style={styles.productImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.nombre}</Text>
        <Text style={styles.productPrice}>${product.precio.toFixed(2)}</Text>
        <Text style={styles.productDescription}>{product.descripcion}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tallas:</Text>
          <Text style={styles.infoText}>{product.tallas_disponibles.join(', ')}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Colores:</Text>
          <Text style={styles.infoText}>{product.colores.join(', ')}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Añadir al Carrito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#4B5563',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
  },
  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#6B7280',
  },
  addToCartButton: {
    backgroundColor: '#10B981',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProductDetailsPage;
