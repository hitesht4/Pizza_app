import { Add, CalculateTotal, Delete, Reset } from "./cart.types";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const { cart } = parseCookies();

const initialState = {
  cart: cart ? JSON.parse(cart) : [],
  total: 0,
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Add: {
      setCookie(null, "cart", JSON.stringify([...state.cart, payload]), {
        maxAge: 72000000,
        path: "/",
      });
      return { ...state, cart: [...state.cart, payload] };
    }
    case Delete: {
      let f = state.cart.filter((item) => {
        return item.id !== payload;
      });
      setCookie(null, "cart", JSON.stringify([...f]), {
        maxAge: 72000000,
        path: "/",
      });
      return { ...state, cart: [...f] };
    }
    case CalculateTotal: {
      const t = state.cart.reduce((ac, cv) => {
        return ac + cv.total;
      }, 0);
      setCookie(null, "cart", JSON.stringify(state.cart), {
        maxAge: 72000000,
        path: "/",
      });
      console.log(cart);
      return { ...state, total: t };
    }
    case Reset: {
      destroyCookie(null, "cart");
      return { cart: [], total: 0 };
    }
    default: {
      return state;
    }
  }
};
