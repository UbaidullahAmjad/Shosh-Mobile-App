import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from "react-native";
import store from '../';
import { apiInstanceWIthOutLoader } from '../../Confiq/AxiosInstances';
import { WooCommerceAPIs } from '../../Confiq/Confiq';
import { ADD_TO_CART, ALL_PRODUCTS, CHANGE_API_LANGUAGE, CHANGE_COUNTRY, CHANGE_ENGLISH_CART, CHANGE_PAGElOADER, COUNTRY_MODAL, LANGUAGE_MODAL } from "./type";

export const OrderPlace = (item, navigation, cash_on_deliver, locale) => {
    return async dispatch => {
        // console.log("item.id: ", typeof item?.id)
        // console.log("item.id: ", item?.id)

        var taostMSGOrderNotPlaced = locale == 'en' ? "Order has not been placed !" : 'لم يتم وضع الطلب!'
        var taostMSGOrderPlaced = locale == 'en' ? "Order has been placed !" : 'تم تقديم الطلب!'
        let Array_data = []
        for (let i = 0; i < item?.item?.length; i++) {
            Array_data.push({
                product_id: item?.item[i]?.cartItem?.id,
                quantity: item?.item[i]?.quantity
            })
        }

        await WooCommerceAPIs.post('orders', {
            payment_method: `${cash_on_deliver == true ? 'cash on delivery' : 'pay on credit card'}`,
            payment_method_title: `${cash_on_deliver == true ? 'cash on delivery' : 'pay on credit card'}`,
            set_paid: `${cash_on_deliver == true ? false : true}`,
            customer_id: `${item?.id == null ? 0 : parseInt(item?.id)}`,
            billing: {
                first_name: `${item?.f_name}`,
                last_name: "",
                address_1: "",
                address_2: "",
                city: "",
                state: "",
                postcode: "",
                country: "",
                email: `${item?.E_address}`,
                phone: `${item?.shipping_phone}`
            },
            shipping: {
                first_name: "",
                last_name: "",
                address_1: `${item.shipping_address1}`,
                address_2: `${item.shipping_address2}`,
                city: `${item.shipping_city}`,
                state: "",
                postcode: "",
                country: `${item.shipping_address2}`
            },
            line_items: Array_data,
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: `${item?.Total_Shipping_value}`
                }
            ]
        }).then(result => {
            console.log("Order Place: ", result);
            if (result?.data?.status == '400' && result?.data?.status == '500') {
                ToastAndroid.show(taostMSGOrderNotPlaced, ToastAndroid.SHORT);
                return false
            }
            else {
                navigation.navigate('Invoice', { Order_Place: result, keyScreen: 'InvoiceScreen' })
                if (locale == 'en') {
                    dispatch({ type: CHANGE_ENGLISH_CART, payload: [] })
                }
                else {
                    dispatch({ type: ADD_TO_CART, payload: [] })
                }
                ToastAndroid.show(taostMSGOrderPlaced, ToastAndroid.SHORT);
                return result
            }
        }).catch(error => {
            console.log("API Response error", error);
            return error
        });
    }
}

export const addtoCart = (itemCart, quant, navigation, locale) => {
    return async dispatch => {
        const item = {
            cartItem: itemCart,
            quantity: quant
        }

        if (locale == 'en') {
            if (store.getState().cart.engCart.length == 0) {
                console.log("if (Add to cart): ", item)
                dispatch({ type: CHANGE_ENGLISH_CART, payload: [item] })
            } else {
                if (store.getState().cart.engCart.some(obj => obj?.cartItem?.id == itemCart?.id)) {
                    const cart = await store.getState().cart.engCart.map(obj => {
                        if (obj?.cartItem?.id === itemCart?.id) {
                            return { ...obj, quantity: quant + obj.quantity };
                        } else {
                            return obj;
                        }
                    });
                    console.log("else kai andar if (Add to cart): ", cart)
                    dispatch({ type: CHANGE_ENGLISH_CART, payload: cart })
                }
                else {
                    const combine = [...store.getState().cart.engCart]
                    const a = combine.concat(item)
                    console.log("Combine else Add to cart: ", a)
                    dispatch({ type: CHANGE_ENGLISH_CART, payload: a })
                }
            }
        }
        else {
            if (store.getState().cart.cart.length == 0) {
                console.log("if (Add to cart): ", item)
                dispatch({ type: ADD_TO_CART, payload: [item] })
            } else {
                if (store.getState().cart.cart.some(obj => obj?.cartItem?.id == itemCart?.id)) {
                    const cart = await store.getState().cart.cart.map(obj => {
                        if (obj?.cartItem?.id === itemCart?.id) {
                            return { ...obj, quantity: quant + obj.quantity };
                        } else {
                            return obj;
                        }
                    });
                    console.log("else kai andar if (Add to cart): ", cart)
                    dispatch({ type: ADD_TO_CART, payload: cart })
                }
                else {
                    const combine = [...store.getState().cart.cart]
                    const a = combine.concat(item)
                    console.log("Combine else Add to cart: ", a)
                    dispatch({ type: ADD_TO_CART, payload: a })
                }
            }
        }
        if (store.getState()?.user?.userData?.ID || store.getState()?.user?.userData?.id) {
            navigation.navigate('CheckOut', { item })
        }
        else {
            navigation.navigate('Login', { continueAsGuestOption: true })
        }
    }
}

export const deleteFromCart = (item, navigation, locale) => {
    return async dispatch => {

        if (locale == 'en') {
            let product = [...store.getState().cart.engCart]
            const remainingProduct = product.filter(obj => obj.cartItem.id != item.cartItem.id)
            console.log(remainingProduct)
            dispatch({ type: CHANGE_ENGLISH_CART, payload: remainingProduct })
            if (remainingProduct.length == 0) {
                navigation.navigate('Shop')
            }
        }
        else {
            let product = [...store.getState().cart.cart]
            const remainingProduct = product.filter(obj => obj.cartItem.id != item.cartItem.id)
            console.log(remainingProduct)
            dispatch({ type: ADD_TO_CART, payload: remainingProduct })
            if (remainingProduct.length == 0) {
                navigation.navigate('Shop')
            }
        }
    }
}

export const PlusAndMinusProduct = (itemCart, quant, locale) => {
    return async dispatch => {
        const item = {
            cartItem: itemCart,
            quantity: quant
        }

        if (locale == 'en') {
            if (store.getState().cart.engCart.length == 0) {
                console.log("if (Add to cart): ", item)
                dispatch({ type: CHANGE_ENGLISH_CART, payload: [item] })
            } else {
                if (store.getState().cart.engCart.some(obj => obj?.cartItem?.id == itemCart?.id)) {
                    const cart = await store.getState().cart.engCart.map(obj => {
                        if (obj?.cartItem?.id === itemCart?.id) {
                            return { ...obj, quantity: quant };
                        } else {
                            return obj;
                        }
                    });
                    console.log("else kai andar if (Add to cart): ", cart)
                    dispatch({ type: CHANGE_ENGLISH_CART, payload: cart })
                }
                else {
                    const combine = [...store.getState().cart.engCart]
                    const a = combine.concat(item)
                    console.log("Combine else Add to cart: ", a)
                    dispatch({ type: CHANGE_ENGLISH_CART, payload: a })
                }
            }
        }
        else {
            if (store.getState().cart.cart.length == 0) {
                console.log("if (Add to cart): ", item)
                dispatch({ type: ADD_TO_CART, payload: [item] })
            } else {
                if (store.getState().cart.cart.some(obj => obj?.cartItem?.id == itemCart?.id)) {
                    const cart = await store.getState().cart.cart.map(obj => {
                        if (obj?.cartItem?.id === itemCart?.id) {
                            return { ...obj, quantity: quant };
                        } else {
                            return obj;
                        }
                    });
                    console.log("else kai andar if (Add to cart): ", cart)
                    dispatch({ type: ADD_TO_CART, payload: cart })
                }
                else {
                    const combine = [...store.getState().cart.cart]
                    const a = combine.concat(item)
                    console.log("Combine else Add to cart: ", a)
                    dispatch({ type: ADD_TO_CART, payload: a })
                }
            }
        }
    }
}

export const ProductDetailData = () => {
    return async dispatch => {
        // All Products fetch
        dispatch({ type: CHANGE_PAGElOADER, payload: true })
        apiInstanceWIthOutLoader.defaults.baseURL = store?.getState()?.cart?.ChangeAPILanguage;
        let result = await apiInstanceWIthOutLoader.get(`wp-json/wc/v3/products`, {
        }).then(response => ({ status: response.status, data: response.data }))
            .catch(function (error) {
                ToastAndroid.show("Reload page !", ToastAndroid.SHORT);
                dispatch({ type: CHANGE_PAGElOADER, payload: false })
                return error.response
            })
        if (result?.status == 200) {
            let a = result?.data.filter(obj => obj.status == 'publish' && obj.price != '')
            console.log('@@@@@@@@@@@@@@@@@@@@@@', a.length)
            dispatch({ type: CHANGE_PAGElOADER, payload: false })
            console.log('Products Fetch: ', result?.data[0]?.name)
            dispatch({ type: ALL_PRODUCTS, payload: a })
        }
    }
}

export const couponsData = (coupon) => {
    return async dispatch => {
        // All Products fetch
        let result = await apiInstanceWIthOutLoader.get(`wp-json/wc/v3/coupons/?code=${coupon}`, {
        }).then(response => ({ status: response.status, data: response.data }))
            .catch(function (error) {
                ToastAndroid.show("Reload page !", ToastAndroid.SHORT);
                return error.response
            })
        if (result?.status == 200) {
            // console.log('coupon Fetch: ', result?.data)
            return result?.data
            // dispatch({ type: ALL_PRODUCTS, payload: result?.data })
        }
    }
}

export const CheckCountrySelected = () => {
    return async dispatch => {
        const value = await AsyncStorage.getItem('@Country_Data')
        const parse = JSON.parse(value)
        dispatch({ type: CHANGE_COUNTRY, payload: parse })
        // const value2 = await AsyncStorage.getItem('UserData')
        // const parse2 = JSON.parse(value2)
        // dispatch({ type: CHANGE_USER_DATA, payload: parse2 })
    }
}

export const changeCountry = (item, props, moreScreen) => {
    return async dispatch => {
        if (item.name == 'UAE' || item.name == "الإمارات العربية المتحدة") {
            const update = { ...item }
            update.img = require('../../Assets/Images/ae.png')
            AsyncCountryData(update)
            dispatch({ type: CHANGE_COUNTRY, payload: update })
        }
        else if (item.name == 'Saudi Arabia' || item.name == "المملكة العربية السعودية") {
            const update = { ...item }
            update.img = require('../../Assets/Images/sa.png')
            AsyncCountryData(update)
            dispatch({ type: CHANGE_COUNTRY, payload: update })
        }
        else if (item.name == 'Kuwait' || item.name == 'الكويت') {
            const update = { ...item }
            update.img = require('../../Assets/Images/kw.png')
            AsyncCountryData(update)
            dispatch({ type: CHANGE_COUNTRY, payload: update })
        }
        else if (item.name == 'Bahrain' || item.name == 'البحرين') {
            const update = { ...item }
            update.img = require('../../Assets/Images/bh.png')
            AsyncCountryData(update)
            dispatch({ type: CHANGE_COUNTRY, payload: update })
        }
        else if (item.name == 'Oman' || item.name == 'عمان') {
            const update = { ...item }
            update.img = require('../../Assets/Images/om.png')
            AsyncCountryData(update)
            dispatch({ type: CHANGE_COUNTRY, payload: update })
        }
        else if (item.name == 'Qatar' || item.name == 'قطر') {
            const update = { ...item }
            update.img = require('../../Assets/Images/qa.png')
            AsyncCountryData(update)
            dispatch({ type: CHANGE_COUNTRY, payload: update })
        }
        if (!moreScreen) {
            console.log('Bottom Screen')
            props?.navigation?.navigate('Bottom')
        }
        else {
            console.log('Main Screen')
            ToastAndroid.show("Country Change Successfully!", ToastAndroid.SHORT);
            props?.navigation?.navigate('Main')
        }
    }
}

const AsyncCountryData = async (Update) => {
    try {
        await AsyncStorage.setItem('@Country_Data', JSON.stringify(Update))
    } catch (e) {
    }
}

export const changeCountryModal = (val) => {
    return async dispatch => {
        dispatch({ type: COUNTRY_MODAL, payload: val })
    }
}

export const changeLanguageModal = (val) => {
    return async dispatch => {
        dispatch({ type: LANGUAGE_MODAL, payload: val })
    }
}

export const changeAPILanguage = (val) => {
    return async dispatch => {
        const a = await dispatch({ type: CHANGE_API_LANGUAGE, payload: val })
        store.dispatch(ProductDetailData())
    }
}

export const CheckOutFieldsData = (typeee, valueee) => {
    return async dispatch => {
        dispatch({ type: typeee, payload: valueee })
    }
} 