import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetch from '../../utils/fetch';
import {
  updateFansList,
  updateFansNovelDetailsList
} from '../../actions/fansActions';
import Q from 'q';
import queryString from 'query-string';
import Menu from '../../components/Menu';
import FansAllRank from './fans/FansAllRank';

class Fans extends Component {

  static fetchData(dispatch, Fetch = fetch, query) {
    return Q.all([
      Fetch('/api/fans/c/story/' + query.storyId + '/fans').then(resp => {
        return dispatch(updateFansList(resp.data));
      }),
      Fetch('/api/fans/c/story/' + query.storyId + '/detail').then(resp => {
        return dispatch(updateFansNovelDetailsList(resp.data));
      })
    ]);
  }

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      storyId: ''
    };
  }

  componentDidMount() {
    let query = queryString.parse(location.search);
    this.setState({storyId: query.storyId});

    Fans.fetchData(this.props.dispatch, fetch, query);
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/fans.min.css'}/>
        <Menu />
        <div className="fans">
          <FansAllRank {...this.props}/>
          <div className="fans-msg">
            <Link to={'/story/' + this.state.storyId} className="back">返回内容首页</Link>
            <dl>
              <dt>粉丝榜说明</dt>
              <dd>1.榜单排名根据消费的火星币降序排序</dd>
              <dd>2.消耗同等火星币币，按照消耗时间排序，消耗时间靠前的排名靠前</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      fansAllRankList: state.fans.fansAllRankList,
      fansNovelDetails: state.fans.fansNovelDetails,
    };
  }
)(Fans);