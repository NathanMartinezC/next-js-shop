import { FC, useReducer, PropsWithChildren, useEffect, use } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '@/interfaces';
import { CartContext, cartReducer } from '.';


export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try{
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: '[CART] - LOAD FROM COOKIE', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[CART] - LOAD FROM COOKIE', payload: [] });
        }
    }, []);

    useEffect(() => {
        if (state.cart.length === 0 ) return;
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    useEffect(() => {
        const numberOfItems = state.cart.reduce( (prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce( (prev, current) => current.price * current.quantity + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0.15);
        const tax = subTotal * taxRate;

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax,
            total: subTotal + tax
        }
        console.log("SUMMARY:", orderSummary)
        dispatch({ type: '[CART] - UPDATE SUMMARY', payload: orderSummary });
    }, [state.cart]);

    const addProductToCart = (product: ICartProduct) => {
        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[CART] - ADD PRODUCT', payload: [...state.cart, product] });

        const productInCartButDiffSize = state.cart.some( p => p._id === product._id && p.size === product.size );
        if ( !productInCartButDiffSize ) return dispatch({ type: '[CART] - ADD PRODUCT', payload: [...state.cart, product] });

        const updatedProducts = state.cart.map( p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[CART] - ADD PRODUCT', payload: updatedProducts });

    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[CART] - UPDATE QUANTITY', payload: product });
    }

    const removeProductFromCart = (product: ICartProduct) => {
        dispatch({ type: '[CART] - REMOVE PRODUCT', payload: product });
    }

    return (
        <CartContext.Provider value={{ 
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeProductFromCart

        }}>
            { children }
        </CartContext.Provider>
    )
}