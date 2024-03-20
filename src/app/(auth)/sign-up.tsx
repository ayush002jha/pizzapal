import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';

const SignIn = () => {

    // State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");




    const resetFields = () => {
        setEmail("");
        setPassword("");
    }

    // Validation Logic for Inputs
    const validateInputs = () => {
        setErrors("");
        if (!email) {
            setErrors("Email is required!")
            return false
        }
        if (!password) {
            setErrors("Password is required!")
            return false
        }
        return true;
    };

    // On Form Submit
    const onSubmit = () => {
        if (!validateInputs()) {
            return;
        }
        console.warn("Signed UP")
    };

    return (
        <View style={style.container}>
            <Stack.Screen options={{ title: "Sign up", headerTitleAlign: "center" }} />

            <Text style={style.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder='xyz@gmail.com' style={style.input} />

            <Text style={style.label}>Password</Text>
            <TextInput value={password} onChangeText={setPassword} textContentType='password'  secureTextEntry={true}  placeholder='***' style={style.input} />

            <Text style={{ color: "red" }}>{errors}</Text>
            <Button onPress={onSubmit} text="Create an account" />
            <Link href={"/(auth)/sign-in"} style={style.textButton}>Sign in</Link>

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
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1
    },
    label: {
        color: "gray",
        fontSize: 16
    },
    image: {
        width: "50%",
        aspectRatio: 1,
        alignSelf: "center",

    },
    textButton: {
        alignSelf: "center",
        fontWeight: "bold",
        color: Colors.light.tint,
        marginVertical: 10
    },

});


export default SignIn