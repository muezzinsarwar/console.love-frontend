import React, { Component } from 'react';
import './App.css';
import ProfilesList from './components/ProfilesList';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Match from './components/Match';
import { Link, Switch, Route } from 'react-router-dom';

// Nice job implementing react router for your app. One challenge you might want
// to try after the course is over is to refactor your code to use hooks!
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guest: true
    };
  }

  // Please pick a more descriptive name for your bln argument
  // sets guest with params
  setGuest = bln => {
    this.setState({ guest: bln });
  };

  render() {
    return (
      <div className="app-container">
        <header>
          <nav>
            <Link to="/profiles">
              <img
                id="logo"
                src="https://i.imgur.com/Zdurg5V.png"
                alt="console.love"
              />
            </Link>
          </nav>
        </header>

        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Welcome setGuest={this.setGuest} />}
            />
            <Route exact path="/profiles" component={ProfilesList} />
            <Route exact path="/profiles/:id" component={Profile} />
            <Route exact path="/profiles/:id/edit" component={Edit} />
            <Route exact path="/profiles/:id/match" component={Match} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
