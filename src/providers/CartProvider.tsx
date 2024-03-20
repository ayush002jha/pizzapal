import { PropsWithChildren, ReactPropTypes, createContext, useContext, useState } from "react";
import { CartItem, Product } from "../types";

// Function To generate UUID
import { randomUUID } from "expo-crypto";


// This type will be assigned to the CartContext
type CartType = {
    items: Array<CartItem>;
    addItem: (product:Product, size:CartItem['size'])=>void;
    updateQuantity: (itemId: string, amount: -1 | 1)=>void;
}

// Create a context....it has two methods Provider and Consumer
const CartContext = createContext<CartType>({
    items: [],
    addItem: ()=>{},
    updateQuantity: ()=>{}
})

// Provider is used to provide the values
// Props With Children is React helper Type
const CartProvider = ({children}:PropsWithChildren)=>{

    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product:Product, size:CartItem['size'])=>{
        // if already in cart, simply update the quantity
        const existingItem = items.find((item)=> item.product === product && item.size === size);
        if(existingItem){
            return updateQuantity(existingItem.id, 1);
        }

        const newCartItem: CartItem = {
            id: randomUUID(), //generate random UUID
            product,
            product_id: product.id,
            size,
            quantity: 1 
        }

        // Update the items using spread operator!!!
        setItems([newCartItem, ...items])
    }

    // Update Quantity
    const updateQuantity = (itemId: string, amount: -1 | 1)=>{
        // This returns array of items with updated quantity
        // map function is used to iterate through array and 
        // with biconditional, if the ids match we simply return updated quantity with help of spread operator 
        const updatedItems = items.map((item)=>{
            return item.id === itemId? {...item, quantity: item.quantity+(amount)} : item;
        });

        // If item quantity is 0, remove from cart using filter
        // Finally update the state variable
        setItems(updatedItems.filter((item)=>item.quantity>0));
    }

    return (
        // value here is what we export basically and make available for consumer
        //  All the children wrapped inside the provider will be able consume these values
        <CartContext.Provider value={{items, addItem, updateQuantity}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;

// This Short cut will help you to just import single custom hook useCart
// instead of both context and hook everytime in other components
export const useCart = () => useContext(CartContext);