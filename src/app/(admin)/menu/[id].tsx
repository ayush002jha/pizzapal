import { Link, Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useState } from "react";
import { getBackgroundColorAsync } from "expo-system-ui";
import Button from "@/src/components/Button";

import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

// To push to other screens
import { useRouter } from 'expo-router'
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";


const Product = () => {
    // This dynamic path/variable value can be accessed by
    const { id } = useLocalSearchParams();

    // Collect the product details based on the ids recieved
    const product = products.find((product) => product.id.toString() === id);

    const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

    // To keep track of the selected Size
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

    // To get values accessed from context
    const { items, addItem } = useCart();

    // To render other screens
    const router = useRouter();

    // Add To cart Function
    const addToCart = () => {
        console.warn("Item Added: " + selectedSize)
        if (!product) {
            return <Text>Product Not Found!!!</Text>
        } else {
            addItem(product, selectedSize);
            // Redirect/Render this screen
            router.push("/cart")
        }

    }

    if (!product) {
        return <Text>Product Not Found!!!</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitleAlign: "center", headerRight: () => (
                    // Tells what page to render
                    <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <FontAwesome
                                    name="pencil"
                                    size={25}
                                    color={Colors.light.tint}
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                />
                            )}
                        </Pressable>
                    </Link>
                ),
            }} />
            {/* Expo knows which screen is targeted so the name is not required 
                Also we can have access to the dynamic variables!
             */}
            <Stack.Screen options={{ title: product?.name }} />
            <Image resizeMode="contain" source={{ uri: product?.image || defaultPizzaImage }} style={styles.img} />
            <Text style={styles.title}>{product?.name}</Text>
            <Text style={styles.price}>$ {product?.price}</Text>

        </View>
    );

}

const styles = StyleSheet.create({
    img: {
        width: "100%",
        aspectRatio: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
    },

})

export default Product