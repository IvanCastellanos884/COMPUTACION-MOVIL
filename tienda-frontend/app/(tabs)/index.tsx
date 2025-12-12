import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
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

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de productos.');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setMessage('Error al obtener productos. Asegúrate de que el backend esté funcionando.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // ✅ Función que reemplaza el ternario anidado
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      );
    }

    if (products.length > 0) {
      return (
        <View style={styles.productGrid}>
          {products.map(product => (
            <View key={product._id} style={styles.productCard}>
              <Link href={`/(tabs)/${product._id}`} asChild>
                <TouchableOpacity>
                  <Image
                    source={{ uri: product.url_imagen || "https://placehold.co/400x500" }}
                    style={styles.productImage}
                  />
                </TouchableOpacity>
              </Link>
              <View style={styles.cardContent}>
                <Text style={styles.productName}>{product.nombre}</Text>
                <Text style={styles.productPrice}>${product.precio.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
                  <Text style={styles.addToCartButtonText}>Añadir al Carrito</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    }

    return <Text style={styles.noProductsText}>No hay productos disponibles.</Text>;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Catálogo de Productos</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {renderContent()}
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
  message: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    marginTop: 8,
    color: '#4B5563',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  addToCartButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6B7280',
    marginTop: 50,
  },
});

export default HomePage;

