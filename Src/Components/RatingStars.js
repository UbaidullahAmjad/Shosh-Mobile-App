import React from 'react';
import StarRating from 'react-native-star-rating';

class RatingStars extends React.Component {
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
      <StarRating
        disabled={true}
        starSize={20}
        containerStyle={{opacity: 0.4}}
        starStyle={{
          color: 'orange',
        }}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={rating => this.onStarRatingPress(rating)}
      />
    );
  }
}

export default RatingStars;
