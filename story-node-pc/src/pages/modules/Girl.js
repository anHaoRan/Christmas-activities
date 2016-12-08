import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetch from '../../utils/fetch';
import Menu from '../../components/Menu';
import Rank from '../../components/Rank';

import {addClass,removeClass} from '../../utils';
import HotWomen from './girl/HotWomen';
import BoutiqueRecommend from './girl/BoutiqueRecommend';
import Classification from './girl/Classification';
import Banner from '../../components/Banner';

import {
  updateGirlBanner
} from '../../actions/girlActions';

class Girl extends Component {

  static fetchData(dispatch, Fetch=fetch) {
    return Fetch('/api/girl/banner').then(resp => {
        return dispatch(updateGirlBanner(resp.data[0] || {}));
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
    Girl.fetchData(dispatch, fetch);
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/girl.min.css'} />
        <Menu />
        <div className="weekHot">
          <HotWomen/>
          <div style={{width: '208px',float: 'right'}}>
            <Rank scope={0} type={4} size={8} border={1} />
          </div>
        </div>
        <div className="girlRecommend">
          <BoutiqueRecommend/>
          <div style={{width: '208px',float: 'right'}}>
            <Rank scope={0} type={0} size={8} border={1} />
          </div>
        </div>
        <Banner banner={this.props.banner}/>
        <div className="classify">
          <div className="classify-rect">
            <h3 className="classify-title">分类推荐</h3>
            <Classification/>
          </div>
          <div style={{width: '208px',float: 'right'}}>
            <Rank scope={0} type={3} size={16} border={1} paddingTop={8} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      banner: state.girl.banner
    };
  }
)(Girl);