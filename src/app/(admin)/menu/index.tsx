import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

export default function MenuScreen() {
  return (

    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }} // This is being used to have spacing between columns
      contentContainerStyle={{ gap: 10, padding: 10 }} // spacing between rows (GAP) and Spacing all around container (PADDING)
    />
  );
}
