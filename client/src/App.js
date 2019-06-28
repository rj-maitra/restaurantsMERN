import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import List from './Components/List';
import New from './Components/New';
import Review from './Components/Review';
import Edit from './Components/Edit';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav class="navbar sticky-top navbar-dark bg-danger">
          <a class="navbar-brand" href="/">
            Yelp 2.0
          </a>
          <span>
            <Link to="/"><button type="button" class="btn btn-danger">Home</button></Link>
            <Link to="/new"><button type="button" class="btn btn-danger">New Restaurant</button></Link>
          </span>
        </nav>
        <div className="nav">
          <div className="container">
          </div>
        </div>
        <div className="container">
          <Route exact path="/" component={List} />
          <Route path="/new" component={New} />
          <Route path="/restaurant/:_id" component={Review} />
          <Route path="/edit/:_id" component={Edit} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
