import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../providers/CartProvider'

import CartListItem from '../components/CartListItem'

const CartScreen = () => {
    const { items } = useCart(); // since we are using handy shortcut


    return (
        <View>
            <FlatList contentContainerStyle={{padding:10,gap:10}} data={items} renderItem={({item}) => <CartListItem cartItem={item} />} />
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen