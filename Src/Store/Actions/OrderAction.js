import { apiInstanceWIthOutLoader } from "../../Confiq/AxiosInstances"
import { rejection } from "../../Confiq/helper";
import {
    ORDERS_LIST
} from './type'

export const GetAllOrders = (id) => {
    console.log(id)
    return async dispatch => {
        let result = await apiInstanceWIthOutLoader.get(`wp-json/wc/v3/orders?customer=${id}`, {
        }).then(function (response) {
            return response
        })
            .catch(function (error) {
                rejection(error)
                console.log('There has been a problem with your fetch operation: ' + error.message);
                return error.response
            })
        const { status, data } = result
        console.log("############# Orders List Code #################: ", status)
        console.log("############# Orders List Data #################", data)

        if (status == 200) {
            // dispatch({ type: ORDERS_LIST, payload: typeof data == 'object' ? [data] : data })
            dispatch({ type: ORDERS_LIST, payload: data })
        }
    }
}