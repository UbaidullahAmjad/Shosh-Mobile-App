import { ORDERS_LIST } from "../Actions/type";

const initialState = {
    OrderList: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ORDERS_LIST:
            return {
                ...state,
                OrderList: payload,
            };
        default:
            return state;
    }
};