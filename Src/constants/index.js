import { Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width > height ? height : width;
export const SCREEN_HEIGHT = width > height ? width : height;
export const ASPECT_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;
export const PLATFORM_IOS = Platform.OS === 'ios' ? true : false;
export const STATUSBAR_HEIGHT = PLATFORM_IOS ? 0 : StatusBar.currentHeight;

export const HEADERHEIGHT = 36;

export const ImageHome1 = require('../Assets/Images/Artboard1.png');
export const ImageHome2 = require('../Assets/Images/Artboard2.png');
export const ImageHome3 = require('../Assets/Images/Artboard3.png');
export const ImageHome4 = require('../Assets/Images/Artboard4.png');
// export const ImageHome4 = require('../../assets/polygon1.png');

export const fc1 = require('../Assets/Images/fc1.png');
export const fc2 = require('../Assets/Images/fc2.png');

export const PORTRAIT = 'PORTRAIT';
export const LANDSCAPE = 'LANDSCAPE';

export const emailValidation = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    else {
        return false
    }
}