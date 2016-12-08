import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
    updateGirlHotWomenList,
    updateGirlHotWomenBigPuchList,
    updateGirlHotWomenSmallPuchList
 } from '../../../actions/girlActions';
import Q from 'q';

class HotWomen extends Component {

  static fetchData(dispatch, Fetch = fetch) {
    return Q.all([
      Fetch('/api/girl/hotwomenBigPush').then(resp => {
        return dispatch(updateGirlHotWomenBigPuchList(resp.data));
      }),
      Fetch('/api/girl/hotwomenSmallPush').then(resp => {
        return dispatch(updateGirlHotWomenSmallPuchList(resp.data));
      }),
      Fetch('/api/girl/hotwomen').then(resp => {
        return dispatch(updateGirlHotWomenList(resp.data));
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
    HotWomen.fetchData(dispatch);
  }
  mouseOver(index){
    this.setState({mouseover:index})
  }
  render() {
    let { bigPuchList, smallPuchList, hotWomenList } = this.props;
    let { mouseover } = this.state;
    return (
      <div className="weekHot-main">
        <h2 className="weekHot-title">本周热推</h2>
        <div className="picAuto">
          <ul className="bigBook-rect">
          {
            map(hotWomenList,(item,index)=>{
              return(
                <li key={index} 
                  className="bigBook-list" 
                  style={{
                    zIndex: mouseover == index? '10': '1',
                    backgroundColor: '#fff'
                  }}>
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
              map(hotWomenList,(item,index)=>{
                return(
                  <li key={index} 
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
            map(hotWomenList,(item,index)=>{
              return (
                <span key={index} className="bookName">{index == mouseover ? item.story.name : ""}</span>
                )
            })
          }
        </div>
      <div className="bookIntro">
      {
        map(bigPuchList, (item, index) => {
          return (
            <dl key={index} className="bookIntro-rect">
              <dt className="bookIntro-title win-head">
                <Link to={'/story/' + item.story.idStr}>
                  {item.story.name}：{item.story.pcIntroduce}
                </Link>
              </dt>
              {
                map(smallPuchList.slice(index * 4, index * 4 + 4), (content,index1) =>{
                  return (
                    <dd key={index1} className="bookIntro-list">
                      <Link to={'/story/' + content.story.idStr}>
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
      bigPuchList: state.girl.hotWomenBigPuchList,
      smallPuchList: state.girl.hotWomenSmallPuchList,
      hotWomenList: state.girl.hotWomenList
    };
  }
)(HotWomen);