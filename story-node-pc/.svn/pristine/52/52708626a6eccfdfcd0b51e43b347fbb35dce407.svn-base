import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Menu from '../../components/Menu';
import Rank from '../../components/Rank';
import fetch from '../../utils/fetch';
import HotWomen from './boy/HotWomen';
import BoutiqueRecommend from './boy/BoutiqueRecommend';
import Classification from './boy/Classification';
import Banner from '../../components/Banner';

import {
  updateBoyBanner
} from '../../actions/boyActions';

class Boy extends Component {

  static fetchData(dispatch, Fetch=fetch) {
    return Fetch('/api/boy/banner').then(resp => {
        return dispatch(updateBoyBanner(resp.data[0] || {}));
      });
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.girl.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.girl.disabled = true;
  }

  componentDidMount() {
    let { dispatch } = this.props;
    Boy.fetchData(dispatch, fetch);
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/girl.min.css'} />
        <Menu />
        <div className="weekHot boy">
          <HotWomen/>
          <div style={{width: '208px',float: 'right'}}>
            <Rank scope={1} type={4} size={8} border={1} />
          </div>
        </div>
        <div className="girlRecommend boy">
          <BoutiqueRecommend/>
          <div style={{width: '208px',float: 'right'}}>
            <Rank scope={1} type={0} size={8} border={1} />
          </div>
        </div>
        <Banner banner={this.props.banner}/>
        <div className="classify boy">
          <div className="classify-rect">
            <h3 className="classify-title">分类推荐</h3>
            <Classification/>
          </div>
          <div style={{width: '208px',float: 'right'}}>
            <Rank scope={1} type={3} size={16} border={1} paddingTop={8} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      banner: state.boy.banner
    };
  }
)(Boy);