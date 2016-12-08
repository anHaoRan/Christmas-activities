import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
  updateBoyTypeOne,
  updateBoyTypeTwo,
  updateBoyTypeThree,
  updateBoyTypeFour,
 } from '../../../actions/boyActions';
import { boyType } from '../../../../config';
import Q from 'q';
const ARR = [
'boyTypeOne',
'boyTypeTwo',
'boyTypeThree',
'boyTypeFour',
];

class Classification extends Component {

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
          map(boyType, (type, index)=>{
            let list = this.props[ARR[index]];
            let first = list[0] || {story: {}};

            return(
             <li key={index} className="columnBook-list">
                <h2 className="type">{type}<Link to={'/library?channel=1&type=' + type} className="more">更多</Link></h2>

                <Link to={'/story/' + first.story.idStr} className="bookLink">
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
                      map(list.slice(1,4), (item, index) => {
                      return(
                        <p key={index} className="comment">
                          <Link to={'/story/' + item.story.idStr}>
                          [{item.story.name}] {item.story.pcIntroduce}
                          </Link>
                        </p>
                      )})
                    }
                </div>
              </li>
            )
          })
        }
      </ul>
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
    };
  }
)(Classification);