import React from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import StarRating from 'react-native-star-rating';

class RatingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: props.value,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  render() {
    return (
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginBottom: 20 }}
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <StarRating
                disabled={true}
                starSize={20}
                starStyle={{
                  color: 'orange',
                  marginLeft: 5,
                }}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={rating => this.onStarRatingPress(rating)}
              />

              <View
                style={{
                  height: 10,
                  width: Dimensions.get('screen').width / 2,
                  backgroundColor: '#000',
                  borderRadius: 5,
                }}
              />
              <Text>16</Text>
            </View>
          );
        }}
      />
    );
  }
}

export default RatingComponent;
