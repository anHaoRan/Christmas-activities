import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
      updateGirlBigProductsList,
      updateGirlSmallProductsList
 } from '../../../actions/girlActions';
import Q from 'q';

class BoutiqueRecommend extends Component {

  static fetchData(dispatch, Fetch = fetch) {
    return Q.all([
      Fetch('/api/girl/bigProductsRecommended').then(resp => {
        return dispatch(updateGirlBigProductsList(resp.data.slice(0, 1)));
      }),Fetch('/api/girl/smallProductsRecommended').then(resp => {
        return dispatch(updateGirlSmallProductsList(resp.data.slice(0, 3)));
      })
    ]);
  }
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { dispatch } = this.props;
    BoutiqueRecommend.fetchData(dispatch);
  }

  render() {
    let { bigProducts, smallProducts } = this.props;
    return (
    <div className="girlRecommend-rect">
      <h2 className="girlRecommend-title">精品推荐</h2>
      <div className="chiefBook">
      {
        map(bigProducts,(item,index)=>{
          return(
              <Link key={index} to={'/story/' + item.story.idStr}>
                <img src={item.pic || item.story.cover}/>
                <div className="message">
                  <h2 className="bookName">{item.story.name}</h2>
                  <span className="author">{item.story.author}</span>
                  <p className="recoSent">{item.story.pcIntroduce}</p>
                </div>
              </Link>
          )
        })
      }
      </div>
        <ul className="assistantBook">
        {
          map(smallProducts,(item,index)=>{
            return(
              <li key={index}>
                <Link to={'/story/' + item.story.idStr}>
                  <img src={item.pic || item.story.cover}/>
                  <div className="message">
                    <h2 className="bookName">{item.story.name}</h2>
                    <span className="author">{item.story.author}</span>
                    <p className="recoSent">{item.story.pcIntroduce}</p>
                  </div>
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      bigProducts: state.girl.bigProducts,
      smallProducts: state.girl.smallProducts
    };
  }
)(BoutiqueRecommend);