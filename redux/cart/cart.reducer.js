import { Add, Change, Delete } from "./cart.types";



const initialState={
    cart:[],
}

export const cartReducer=(state=initialState,{type,payload})=>{
    switch(type){
        case Add:{
            return {cart:[...state.cart,payload]};
        }
        case Delete:{
            let f=state.cart.filter((item)=>{
                return item.id!==payload;
            })
            return {cart:[...f]};
        }
        case Change:{
            return state;
        }
        default:{
            return state;
        }
    }
}