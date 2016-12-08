import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
  updateGirlBanner,
  updateGirlTypeOne,
  updateGirlTypeTwo,
  updateGirlTypeThree,
  updateGirlTypeFour,
 } from '../../../actions/girlActions';
 import { girlType } from '../../../../config';
import Q from 'q';

const ARR = [
'girlTypeOne',
'girlTypeTwo',
'girlTypeThree',
'girlTypeFour',
];

class Classification extends Component {

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
     })
   ]);
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    Classification.fetchData(dispatch);
  }

  format(content) {
    return (content || '').replace(/\s+/g, '');
  }

  render() {
    return (
        <ul className="columnBook-rect">
        {
          map(girlType, (type, index) => {
            let list = this.props[ARR[index]];
            let first = list[0] || {story: {}};
            return (
              <li key={index} className="columnBook-list">
                <h2 className="type">{type}<Link to={'/library?channel=2&type=' + type} className="more">更多</Link></h2>

                <Link to={"/story/" + first.story.idStr} className="bookLink">
                  <img src={first.story.cover}/>
                  <div className="details">
                    <h3 className="bookName">{first.story.name}</h3>
                    <em className="author">{first.story.author}</em>
                    <p className="intro">简介：{this.format(first.story.introduce)}</p>
                    <span className="sent">小编推荐语：{first.story.pcIntroduce}</span>
                  </div>
                </Link>
                <div>
                    {
                      map(list.slice(1,4),(item,index)=>{
                        return(
                          <p key={index} className="comment">
                            <Link to={"/story/" + item.story.idStr}>
                              [{item.story.name}] {item.story.pcIntroduce}
                            </Link>
                          </p>
                        )
                      })
                    }
                </div>
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
      girlTypeOne: state.girl.girlTypeOne,
      girlTypeTwo: state.girl.girlTypeTwo,
      girlTypeThree: state.girl.girlTypeThree,
      girlTypeFour: state.girl.girlTypeFour,
    };
  }
)(Classification);