import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Banner extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { banner } = this.props;
    return (
      <div className="girl-banner boy-banner banner">
        {
          banner.targetType === 1 ? 
          (
            <Link to={'/story/' + banner.targetId}>
              <img src={banner.pic}/>
            </Link>
          )
          :
          (<a target="_blank" href={banner.linkUrl}><img src={banner.pic}/></a>)
        }
    </div>
    );
  }
}