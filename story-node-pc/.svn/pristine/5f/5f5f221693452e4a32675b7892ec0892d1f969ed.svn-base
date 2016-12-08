import React, { Component } from 'react';
import RegisterComponent from './register/RegisterComponent';

export default class Register extends Component {

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.auth.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.auth.disabled = true;
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/auth.min.css'}/>
        <RegisterComponent route={route} />
      </div>
    );
  }
}
