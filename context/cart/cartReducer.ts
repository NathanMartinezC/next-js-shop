import { CartState } from ".";
import { ICartProduct } from "@/interfaces";


type CartActionType =
    | { type: '[CART] - LOAD', payload: ICartProduct[] }
    | { type: '[CART] - ADD PRODUCT', payload: ICartProduct[] }

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
        default:
            return state;
    }
}