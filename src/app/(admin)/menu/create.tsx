import { View, Text, StyleSheet, TextInput , Image} from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {

    // State variables for input fields
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const [errors, setErrors] = useState("");

    // For image picker
    const [image, setImage] = useState<string|null>(null);


    const resetFields = ()=>{
        setName("");
        setPrice("");
    }

    // Validation Logic for Inputs
    const validateInputs = ()=>{
        setErrors("");
        if(!name){
            setErrors("Name is required!")
            return false
        }
        if(!price){
            setErrors("Price is required!")
            return false
        }
        if(isNaN(parseFloat(price))){
            setErrors("Price is not a Number!")
            return false
        }
        return true;
    };

    const onCreate = () => {
        // Only submit the data if validated first
        if(!validateInputs()){
            return;
        }
        console.warn("Creating Product")
        resetFields()
    }

    // Image Picker Function
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({

          mediaTypes: ImagePicker.MediaTypeOptions.Images, // You can have only Image or all
          allowsEditing: true, // This let's you edit image before submitting
          aspect: [4, 3], // defines the default aspect-ratio of the image
          quality: 1, // quality ranges from 0 to 1 and based on it's value image quality is scaled
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri); // here image value gets submitted successfully
        }
      };

    return (
        <View style={style.container}>
            <Stack.Screen options={{title:"Create Product", headerTitleAlign:"center"}} />

            <Image source={{uri:image||defaultPizzaImage}} style={style.image} />
            <Text onPress={pickImage} style={style.textButton}>Select Image</Text>

            <Text style={style.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder='Name' style={style.input} />
            
            <Text style={style.label}>Price ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder='9.99' style={style.input} keyboardType='numeric' />

            <Text style={{color:"red"}}>{errors}</Text>
            <Button onPress={onCreate} text='Create' />

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 5
    },
    label: {
        color: "gray",
        fontSize: 16
    },
    image:{
        width: "50%",
        aspectRatio: 1,
        alignSelf: "center",

    },
    textButton:{
        alignSelf: "center",
        fontWeight: "bold",
        color: Colors.light.tint,
        marginVertical: 10
    }
});

export default CreateProductScreen