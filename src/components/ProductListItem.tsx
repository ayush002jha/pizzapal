import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
// Here we have imported the Types 
import { Product } from "../types";
import { Link, useSegments } from "expo-router";

// To apply the types to all the incoming props in this component, its better to wrap this way
type ProductListItemProps = {
  product: Product
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'


const ProductListItem = ({ product }: ProductListItemProps) => {
  // It gives us the array of splitted pathway like admin,menu,id
  const segments = useSegments();
  // console.log(segments)
  return (
    <Link href={`../${segments[0]}/menu/${product.id}`} asChild>
      <Pressable  style={styles.container}>
        {/* Since the image cannot have null uri so we had to pass a default image to it for fallback*/}
        <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    maxWidth: "50%",

  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold"
  },
  image: {
    width: "100%", // To make width relative/responsive to the screen size use the %
    aspectRatio: 1, // Renders the square since height and width is same for aspectRatio 1
  }
});


export default ProductListItem

