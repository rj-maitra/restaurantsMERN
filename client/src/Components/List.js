import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      restaurants: []
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
    axios.get("/api/restaurants")
      .then( res => {
        let restaurants = res.data.restaurants;
        for(let i=0; i< restaurants.length; i++) {
          let s = 0;
          for(let review of restaurants[i].reviews) {
            s += review.rating;
          }
          let rating = Math.round(s / restaurants[i].reviews.length * 100) / 100;
          if(isNaN(rating)) {
            restaurants[i].avgRating = 0;
          } else {
            restaurants[i].avgRating = rating;
          }
        }
        this.setState({restaurants: this.sortRestaurants(restaurants)});
      })
      .catch( err => {
        console.log(err);
      });
  }

  delete = (_id) => {
    axios.delete(`/api/restaurants/${_id}`)
      .then( res => {
        console.log(res);
        this.componentDidMount();
      })
      .catch( err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <div class="jumbotron jumbotron-fluid">
          <div class="container">
            <h1 class="display-6">
              <center>
                📖 = Read/Add &nbsp; &nbsp; &nbsp;
                🖍 = Edit Info  &nbsp; &nbsp; &nbsp;
                🗑 = Delete
              </center>
            </h1>
          </div>
        </div>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Cuisine</th>
              <th>Actions</th>
            </tr>
          </thead>
            {
              this.state.restaurants.map( restaurant =>
                <tbody>
                  <tr key={restaurant._id}>
                    <th scope="row">{restaurant.name}</th>
                    <td>{restaurant.avgRating}</td>
                    <td>{restaurant.cuisine}</td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-none"><Link to={`/restaurant/${restaurant._id}`}>📖</Link></button>
                        <button type="button" class="btn btn-outline-none"><Link to={`/edit/${restaurant._id}`}>🖍</Link></button>
                        <button type="button" class="btn btn-outline-none"><a href="#!" onClick={this.delete.bind(this, restaurant._id)}>🗑</a></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )
            }
        </table>
      </>
    )
  }
}

export default List
