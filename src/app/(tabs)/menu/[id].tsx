import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";


const Product = () => {
    // This dynamic path/variable value can be accessed by
    const { id } = useLocalSearchParams();

    return (
        <View>
            {/* Expo knows which screen is targeted so the name is not required 
                Also we can have access to the dynamic variables!
             */}
            <Stack.Screen options={{ title: "Details: " + id }} />
            <Text> This Product Description is for id: {id}</Text>
        </View>
    );

}

export default Product