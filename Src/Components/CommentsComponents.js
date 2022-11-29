import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LocalizationContext from '../../LocalizationContext';
import RatingStars from './RatingStars';

export default function CommentsComponents() {
  const {t} = React.useContext(LocalizationContext);
  const {locale, setLocale} = React.useContext(LocalizationContext);

  return (
    <FlatList
      data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]}
      keyExtractor={item => item.id}
      contentContainerStyle={{marginTop: 20}}
      renderItem={({item, index}) => {
        return (
          <View style={{...styles.innerslider}}>
            <View
              style={{
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome name="comments" color={'black'} size={20} />
              <Text
                style={{
                  ...styles.title,
                  textAlign: locale == 'en' ? 'left' : 'right',
                }}>
                {t('Hindi')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <RatingStars />

              <Text style={{color: 'gray', fontStyle: 'italic'}}>
                April 3,2022
              </Text>
            </View>
            <Text
              style={{
                marginVertical: 10,
                color: 'grey',
                textAlign: locale == 'en' ? 'left' : 'right',
              }}>
              {t('comment')}
            </Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  innerslider: {
    backgroundColor: 'rgb(245,245,245)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 20,
  },
  title: {
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});
