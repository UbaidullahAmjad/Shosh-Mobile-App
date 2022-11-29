import React from 'react';
import {StyleSheet, Dimensions, View, Text, ScrollView} from 'react-native';
import Video from 'react-native-video';

export default VideoPlayer = () => {
  return (
    <View style={styles.container}>
      <Video
        source={
          require('../SplashVideoPlay.mp4')
        }
        // source={{
        //   uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        // }}
        style={styles.video}
        controls={true}
        resizeMode={'cover'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  video: {
    padding: 50,
    borderRadius: 5,
    alignSelf: 'center',
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').width * (9 / 18),
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
});
