import React, { Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    fetch('/api/copyright/information').then(resp => {
      this.setState({
        list: resp.data
      });
     })
  }

  render() {
    let { list } = this.state;
    return (
        <ul className="a_information">
          {
            map( list, (item,index) =>{
              return(
                <li key={index}><Link to={"/newspage?id=" + item.id}>【资讯】{item.eventName}</Link></li>
              )
            })
          }
        </ul>
    );
  }
}