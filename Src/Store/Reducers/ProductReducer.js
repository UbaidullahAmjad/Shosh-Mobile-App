import { ALL_PRODUCTS } from "../Actions/type";

const initialState = {
    allProducts: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ALL_PRODUCTS:
            return {
                ...state,
                allProducts: payload,
            };
        default:
            return state;
    }
};