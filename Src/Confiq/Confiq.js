import WooCommerceAPI from 'react-native-woocommerce-api';

export const STRIPE_PUBLISHABLE_KEY = "pk_test_51L6a4pGF0gBpICajF2ocw45eUmCioIV5uFqVjcuQnPWC11U6KcVxEmnu93fmnUaYXV2B8HovtfeSuYvHV1NjLQCA0071cEFgja";
export const Secret_key = "sk_test_51Jkps9KSaL7qomLna75AFF4lfOYcGopuxLI8dFNRuWCz4Y5CetSFkC9QcXTpUKOaBkwXh5Y02ze1FIVldeM6yR1d00U3Nklb9E"

export const WooCommerceAPIs = new WooCommerceAPI({
    url: 'https://shosharabia.com', // Your store URL
    ssl: true,
    consumerKey: 'ck_1358b20e321c59296b83b5405abaddf6dcf3dd0d', // Your consumer secret
    consumerSecret: 'cs_5bafffc8f953dcfcde24f53b1e43c913217943ea', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
});
