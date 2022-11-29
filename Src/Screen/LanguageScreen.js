import * as React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { connect } from 'react-redux';
import LocalizationContext from '../../LocalizationContext';
import Header from '../Components/Header';
import ScreenWrapper from '../Components/ScreenWrapper';
import { changeCountry, changeAPILanguage } from '../Store/Actions/cartAction';
import { COLORS } from '../Style/Constants/Colors';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

function LanguageScreen(props) {
    const { t } = React.useContext(LocalizationContext);
    const { locale, setLocale } = React.useContext(LocalizationContext);
    console.log("locale: ", locale)

    return (
        <ScreenWrapper>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header
                    navigation={props.navigation}
                    home={true}
                />
                <View
                    style={{
                        flex: 1,
                        paddingTop: 12,
                        paddingHorizontal: 6,
                        width: windowWidth,
                    }}>
                    <Text
                        style={{
                            color: COLORS.textMainColor,
                            fontSize: 14,
                            textAlign: 'center',
                        }}>
                        {locale == '' ? 'مرحباً بكم في شوش٬ العلامة التجارية رقم 1 في منتجات العنايا بالشعر.. الآن يمكنكم الطلب من شوش إذا كنتم في أي دولة من الدول التالية.' : t('Welcome')}
                    </Text>

                    <Text
                        style={{
                            fontSize: hp('3.6%'),
                            color: '#000',
                            textAlign: 'center',
                            marginTop: hp('2%')
                        }}>

                        {locale == '' ? "اختار اللغة" : t('Select Language')}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingVertical: hp('5%'),
                        }}>

                        {locale == 'arb' ? (
                            <TouchableOpacity
                                onPress={async () => {
                                    var lang = 'arb';
                                    var lanType = 'https://shosharabia.com/';
                                    setLocale(lang);
                                    await AsyncStorage.setItem('@language', lang)
                                    await AsyncStorage.setItem('@SelectLanguageAPI', lanType)
                                    await props?.changeAPILanguage(lanType);
                                    setTimeout(() => {
                                        props.navigation.navigate('Home')
                                    }, 2000);
                                }}
                                activeOpacity={1}
                                style={{
                                    backgroundColor: "white",
                                    elevation: 5,
                                    padding: wp('3%'),
                                    paddingHorizontal: hp('5%'),
                                    borderRadius: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    margin: wp('5%')
                                }}>
                                <Text style={{ marginRight: wp('2%'), textAlign: "center", fontWeight: 'bold', color: '#000', fontSize: hp('2%') }}>العربية</Text>
                                <AntDesign style={{
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    padding: 5,
                                    borderRadius: 20
                                }} name='check' color={'green'} size={20} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={async () => {
                                    var lang = 'arb';
                                    var lanType = 'https://shosharabia.com/';
                                    setLocale(lang);
                                    await AsyncStorage.setItem('@language', lang)
                                    await AsyncStorage.setItem('@SelectLanguageAPI', lanType)
                                    await props?.changeAPILanguage(lanType);
                                    setTimeout(() => {
                                        props.navigation.navigate('Home')
                                    }, 2000);
                                }}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    backgroundColor: "white",
                                    elevation: 5,
                                    padding: wp('3%'),
                                    paddingHorizontal: hp('5%'),
                                    borderRadius: 5,
                                    margin: wp('5%')
                                }}>
                                <Text style={{ textAlign: "center", color: 'black', fontSize: hp('2%'), }}>
                                    العربية
                                </Text>
                            </TouchableOpacity>
                        )}

                        {locale == 'en' ? (
                            <TouchableOpacity
                                onPress={async () => {
                                    var lang = 'en';
                                    var lanType = 'https://en.shosharabia.com/';
                                    setLocale(lang);
                                    await AsyncStorage.setItem('@language', lang)
                                    await AsyncStorage.setItem('@SelectLanguageAPI', lanType)
                                    await props?.changeAPILanguage(lanType);
                                    setTimeout(() => {
                                        props.navigation.navigate('Home')
                                    }, 2000);
                                }}
                                activeOpacity={1}
                                style={{
                                    backgroundColor: "white",
                                    elevation: 5,
                                    padding: wp('3%'),
                                    paddingHorizontal: hp('5%'),
                                    borderRadius: 5,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    margin: wp('5%')
                                }}>
                                <Text style={{ marginRight: wp('2%'), textAlign: "center", fontWeight: 'bold', color: '#000', fontSize: hp('2%') }}>English</Text>
                                <AntDesign style={{
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    padding: 5,
                                    borderRadius: 20
                                }} name='check' color={'green'} size={20} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={async () => {
                                    var lang = 'en';
                                    var lanType = 'https://en.shosharabia.com/';
                                    setLocale(lang);
                                    await AsyncStorage.setItem('@language', lang)
                                    await AsyncStorage.setItem('@SelectLanguageAPI', lanType)
                                    await props?.changeAPILanguage(lanType);
                                    setTimeout(() => {
                                        props.navigation.navigate('Home')
                                    }, 2000);
                                }}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    backgroundColor: "white",
                                    elevation: 5,
                                    padding: wp('3%'),
                                    paddingHorizontal: hp('5%'),
                                    borderRadius: 5,
                                    margin: wp('5%')
                                }}>
                                <Text style={{ textAlign: "center", color: 'black', fontSize: hp('2%') }}>
                                    English
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={{ bottom: 0, position: "absolute", left: 0, right: 0 }}>
                        <Image
                            style={{ width: '100%', height: 300 }}
                            resizeMode="contain"
                            source={require('../Assets/Images/demo.jpg')}
                        />
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
}

const mapStateToProps = ({ cart }) => ({
    cart
})

export default connect(mapStateToProps, {
    changeCountry, changeAPILanguage
})(LanguageScreen)
