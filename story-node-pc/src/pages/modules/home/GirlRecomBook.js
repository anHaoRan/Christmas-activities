import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import Rank from '../../../components/Rank';
import {
  updateGirlBanner,
  updateGirlTypeOne,
  updateGirlTypeTwo,
  updateGirlTypeThree,
  updateGirlTypeFour,
} from '../../../actions/girlActions';
import Banner from '../../../components/Banner';
import { girlType } from '../../../../config';
import Q from 'q';

const ARR = [
'girlTypeOne',
'girlTypeTwo',
'girlTypeThree',
'girlTypeFour',
];

class GirlRecomBook extends Component {

  static fetchData(dispatch, Fetch = fetch) {
    return Q.all([
     Fetch('/api/girl/type/one').then(resp => {
       return dispatch(updateGirlTypeOne(resp.data));
     }),
     Fetch('/api/girl/type/two').then(resp => {
       return dispatch(updateGirlTypeTwo(resp.data));
     }),
     Fetch('/api/girl/type/three').then(resp => {
       return dispatch(updateGirlTypeThree(resp.data));
     }),
     Fetch('/api/girl/type/four').then(resp => {
       return dispatch(updateGirlTypeFour(resp.data));
     }),
     Fetch('/api/girl/banner').then(resp => {
       return dispatch(updateGirlBanner(resp.data[0] || {}));
     })
   ]);
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    GirlRecomBook.fetchData(dispatch);
  }

  format(content) {
    return (content || '').replace(/\s+/g, '');
  }
 
  render() {
    return (
      <div>
        <div className="column-title"><i></i>
          <h2>女频</h2><Link to='/girl' className='go'>进入女频频道</Link>
        </div>
        <Banner banner={this.props.banner}/>

        <div className="column-main">
          <ul className="column-bookRect">
            {
              map(girlType, (type, index) => {
                let list = this.props[ARR[index]];
                let first = list[0] || {story: {}};

                return (
                  <li key={index} className="bookRect-list">
                    <h2>{type}<Link to={'/library?channel=2&type=' + type} className="more">更多</Link></h2>
                    <Link to={'/story/' + first.story.idStr} className="bookLink">
                      <img src={first.story.cover}/>
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
            <Rank scope={0} type={0} size={5} border={1} paddingTop={1} />
            <Rank scope={0} type={2} size={5} border={1} paddingTop={7} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      girlTypeOne: state.girl.girlTypeOne,
      girlTypeTwo: state.girl.girlTypeTwo,
      girlTypeThree: state.girl.girlTypeThree,
      girlTypeFour: state.girl.girlTypeFour,
      banner: state.girl.banner,
    };
  }
)(GirlRecomBook);