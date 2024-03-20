import { Stack, useLocalSearchParams } from "expo-router";
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


const Product = () => {
    // This dynamic path/variable value can be accessed by
    const { id } = useLocalSearchParams();

    // Collect the product details based on the ids recieved
    const product = products.find((product) => product.id.toString() === id);

    const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

    // To keep track of the selected Size
    const [selectedSize,setSelectedSize] = useState<PizzaSize>('M')

    // To get values accessed from context
    const {items, addItem} = useCart();

    // To render other screens
    const router = useRouter();

    // Add To cart Function
    const addToCart = ()=>{
        console.warn("Item Added: "+ selectedSize)
        if (!product) {
            return <Text>Product Not Found!!!</Text>
        }else{
            addItem(product,selectedSize);
            // Redirect/Render this screen
            router.push("/cart")
        }

    }

    if (!product) {
        return <Text>Product Not Found!!!</Text>
    }
    return (
        <View style={styles.container}>
            {/* Expo knows which screen is targeted so the name is not required 
                Also we can have access to the dynamic variables!
             */}
            <Stack.Screen options={{ title: product?.name }} />
            <Image resizeMode="contain" source={{ uri: product?.image || defaultPizzaImage }} style={styles.img} />
            <Text> Select Size</Text>
            <View style={styles.sizes}>
                {
                    // To render the sizes
                    sizes.map((size) => {
                        return (
                            <Pressable key={size} style={[styles.size, {backgroundColor: selectedSize===size?"gainsboro":"white"}]} onPress={()=>{
                                setSelectedSize(size);
                            }}>
                                <Text style={[styles.sizeText, {color: selectedSize===size?"black":"gray"}]}>{size}</Text>
                            </Pressable>);
                    })
                }
            </View>
            <Text style={styles.price}>$ {product?.price}</Text>
            <Button text="Add to Cart" onPress={addToCart} />

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
    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: "auto"
    },
    sizes:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10
    },
    size:{
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:"gainsboro",
        width: 50,
        aspectRatio:1,
        borderRadius: 25
    },
    sizeText:{
        fontSize: 20,
        fontWeight: "500"
    }
})

export default Product