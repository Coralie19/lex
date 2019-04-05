import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import axios from 'axios';

const withApi = WrappedComponent => (
  class extends Component {
    defaultOptions () {
      return {headers: {
        Authorization: `Bearer ${this.props.token}`
      }}
    }

    render() {
      return (
        <WrappedComponent 
          get={(url, options = {}) => axios.get(url, { ...this.defaultOptions(), ...options })}
          post={(url, data, options = {}) => axios.post(url, data, { ...this.defaultOptions(), ...options })}
          put={(url, data, options = {}) => axios.put(url, data, { ...this.defaultOptions(), ...options })}
          delete={(url, options = {}) => axios.delete(url, { ...this.defaultOptions(), ...options })}
          {...this.props}
          />
      )
    }
  }
);

const mapStateToProps = (state) => ({
  token: state.session.token
})

const composedHoc = compose(
  connect(mapStateToProps),
  withApi
)

export default (composedHoc);