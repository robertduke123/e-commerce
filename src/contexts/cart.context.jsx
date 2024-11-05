import { createContext, useEffect, useReducer, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    if(existingCartItem){
        return cartItems.map((cartItem) => (
            cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} :
             cartItem
        ))
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)        
    }

    return cartItems.map((cartItem) => (
        cartItem.id === productToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1} :
        cartItem
    ))
} 

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartPrice: 0
})

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const {type, payload} = action 
    console.log(payload);
    

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            } 
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            } 
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartPrice: 0
}

export const CartProvider = ({children}) => {

    const [{cartItems,isCartOpen, cartCount, cartPrice}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)        

        const newCartPrice = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        console.log(newCartItems);
        

        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS, 
            payload: {
                cartItems: newCartItems, 
                cartPrice: newCartPrice, 
                cartCount: newCartCount
            }})
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = (addCartItem(cartItems, productToAdd))
        updateCartItemReducer(newCartItems)
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = (removeCartItem(cartItems, productToRemove))
        updateCartItemReducer(newCartItems)
    }

    const clearItemFromCart = (productToClear) => {
        const newCartItems = (clearCartItem(cartItems, productToClear))
        updateCartItemReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool})
    }
    
    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount, 
        cartPrice
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}