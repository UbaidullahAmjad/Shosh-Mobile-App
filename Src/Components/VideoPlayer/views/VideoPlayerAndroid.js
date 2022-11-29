import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
export default App = () => {
  const [Loading, setLoading] = React.useState(true);
  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 10,
        padding: 5,
        height: 200,
      }}>
      {Loading && (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'small'} color="black" />
        </View>
      )}
      <YoutubePlayer
        webViewStyle={{opacity: 0.99}}
        height={300}
        play={false}
        onReady={() => {
          console.log('Ready Loading false');
          setLoading(false);
        }}
        onError={() => {
          console.log('Error Loading false');
          setLoading(false);
        }}
        onFullScreenChange={res => console.log(res)}
        volume={100}
        videoId={'84WIaK3bl_s'}
      />
    </View>
  );
};
