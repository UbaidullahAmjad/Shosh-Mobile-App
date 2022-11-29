import { ADD_TO_CART, CHANGE_COUNTRY, COUNTRY_MODAL, LANGUAGE_MODAL, CHANGE_API_LANGUAGE, CHANGE_PAGElOADER, CHANGE_ENGLISH_CART, USER_NAME, USER_EMAIL, USER_ADDRESS, USER_CITY, USER_PHONE, USER_COUNTRY, USER_COUNTRY_CODE, USER_CREDIT_CARD_NUMBER, USER_CREDIT_CARD_CVC, USER_CREDIT_CARD_EXPIRY_DATE } from "../Actions/type";
const initialState = {
    cart: [],
    engCart: [],
    selectedCountry: {},
    country: [
        {
            name: 'Bahrain',
            img: require('../../Assets/Images/bh.png')
        },
        {
            name: 'Kuwait',
            img: require('../../Assets/Images/kw.png')
        },
        {
            name: 'Oman',
            img: require('../../Assets/Images/om.png')
        },
        {
            name: 'Qatar',
            img: require('../../Assets/Images/qa.png')
        },
        {
            name: 'Saudi Arabia',
            img: require('../../Assets/Images/sa.png')
        },
        {
            name: 'UAE',
            img: require('../../Assets/Images/ae.png')
        },

    ],
    CountryModalShow: false,
    LanguageModalShow: false,
    ChangeAPILanguage: 'https://shosharabia.com/',
    pageLoader: false,
    username: '',
    userEmail: '',
    userAddress: '',
    userTown: '',
    userPhone: '',
    usercountrycode: "",
    usercountry: '',
    userCreditCardNumber: "",
    userCreditCardCVC: "",
    userCreditCardExpiryDate: "",

}

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case CHANGE_ENGLISH_CART:
            return {
                ...state,
                engCart: payload,
            };
        case CHANGE_PAGElOADER:
            return {
                ...state,
                pageLoader: payload,
            };
        case CHANGE_COUNTRY:
            return {
                ...state,
                selectedCountry: payload,
            };
        case CHANGE_API_LANGUAGE:
            return {
                ...state,
                ChangeAPILanguage: payload,
            };
        case ADD_TO_CART:
            return {
                ...state,
                cart: payload,
            };
        case COUNTRY_MODAL:
            return {
                ...state,
                CountryModalShow: payload,
            };
        case LANGUAGE_MODAL:
            return {
                ...state,
                LanguageModalShow: payload,
            };
        case USER_NAME:
            return {
                ...state,
                username: payload,
            };
        case USER_EMAIL:
            return {
                ...state,
                userEmail: payload,
            };
        case USER_ADDRESS:
            return {
                ...state,
                userAddress: payload,
            };
        case USER_CITY:
            return {
                ...state,
                userTown: payload,
            };
        case USER_PHONE:
            return {
                ...state,
                userPhone: payload,
            };
        case USER_COUNTRY:
            return {
                ...state,
                usercountry: payload,
            };
        case USER_COUNTRY_CODE:
            return {
                ...state,
                usercountrycode: payload,
            };

        case USER_CREDIT_CARD_NUMBER:
            return {
                ...state,
                userCreditCardNumber: payload,
            };

        case USER_CREDIT_CARD_CVC:
            return {
                ...state,
                userCreditCardCVC: payload,
            };

        case USER_CREDIT_CARD_EXPIRY_DATE:
            return {
                ...state,
                userCreditCardExpiryDate: payload,
            };
        default:
            return state;
    }
};