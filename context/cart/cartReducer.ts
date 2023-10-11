import { CartState, ShippingAddress } from ".";
import { ICartProduct } from "@/interfaces";


type CartActionType =
    | { type: '[CART] - LOAD', payload: ICartProduct[] }
    | { type: '[CART] - ADD PRODUCT', payload: ICartProduct[] }
    | { type: '[CART] - LOAD FROM COOKIE', payload: ICartProduct[] }
    | { type: '[CART] - UPDATE QUANTITY', payload: ICartProduct }
    | { type: '[CART] - REMOVE PRODUCT', payload: ICartProduct }
    | { type: '[CART] - LOAD ADDRESS FROM COOKIE', payload: ShippingAddress}
    | { type: '[CART] - UPDATE ADDRESS', payload: ShippingAddress}
    | { type: '[CART] - UPDATE SUMMARY', payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
    } }
    | { type: '[CART] - ORDER COMPLETE' }

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[CART] - LOAD':
            return {
                ...state
            }
        case '[CART] - ADD PRODUCT':
            return {
                ...state,
                cart: [...action.payload]
            }
        case '[CART] - LOAD FROM COOKIE':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }
        case '[CART] - UPDATE QUANTITY':
            return {
                ...state,
                cart: state.cart.map((product) => {
                    if( product._id !== action.payload._id ) return product;
                    if( product.size !== action.payload.size ) return product;
                    return action.payload;
                })
            }
        case '[CART] - REMOVE PRODUCT':
            return {
                ...state,
                cart: state.cart.filter((product) => {
                    if ( product._id === action.payload._id && product.size === action.payload.size ) return false;
                    return true;
                })
            }
        case '[CART] - UPDATE SUMMARY':
            return {
                ...state,
                ...action.payload
            }
        case '[CART] - UPDATE ADDRESS':
        case '[CART] - LOAD ADDRESS FROM COOKIE':
            return {
                ...state,
                shippingAddress: action.payload
            }
        case '[CART] - ORDER COMPLETE':
            return {
                ...state,
                cart: [],
                numberOfItems: 0,
                subTotal: 0,
                tax: 0,
                total: 0,
            }

        default:
            return state;
    }
}