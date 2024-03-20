import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CartProvider'

import CartListItem from '../components/CartListItem'
import Button from '../components/Button'

const CartScreen = () => {
    const { items, total } = useCart(); // since we are using handy shortcut


    return (
        <View style={{padding:10}}>
            <FlatList contentContainerStyle={{gap:10}} data={items} renderItem={({item}) => <CartListItem cartItem={item} />} />

            <Text style={{marginTop:20, fontSize:20, fontWeight: '500'}}>Total: ${total}</Text>
            <Button text='Checkout' />
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen