import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
    updateBoyHotWomenList,
    updateBoySmallPushList,
    updateBoyBigPushList
 } from '../../../actions/boyActions';
import Q from 'q';

class Hotwomen extends Component {

  static fetchData(dispatch, Fetch = fetch) {
     return Q.all([
      Fetch('/api/boy/hotwomenBigPush').then(resp => {
        return dispatch(updateBoyBigPushList(resp.data));
      }),
      Fetch('/api/boy/hotwomenSmallPush').then(resp => {
        return dispatch(updateBoySmallPushList(resp.data));
      }),
      Fetch('/api/boy/hotwomen').then(resp => {
        return dispatch(updateBoyHotWomenList(resp.data));
      })

    ]);
  }

  constructor(props) {
    super(props);
    this.state={
      mouseover:0,
    }
  }

  componentDidMount() {
    let { dispatch } = this.props;
    Hotwomen.fetchData(dispatch);
  }
  mouseOver(index){
    this.setState({mouseover:index})
  }
  render() {
    let { bigpush, smallpush, hotWomen } = this.props;
    let { mouseover } = this.state;
    return (
      <div className="weekHot-main">
        <h2 className="weekHot-title">本周热推</h2>
        <div className="picAuto">
          <ul className="bigBook-rect">
            {
              map(hotWomen,(item,index)=>{
                return(
                  <li key={index} 
                    className="bigBook-list" 
                    style={{
                      zIndex: mouseover == index? '10': '1',
                      backgroundColor: '#fff'
                    }}
                    >
                    <Link to={'/story/'+item.story.idStr}>
                      <img src={item.pic || item.story.cover}/>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
          <ol className="smallBook-rect">
            {
              map(hotWomen,(item,index)=>{
                return(
                  <li 
                    key={index} 
                    className={'smallBook-list' + (index == mouseover ? ' on' : '')} 
                    style={{backgroundColor: '#fff'}}
                    onMouseOver={this.mouseOver.bind(this,index)}>
                    <a href="javascript:void(0)"><img src={item.pic || item.story.cover} /></a>
                  </li>
                  )
              })
            }
          </ol>
          <div className="cover"></div>
          {
            map(hotWomen,(item,index)=>{
              return(
                <span key={index} className="bookName">{index == mouseover ? item.story.name : ""}</span>
              )
            })
          }
        </div>
      <div className="bookIntro">
      {
        map(bigpush, (boy, index) => {
          return (
            <dl key={index} className="bookIntro-rect">
              <dt className="bookIntro-title win-head">
                <Link to={"/story/"+boy.story.idStr}>
                  {boy.story.name}：{boy.story.pcIntroduce}
                </Link>
              </dt>
              {
                map(smallpush.slice(index * 4, index * 4 + 4), (content,index1) =>{
                  return (
                    <dd key={index1} className="bookIntro-list">
                      <Link to={"/story/"+content.story.idStr}>
                        <span>[{content.story.type}]</span>
                        <span>{content.story.name}：</span>
                        <span>{content.story.pcIntroduce}</span>
                      </Link>
                    </dd>
                  )
                })
              }
            </dl>
          );
        })
      }
      </div>
    </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      hotWomen: state.boy.hotWomenList,
      bigpush: state.boy.boyBigPushList,
      smallpush: state.boy.boySmallPushList
    };
  }
)(Hotwomen);