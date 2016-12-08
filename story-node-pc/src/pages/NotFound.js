import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from '../components/Menu';
export default class NotFound extends Component {

  render() {
    return (
      <div>
        <Menu />
        <div className="not-found"></div>
      </div>
    );
  }
}