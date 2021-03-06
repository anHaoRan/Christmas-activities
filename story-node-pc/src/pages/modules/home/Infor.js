import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
  updateInforList
} from '../../../actions/homeActions';

const TYPE_ARR = ['', '活动', '公告', '资讯', '图集'];

class Infor extends Component {

  static fetchData(dispatch, Fetch = fetch) {
    return Fetch('/api/home/infor').then(resp => {
        return dispatch(updateInforList(resp.data.slice(0, 4)));
      });
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    Infor.fetchData(dispatch);
  }

  render() {
    let { inforList } = this.props;
    return (
      <ul className="notice">
        {
          map(inforList, (infor, index) => {
            return (
              <li key={index} className="notice-list">
                  <Link to={infor.linkUrl || ("/newspage?id=" + infor.id)}><span>{TYPE_ARR[infor.type]}：</span>{infor.eventName}</Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default connect(
  (state) => {
    return {
      inforList: state.home.inforList
    };
  }
)(Infor);