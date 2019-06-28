import React, { Component } from 'react'
import axios from 'axios';

class Review extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurant: {reviews: []},
      review: {
        name: "",
        reviewText: "",
        rating: 3
      },
      avgRating: 0,
      errors: {}
    }
  }

  sortRestaurants(arr){
    for(let i=0; i<arr.length; i++) {
      for(let j=0; j<arr.length-i-1; j++){
        if(arr[j].avgRating < arr[j+1].avgRating) {
          let temp = arr[j];
          arr[j] = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
    return arr;
  }

  componentDidMount = () => {
    console.log(this.props.match.params._id);
    axios.get(`/api/restaurants/${this.props.match.params._id}`)
      .then( res => {
        let reviews = res.data.restaurant.reviews;
        let s = 0;
        for(let review of reviews) {
          s += review.rating;
        }
        let avg = s / reviews.length;
        this.setState({
          restaurant: res.data.restaurant,
          reviews: this.sortRestaurants(reviews),
          avgRating: avg
        });
      })
      .catch( err => {
        console.log(err);
      });
  }

  review = (e) => {
    e.preventDefault();
    axios.post(`/api/reviews/${this.props.match.params._id}`, this.state.review)
      .then( res => {
        this.componentDidMount();
        if(res.data.errors) {
          this.setState({ errors: res.data.errors.errors })
        } else {
          this.props.history.push(`/restaurant/${this.props.match.params._id}`);
        }
      })
      .catch( err => {
        console.log(err);
      });
  }

  change = (key, e) => {
    let r = {...this.state.review};
    r[key] = e.target.value;
    this.setState({review: r});
  }

  render() {
    return (
      <div>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <span className="aligntop">
            <h1>Write a review for: {this.state.restaurant.name}</h1>
          </span>
        </div>
        <hr />
        {
          this.state.restaurant.reviews.map( review => 
            <div key={review._id}>
              <span>
                <strong>{review.name} says:</strong> {review.reviewText} &nbsp; | &nbsp;
              </span>
              <span>Rating: {review.rating}</span>
              <hr />
            </div>
          )
        }
          <legend>New Review</legend>
          <form onSubmit={this.review}>
            <div className="form-group">
              <label>Your Name:</label>
              <input type="text" onChange={this.change.bind(this, "name")} />
              {
                this.state.errors.name ? 
                <p>{this.state.errors.name.message}</p>:
                ""
              }
            </div>
            <div className="form-group">
              <label>Stars:</label>
              <select onChange={this.change.bind(this, "rating")}>
                <option value="5">★★★★★</option>
                <option value="4">★★★★☆</option>
                <option value="3" selected>★★★☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="1">★☆☆☆☆</option>
              </select>
            </div>
            <div className="form-group">
              <label>Your Review:</label>
              <input type="text" onChange={this.change.bind(this, "reviewText")} />
              {
                this.state.errors.reviewText ? 
                <p>{this.state.errors.reviewText.message}</p>:
                ""
              }
            </div>
            <input type="submit" />
          </form>
          <hr />
      </div>
    )
  }
}

export default Review
