import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from '../constants';
export const addtocartfordd = (payload) => {
    return {
        type : ADD_TO_CART,
        payload
    }
} 
export const removefromcartfordd = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}
export const clearcartfordd = () => {
    return {
        type: CLEAR_CART
    }
        
    
}