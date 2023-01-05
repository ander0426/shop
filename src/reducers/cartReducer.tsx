import { types } from '../types/types'
import { AnyAction } from 'redux'
type Item = {
    id: number;
    name: string;
    quantity: number;
    price: number;
    total: number;
}
const validateCart = (items: any, payload: any) => {
    const cart = items.map((product: Item) => {
        if (product.id === payload.id) {
            product.quantity = payload.quantity + product.quantity
            product.total = product.price * product.quantity
        }
        return product
    })

    return cart;
}
const initialState = {

    cart: []
}
export const cartReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case types.addProductCart:

            const found = state.cart.find(({ id }) => id === action.payload.id)
            if (found) {
                let item: Item = found
                const cart = validateCart(state.cart, action.payload)
                return {
                    ...state,
                    cart: [...cart]
                }
            }
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case types.clearCart:
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}
