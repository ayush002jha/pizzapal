import { View, Text, FlatList } from 'react-native'
import React from 'react'
import OrderListItem from '@/src/components/OrderListItem'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'

import EachOrderListItem from '@/src/components/EachOrderListItem'

const OrderDetailsScreen = () => {

    const { id } = useLocalSearchParams();
    const singleOrder = orders.find((order) => order.id.toString() === id)
    if (!singleOrder) {
        return <Text>Item not Found</Text>
    }

    return (
        <View style={{}}> 
            <Stack.Screen  options={{ title: "Order #"+id, headerTitleAlign: "center" }} />

            
            <FlatList data={singleOrder.order_items} contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => <EachOrderListItem orderItem={item} />} 
                ListHeaderComponent={()=><OrderListItem order={singleOrder} />}
                />
        </View>
    )
}

export default OrderDetailsScreen