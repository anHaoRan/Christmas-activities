import React, { Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';

const COPY_TYPE = {
  'books': '图书',
  'movies': '影视',
  'games': '游戏',
};

export default class RecommendList extends Component {
  constructor(props) {
    super(props);
    this.state={
      list: [],
      smallList: [],
    }
  }

  componentDidMount() {
    fetch('/api/copyright/recommend').then(resp => {
      this.setState({
        list: resp.data.slice(0, 6)
      });
    });

    fetch('/api/copyright/smallRecommend').then(resp => {
      this.setState({
        smallList: resp.data
      });
    });
  }

  render() {
    let { list, smallList } = this.state;
    return (
    <div className="fCRecommendation_box">
      <div className="fCRecommendation_box-top">
        <h2>精选版权推荐</h2>
      </div>
      <div className="fCRecommendation_box-main">
        <ul className="main_top">
        {
          map(list,(item,index)=>{
            let remark = item.remark || 'books';
            return (
              <li className={'item ' + remark} key={index}>
                <i className="_icon">{COPY_TYPE[remark]}</i>
                <Link to={'/story/' + item.story.idStr}>
                <div className="img"><img style={{width:"120px",height:"170px"}} src={item.story.cover}/></div>
                  <div className="recommend">
                    <span className="recommend_title win-head">{item.story.name}</span>
                    <span className="recommend_author">{item.story.author}</span>
                    <span className="recommend_concent">{item.story.pcIntroduce}</span>
                    <span className="recommend_classification">分类：<span>{item.story.type}</span></span>
                  </div>
                </Link>
              </li>
            )
          })
        }
        </ul>
        <ul className="main_bottom">
        {
          map(smallList,(item,index)=>{
            let remark = item.remark || 'books';
            return(
              <li key={index} className={'item ' + remark}>
                <i className="item_icon">{COPY_TYPE[remark]}</i>
                <Link to={'/story/' + item.story.idStr}>
                  <div className="item_title win-head">
                    {item.story.name}
                  </div>
                  <div className="item_author_type">
                    <span className="item_author">
                      {item.story.author}
                    </span>
                    <span className="item_classification">
                      分类：<span>{item.story.type}</span>
                    </span>
                  </div>
                </Link>
              </li>
            )
          })
        }
        </ul> 
      </div>
    </div>
    );
  }
}