import React, { Component } from 'react';
import { map } from 'lodash';

export default class FansAllRank extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { fansAllRankList, fansNovelDetails } = this.props;
    return (
      <div className="fans-ranking">
        <div><h2>《{fansNovelDetails.name}》</h2><span>粉丝榜</span></div>
        <ul className="ranking-rect">
          <li className="list-title"><span className='num'>排名</span><span className='name'>昵称</span><span className='money'>粉丝值</span></li>
          {
            map(fansAllRankList, (item, index) => {
              return (
                <li key={index}>
                  <a href="javascript:void(0)">
                    <span className="num">{(index+1)<10?'0'+(index+1):(index+1)}</span>
                    <span className="name">{item.userName}</span>
                    <span className="money">{item.allpay}</span>
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}