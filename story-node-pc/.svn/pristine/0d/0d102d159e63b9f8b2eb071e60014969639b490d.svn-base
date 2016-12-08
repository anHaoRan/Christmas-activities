import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import Rank from '../../../components/Rank';
import {
  updateBoyBanner,
  updateBoyTypeOne,
  updateBoyTypeTwo,
  updateBoyTypeThree,
  updateBoyTypeFour,
} from '../../../actions/boyActions';
import Banner from '../../../components/Banner';
import { boyType } from '../../../../config';
import Q from 'q';
const ARR = [
'boyTypeOne',
'boyTypeTwo',
'boyTypeThree',
'boyTypeFour',
];

class BoyRecomBook extends Component {

  static fetchData(dispatch, Fetch = fetch) {
    return Q.all([
     Fetch('/api/boy/type/one').then(resp => {
       return dispatch(updateBoyTypeOne(resp.data));
     }),
     Fetch('/api/boy/type/two').then(resp => {
       return dispatch(updateBoyTypeTwo(resp.data));
     }),
     Fetch('/api/boy/type/three').then(resp => {
       return dispatch(updateBoyTypeThree(resp.data));
     }),
     Fetch('/api/boy/type/four').then(resp => {
       return dispatch(updateBoyTypeFour(resp.data));
     }),
     Fetch('/api/boy/banner').then(resp => {
       return dispatch(updateBoyBanner(resp.data[0] || {}));
     })
   ]);
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    BoyRecomBook.fetchData(dispatch);
  }

  format(content) {
    return (content || '').replace(/\s+/g, '');
  }

  render() {
    return (
      <div>
      <div className="column-title"><i></i>
        <h2>男频</h2><Link to='/boy' className='go'>进入男频频道</Link>
      </div>
      <Banner banner={this.props.banner}/>
      <div className="column-main">
        <ul className="column-bookRect">
          {
            map(boyType, (type, index)=>{
              let list = this.props[ARR[index]];
              let first = list[0] || {story: {}};
              return(
                <li key={index} className="bookRect-list">
                  <h2>{type}<Link to={'/library?channel=1&type=' + type} className="more">更多</Link></h2>
                  <Link to={'/story/' + first.story.idStr} className="bookLink">
                    <img src= {first.story.cover}/>
                    <div className="details">
                      <h3 className="bookName">{first.story.name}</h3>
                      <em className="author">{first.story.author}</em>
                      <p className="intro">简介：{this.format(first.story.introduce)}</p>
                      <span className="sent">小编推荐语：{first.story.pcIntroduce}</span>
                    </div>
                  </Link>
                </li>
              )
            })
          }
        </ul>
        <div className='rangkingBox' style={{width:'208px',float:'right'}}>
          <Rank scope={1} type={0} size={5} border={1} paddingTop={1} />
          <Rank scope={1} type={2} size={5} border={1} paddingTop={7} />
        </div>
      </div>
    </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      boyTypeOne: state.boy.boyTypeOne,
      boyTypeTwo: state.boy.boyTypeTwo,
      boyTypeThree: state.boy.boyTypeThree,
      boyTypeFour: state.boy.boyTypeFour,
      banner: state.boy.banner,
    };
  }
)(BoyRecomBook);