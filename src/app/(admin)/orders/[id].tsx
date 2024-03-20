import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import OrderListItem from '@/src/components/OrderListItem'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'

import EachOrderListItem from '@/src/components/EachOrderListItem'
import { OrderStatusList } from '@/src/types'
import Colors from '@/src/constants/Colors'

const OrderDetailsScreen = () => {

    const { id } = useLocalSearchParams();
    const order = orders.find((order) => order.id.toString() === id)
    if (!order) {
        return <Text>Item not Found</Text>
    }

    return (
        <View style={{}}>
            <Stack.Screen options={{ title: "Order #" + id, headerTitleAlign: "center" }} />


            <FlatList data={order.order_items} contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => <EachOrderListItem orderItem={item} />}
                ListHeaderComponent={() => <OrderListItem order={order} />}
                ListFooterComponent={() => (<>
                    <Text style={{ fontWeight: 'bold' }}>Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        {OrderStatusList.map((status) => (
                            <Pressable
                                key={status}
                                onPress={() => console.warn('Update status')}
                                style={{
                                    borderColor: Colors.light.tint,
                                    borderWidth: 1,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginVertical: 10,
                                    backgroundColor:
                                        order.status === status
                                            ? Colors.light.tint
                                            : 'transparent',
                                }}
                            >
                                <Text
                                    style={{
                                        color:
                                            order.status === status ? 'white' : Colors.light.tint,
                                    }}
                                >
                                    {status}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </>
                )}
            />
        </View>
    )
}

export default OrderDetailsScreen