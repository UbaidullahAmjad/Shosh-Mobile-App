import { apiInstanceWIthOutLoader, apiInstance } from "../../Confiq/AxiosInstances"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { otherStatus, rejection } from "../../Confiq/helper";
import {
    ADD_TO_CART,
    CHANGE_ENGLISH_CART,
    CHANGE_USER_DATA,
    CHANGE_USER_INFORMATION
} from './type'

export const AlreaadyLogin = () => {
    return async dispatch => {
        const value = await AsyncStorage.getItem('UserData')
        const parse = JSON.parse(value)
        console.log(parse, 'dataaaaa')
        dispatch({ type: CHANGE_USER_DATA, payload: parse })
    }
}

export const LoginasGuest = (props) => {
    return async dispatch => {
        dispatch({ type: CHANGE_USER_DATA, payload: 'Guest' })
        props?.navigation.navigate('Bottom')
        props?.navigation.navigate('CheckOut')
    }
}

export const LogOut = (props) => {
    return async dispatch => {
        console.log("Logotttttttttttttttt")
        try {
            await AsyncStorage.removeItem('UserData')
            dispatch({ type: CHANGE_USER_DATA, payload: null })
            dispatch({ type: CHANGE_ENGLISH_CART, payload: [] })
            dispatch({ type: CHANGE_USER_INFORMATION, payload: null })
            dispatch({ type: ADD_TO_CART, payload: [] })
            props?.navigation.goBack()
        } catch (error) {
            console.log("################", error)
        }
    }
}

export const UserLogin = (email, password, props) => {
    return async dispatch => {
        let result = await apiInstanceWIthOutLoader.post(`?rest_route=/simple-jwt-login/v1/auth&email=${email}&password=${password}`, {
        }).then(function (response) {
            return response
        }).catch(function (error) {
            rejection(error)
            return error.response
        })
        const { status, data } = result
        console.log("############# Token for Login User Status #################", status)
        console.log("############# Token for Login User Data #################", data)
        if (status == '200') {
            let result2 = await apiInstance.get(`?rest_route=/simple-jwt-login/v1/auth/validate&JWT=${data.data.jwt}`, {
            }).then(function (response) {
                return response
            }).catch(function (error) {
                rejection(error)
                return error.response
            })
            console.log("############# Validate Login User Status #################", result2.status)
            console.log("############# Validate  Login User Data #################", result2.data)
            if (status == '200') {
                await AsyncStorage.setItem('UserData', JSON.stringify(result2?.data?.data?.user))
                dispatch({ type: CHANGE_USER_DATA, payload: result2?.data?.data?.user })
                dispatch({ type: CHANGE_USER_INFORMATION, payload: result2?.data?.data?.user })

                if (props?.props?.route?.params?.continueAsGuestOption) {
                    props?.navigation.navigate('Bottom')
                    props?.navigation.navigate('CheckOut')
                }
                else {
                    props?.navigation.push('Bottom')
                }
            }
            else {
                otherStatus(result2)
            }
        }
        else {
            otherStatus(result)
        }
    }
}

export const UserRegister = (name, email, password, confirmPassword, props) => {
    return async dispatch => {
        let result = await apiInstanceWIthOutLoader.post(`?rest_route=/simple-jwt-login/v1/users&email=${email}&password=${password}&first_name=${name}`, {
        }).then(function (response) {
            return response
        })
            .catch(function (error) {
                rejection(error)
                console.log('There has been a problem with your fetch operation: ' + error.message);
                return error.response
            })
        const { status, data } = result
        console.log("############# Register User Code #################", status)
        console.log("############# Register User Data #################", data)
        if (status == '200') {
            await AsyncStorage.setItem('UserData', JSON.stringify(data))
            dispatch({ type: CHANGE_USER_DATA, payload: data })
            dispatch({ type: CHANGE_USER_INFORMATION, payload: data.user })
            if (props?.props?.route?.params?.continueAsGuestOption) {
                props?.navigation.navigate('Bottom')
                props?.navigation.navigate('CheckOut')
            }
            else {
                props?.navigation.push('Bottom')
            }
        }
        else {
            otherStatus(result)
        }
    }
}