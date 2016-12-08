import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
  updateLeftBigRecommend,
  updateRightBigRecommend,
  updateLeftSmallRecommendList,
  updateRightSmallRecommendList
} from '../../../actions/homeActions';
import Q from 'q';

class Recommend extends Component {

  static fetchData(dispatch, Fetch = fetch) {
     return Q.all([
      Fetch('/api/home/leftBigRecommend').then(resp => {
        return dispatch(updateLeftBigRecommend(resp.data[0] || { story: {}}));
      }),
      Fetch('/api/home/leftSmallRecommend').then(resp => {
        return dispatch(updateLeftSmallRecommendList(resp.data.slice(0,3)));
      }),
      Fetch('/api/home/rightBigRecommend').then(resp => {
        return dispatch(updateRightBigRecommend(resp.data[0] || { story: {}}));
      }),
      Fetch('/api/home/rightSmallRecommend').then(resp => {
        return dispatch(updateRightSmallRecommendList(resp.data.slice(0,3)));
      })
    ]);
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    Recommend.fetchData(dispatch);
  }

  render() {
    let { leftBig, rightBig, leftSmallList, rightSmallList } = this.props;
    return (
      <div className="recom">
        <dl className="recom-rect">
          <dt className="recom-title win-head">
            <Link to={'/story/' + leftBig.story.idStr}>
              <span>{leftBig.story.name}： {leftBig.story.pcIntroduce}</span>
            </Link>
          </dt>
          {
            map(leftSmallList, (item, index) => {
              return (
                <dd key={index} className="recom-list">
                  <Link to={'/story/' + item.story.idStr}>
                    <span>【{item.story.type}】</span>
                    <span>{item.story.name}：</span>
                    <span>{item.story.pcIntroduce}</span>
                  </Link>
                </dd>
              );
            })
          }
        </dl>
        <dl className="recom-rect">
          <dt className="recom-title win-head">
            <Link to={'/story/' + rightBig.story.idStr}>
              <span>{rightBig.story.name}： {rightBig.story.pcIntroduce}</span>
            </Link>
          </dt>
          {
            map(rightSmallList, (item, index) => {
              return (
                <dd key={index} className="recom-list">
                  <Link to={'/story/' + item.story.idStr}>
                  <span>【{item.story.type}】</span>
                  <span>{item.story.name}：</span>
                  <span>{item.story.pcIntroduce}</span>
                </Link>
              </dd>
              );
            })
          }
        </dl>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      leftBig: state.home.leftBigRecommend,
      rightBig: state.home.rightBigRecommend,
      leftSmallList: state.home.leftSmallRecommendList,
      rightSmallList: state.home.rightSmallRecommendList,
    };
  }
)(Recommend);