import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRestaurant: {
        name: "",
        cuisine: ""
      },
      errors: {}
    }
  }

  change = (key, e) => {
    let b = {...this.state.newRestaurant};
    b[key] = e.target.value;
    this.setState({newRestaurant: b});
  }

  makeRestaurant = (e) => {
    e.preventDefault();
    axios.post("/api/restaurants", this.state.newRestaurant)
      .then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors.errors})
        } else {
          this.props.history.push("/");
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.makeRestaurant}>
        <div className="form-group">
          <label>Restaurant Name:</label>
          <input type="text" onChange={this.change.bind(this, "name")} />
          {
            this.state.errors.name ? 
            <p>{this.state.errors.name.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Cuisine:</label>
          <input type="text" onChange={this.change.bind(this, "cuisine")} />
          {
            this.state.errors.cuisine ? 
            <p>{this.state.errors.cuisine.message}</p>:
            ""
          }
        </div>
        <button type="submit" class="btn btn-secondary">Submit</button> &nbsp;
        <button type="button" class="btn btn-secondary"><Link to={"/"}>Cancel</Link></button>
      </form>
    )
  }
}

export default New
