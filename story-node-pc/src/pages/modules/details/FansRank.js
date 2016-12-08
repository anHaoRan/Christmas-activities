import React, { Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import Avatar from '../../../components/Avatar';
const GENDER_CLASS = ['girlBg', 'boyBg', 'girlBg'];

export default class FansRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fansRank: 0,
      list: []
    }
  }

  componentDidMount() {
    let { params } = this.props;
    let { storyId } = params;
    fetch('/api/details/c/story/' + params.storyId + '/fans').then(resp => {
      this.setState({
        list: resp.data
      });
    });
  }

  render() {
    let { story } = this.props;
    let { list } = this.state;
    return (
      <div className="fansRanking">
        <h2>粉丝榜</h2>
        <dl className="ranking-rect">
          {
            map(list, (item, index) => {
              return (
                <dd key={index} className={this.state.fansRank == index? 'ranking-list on': 'ranking-list'} onMouseOver={() => this.setState({fansRank: index})}>
                  <a href="javascript:void(0)" className={'rectBg ' + GENDER_CLASS[story.channel]}>
                    <em className="num">{(index+1)<10?'0'+(index+1):(index+1)}</em>
                    <Avatar url={item.headImage}/>
                    <h3 className="name">{item.userName}</h3>
                    <p className="money">消费{item.allpay}火星币</p>
                  </a>
                </dd>
              )
            })
          }
          <dt className="more"><Link to={'/fans?storyId=' + story.id}>查看更多</Link></dt>
        </dl>
      </div>
    )
  }
}