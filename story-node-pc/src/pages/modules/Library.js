import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Menu from '../../components/Menu';
import Rank from '../../components/Rank';

import Filtrate from './library/Filtrate';

class Library extends Component {

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.library.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.library.disabled = true;
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/library.min.css'}/>
        <Menu/>
        <div className="library-main">
          <div className="library">
            <Filtrate/>
          </div>
          <div style={{width:'208px',float:'right'}}>
            <Rank scope={0} type={0} size={8} border={1} title="女生人气榜"/>
            <Rank scope={1} type={0} size={8} border={1} title="男生人气榜" paddingTop={20}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {};
  }
)(Library);