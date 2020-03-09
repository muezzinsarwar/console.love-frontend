import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config';
import ProfileForm from './ProfileForm';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        image: '',
        name: '',
        age: '',
        location: '',
        bio: '',
        languages: '',
        github: ''
      },
      updated: false,
      deleted: false,
      error: false
    };
  }

  // get profile by id and set state with its values
  componentDidMount() {
    fetch(`${APIURL}/profiles/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ profile: data });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  // pre-populate edit form w/new state object properties
  handleChange = evt => {
    evt.persist();
    this.setState({
      profile: {
        ...this.state.profile, // nice job using the spread operator!
        [evt.target.name]: evt.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    fetch(`${APIURL}/profiles/${this.props.match.params.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(this.state.profile)
    })
      .then(response => {
        this.setState({ updated: true });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  handleDelete = evt => {
    fetch(`${APIURL}/profiles/${this.props.match.params.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        this.setState({ deleted: true });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  };

  render() {
    if (this.state.error) {
      return <div className="error">There was an error :/</div>;
    }

    if (this.state.updated) {
      return <Redirect to={`/profiles/${this.props.match.params.id}`} />;
    }

    if (this.state.deleted) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {/* Instead of <div> on line 92 another option is to use React fragments:https://reactjs.org/docs/fragments.html#short-syntax  */}
        <div>
          {/* <div> on line 94 seems redundant */}
          <ProfileForm
            profile={this.state.profile}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div className="delete-container">
          <button className="delete-button" onClick={this.handleDelete}>
            Delete Profile
          </button>
        </div>
      </div>
    );
  }
}

export default Edit;
