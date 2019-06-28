import React, { Component } from 'react'
import axios from 'axios';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: {
        name: "",
        cuisine: ""
      },
      errors: {}
    }
  }

  componentDidMount = () => {
    console.log(this.props.match.params._id);
    axios.get(`/api/restaurants/${this.props.match.params._id}`)
      .then( res => {
        this.setState({restaurant: res.data.restaurant});
      })
      .catch( err => {
        console.log(err);
      });
  }

  change = (key, e) => {
    let b = {...this.state.restaurant};
    b[key] = e.target.value;
    this.setState({restaurant: b});
  }

  updateRestaurant = (e) => {
    e.preventDefault();
    axios.put(`/api/restaurants/${this.state.restaurant._id}`, this.state.restaurant)
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
      <form onSubmit={this.updateRestaurant}>
        <div className="form-group">
          <label>Restaurant Name:</label>
          <input type="text" onChange={this.change.bind(this, "name")} value={this.state.restaurant.name} />
          {
            this.state.errors.name ? 
            <p>{this.state.errors.name.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Cuisine Type:</label>
          <input type="text" onChange={this.change.bind(this, "cuisine")} value={this.state.restaurant.cuisine} />
          {
            this.state.errors.cuisine ? 
            <p>{this.state.errors.cuisine.message}</p>:
            ""
          }
        </div>

        <input type="submit" className="btn-submit" value="Update" />

      </form>
    )
  }
}

export default Edit
