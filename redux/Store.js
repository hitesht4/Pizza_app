import { combineReducers, legacy_createStore as createStore } from "redux";
import { AuthReducer } from "./auth/auth.reducer";
import { cartReducer } from "./cart/cart.reducer";


const rootReducer=combineReducers({
    auth:AuthReducer,
    cart:cartReducer,
});


export const store=createStore(rootReducer);