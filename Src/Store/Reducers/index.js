import { combineReducers } from 'redux';
import cartReducer from './cartReducer'
import OrderReducer from './OrderReducer';
import ProductReducer from './ProductReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    cart: cartReducer,
    product: ProductReducer,
    user: UserReducer,
    order: OrderReducer
});
