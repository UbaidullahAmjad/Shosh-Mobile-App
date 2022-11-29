import React from 'react';
import { AppRegistry, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import { name as appName } from './app.json';
import LocalizationContext from './LocalizationContext';
import { EventRegister } from 'react-native-event-listeners';
import { Provider } from 'react-redux';
import store from './Src/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as I18n from './Src/i18n';
import { changeAPILanguage, CheckCountrySelected } from './Src/Store/Actions/cartAction'
import { AlreaadyLogin } from './Src/Store/Actions/UserAction'

store.dispatch(CheckCountrySelected())
store.dispatch(AlreaadyLogin())

const AppRedux = () => {
    const [locale, setLocale] = React.useState(I18n.DEFAULT_LANGUAGE);
    const localizationContext = React.useMemo(
        () => ({
            t: (scope, options) => I18n.t(scope, { locale, ...options }),
            locale,
            setLocale: newLocale => {
                const newSetLocale = I18n.setI18nConfig(newLocale);
                setLocale(newSetLocale);
            },
        }),
        [locale],
    );

    const getLanguage = async () => {
        try {
            let SelectLanguageAPI = await AsyncStorage.getItem('@SelectLanguageAPI')
            if (SelectLanguageAPI != null) {
                store.dispatch(changeAPILanguage(SelectLanguageAPI))
            }
            else {
                store.dispatch(changeAPILanguage('arb'))
            }

            let lang = await AsyncStorage.getItem('@language');
            if (lang !== null) {
                handleLocalizationChange(lang);
            } else handleLocalizationChange('');
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleLocalizationChange = React.useCallback(
        newLocale => {
            const newSetLocale = I18n.setI18nConfig(newLocale);
            setLocale(newSetLocale);
        },
        [locale],
    );

    React.useEffect(() => {
        getLanguage();
        EventRegister.addEventListener('changeLanguage', handleLocalizationChange);
        return () => {
            EventRegister.removeEventListener(
                'changeLanguage',
                handleLocalizationChange,
            );
        };
    }, []);

    return (
        <Provider {...{ store }}>
            <SafeAreaProvider>
                <LocalizationContext.Provider value={localizationContext}>
                    <App />
                </LocalizationContext.Provider>
            </SafeAreaProvider>
        </Provider>
    );
};

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => AppRedux);
