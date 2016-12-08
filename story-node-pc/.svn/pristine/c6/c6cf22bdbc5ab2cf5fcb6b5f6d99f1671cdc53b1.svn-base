import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch, {post} from '../../../utils/fetch';
import {
  updateMonTicketList,
  updateBoyRewardProductList,
  updateGrilRewardProductList,
  updateCurrentStory,
} from '../../../actions/detailsActions';
import {
  updateCurrentUser,
  updateLoginModalState
} from '../../../actions/commonActions';
import Avatar from '../../../components/Avatar';
import queryString from 'query-string';

// 投月票种类
const FetchMonTicketList = (dispatch, Fetch, query, params) => {
  return Fetch('/api/details/c/product/monthProducts?storyId=' + params.storyId).then(resp => {
    return dispatch(updateMonTicketList(resp.data));
  });
}

const FetchBoyRewardProductList = (dispatch, Fetch) => {
  return Fetch('/api/details/c/product/rewardProducts?channel=1').then((resp) => {
    return dispatch(updateBoyRewardProductList(resp.data));
  });
}

const FetchGirlRewardProductList = (dispatch, Fetch) => {
  return Fetch('/api/details/c/product/rewardProducts?channel=2').then((resp) => {
    return dispatch(updateGrilRewardProductList(resp.data));
  });
}

const FetchUserInfo = (dispatch, Fetch) => {
  return Fetch('/api/auth/user?t=' + (new Date - 0), {}).then(resp => {
    return dispatch(updateCurrentUser(resp.data || {}));
  });
}

const FetchStoryInfo = (dispatch, Fetch, storyId) => {
  return Fetch('/api/details/c/story/' + storyId + '/detail').then(resp => {
    return dispatch(updateCurrentStory(resp.data));
  });
}

const REWARD_MAP = {
  '金刚狼抓': '/assets/images/reward-lw.png',
  '超人内裤': '/assets/images/reward-crnk.png',
  '钢铁侠': '/assets/images/reward-gtx.png',
  '美队之盾': '/assets/images/reward-mdzd.png',
  '雷神锤': '/assets/images/reward-lsc.png',
  '大宝剑': '/assets/images/reward-dbj.png',
  '香水': '/assets/images/reward-perfume.png',
  '包包': '/assets/images/reward-bag.png',
  '皇冠': '/assets/images/reward-diadema.png',
  '豪车': '/assets/images/reward-car.png',
  '轮船': '/assets/images/reward-ship.png',
  '城堡': '/assets/images/reward-house.png'
};

class Award extends Component {

  static fetchData(dispatch, Fetch = fetch, {}, params) {
    return FetchMonTicketList(dispatch, Fetch, {}, params);
  }

  constructor(props) {
    super(props);
    this.state = {
      awardCut: 0,
      monticketListCut: 0,
      rewardIndex: 0,
      rewardCount: 1,
      monticketRecordList: [],
      rewardRecordList: [],
      rewardFetched: false,
      defaultVoteRemark: '支持一下，希望创造出更好的作品'
    }
  }

  componentWillReceiveProps(nextProps) {
    let oldStory = this.props.story;
    let newStory = nextProps.story;
    if (oldStory.id !== newStory.id) {
      Award.fetchData(this.props.dispatch, fetch, {}, {storyId: newStory.id});
    }
  }

  componentDidMount() {
    let { dispatch, story, params } = this.props;
    let query = queryString.parse(location.search);
    this.setState({
      awardCut: (query.award || 0) - 0
    });
    Award.fetchData(dispatch, fetch, {}, params);
    // this.fetchMonTickerRecordList();
  }

  // 月票投票记录
  fetchMonTickerRecordList() {
    let { params } = this.props;
    return fetch('/api/details/c/story/searchRecords?type=7&pageSize=0&storyId=' + params.storyId).then(resp => {
      this.setState({
        monticketRecordList: resp.data.slice(0, 3)
      });
    });
  }

  // 打赏记录
  fetchRewardRecordList() {
    let { params } = this.props;
    return fetch('/api/details/c/story/searchRecords?type=6&pageSize=0&storyId=' + params.storyId).then((resp) => {
      this.setState({
        rewardRecordList: resp.data.slice(0, 3)
      });
    });
  }

  getRewardValue() {
    let { rewardIndex, rewardCount } = this.state;
    let { story } = this.props;
    let reward = {};
    if (story.channel == '1') {
      reward = this.props.boyRewardProductList[rewardIndex] || {
        virtualprice: 0
      };
    } else {
      reward = this.props.girlRewardProductList[rewardIndex] || {
        virtualprice: 0
      };
    }
    return reward.virtualprice * rewardCount;
  }

  rewardCountHandler(evt) {
    let val = evt.target.value.trim();
    if (!/^\d$/.test(val)) {
      this.refs.rewardCount.value = 1;
      this.setState({
        rewardCount: 1
      });
      return false;
    }
    this.setState({
      rewardCount: val - 0
    });
  }

  minusRewardCount() {
    let node = this.refs.rewardCount;
    let val = node.value.trim();
    if (!/^\d+$/.test(val)) {
      this.setState({
        rewardCount: 1
      });
      node.value = 1;
      return false;
    }
    if (val > 1) {
      node.value = val - 1;
      this.setState({
        rewardCount: val - 1
      });
    }
  }

  addRewardCount() {
    let node = this.refs.rewardCount;
    let val = node.value.trim();
    if (!/^\d+$/.test(val)) {
      node.value = 1;
      this.setState({
        rewardCount: 1
      });
      return false;
    }
    node.value = val - 0 + 1;
    this.setState({
      rewardCount: val - 0 + 1
    });
  }

  // 投月票
  voteMonthTicket() {
    let { dispatch, story, user, monticketList } = this.props;
    let storyId = story.id;
    if (!storyId) {
      storyId = queryString.parse(location.search).storyId;
    }
    let remark = this.refs.voteRemark.value.trim();
    let ticket = monticketList[this.state.monticketListCut];
    let amount = ticket.virtualprice;

    if (!user.id) {
      dispatch(updateLoginModalState(true));
      return false;
    } else {
      if (user.goldAmount < amount) {
        _alertCenter('火星币余额不足，请先充值再来投票吧！', 'error', 400);
        return false;
      }
    }

    post('/api/user/monthVote/add', {
      body: {
        voteNum: ticket.packamount,
        storyId: storyId,
        remark: remark.substr(0, 200),
      }
    }).then(resp => {
      // this.refs.voteRemark.value = '';
      console.log(resp)
      if (resp.status === 401) {
        console.info('用户未登录');
        dispatch(updateLoginModalState(true));
        return false;
      } else {
        if (resp.errorCode > 0) {
          if (resp.errorCode === 415) {
            _alertCenter(resp.message, 'error', 350);
          } else {
            _alertCenter('投票失败，请重试', 'error');
          }
        } else {
          _alertCenter('投月票成功');
          FetchStoryInfo(dispatch, fetch, storyId);
          FetchMonTicketList(dispatch, fetch, {}, {storyId: storyId});
          this.fetchMonTickerRecordList();
          FetchUserInfo(dispatch, fetch);
        }
      }
    });
  }

  renderDisabledMonTicket(show) {
    let { monticketList, story } = this.props;
    let { user } = this.props;
    return (
      <li className={'cutRect-list' + (show ? ' on' : '')}>
        <div className="ticket-prevent">
          该作品尚未入vip作品，不能投月票哦！
        </div>
        <div className="monTicket disabled">
          {
            map(monticketList.slice(0, 4), (item, index) => {
              return (
                <dl key={index} onClick={() => {
                  _alertCenter('该作品尚未入vip作品，不能投月票哦！', 'error', 400, 1000);
                }}>
                  <dd>
                    <p>{item.title}</p>
                    <span>{item.remark}</span>
                  </dd>
                </dl>
              )
            })
          }
        </div>
        <div className="vote-box">
          <p className="vote-title">赠言</p>
          <input type="text" ref="voteRemark" disabled defaultValue={this.state.defaultVoteRemark}/>
          <a className="vote-btn disabled" onClick={() => {
            _alertCenter('该作品尚未入vip作品，不能投月票哦！', 'error', 400, 1000);
          }}>投票</a>
        </div>
        <p className="message">
          月票说明：<br />
          1）月票是一种荣誉，代表了读者对作品的喜爱程度<br />
          2）每月月票榜前十名的作品将会获得火星小说颁发的奖金<br />
          3）非vip作品不能享受被投月票资格
        </p>
      </li>
    )
  }

  renderMonthTicketRank(story) {
    if (story.monthNum === 0) {
      return (<span>当前月票为<em>{story.monthNum}</em></span>);
    } else if (story.monthNumRank === 1) {
      return (
        <div>
          <span>当前月票数<em>{story.monthNum}</em></span>
          <span>排名第<em>1</em></span>
        </div>
      );
    } else {
      return (
        <div>
          <span>当前月票<em>{story.monthNum}</em></span>
          <span>当月排行<em>{story.monthNumRank}</em></span>
        </div>
      );
    }
  }

  //月票
  getmonTicketList(show) {
    let { monticketList, story } = this.props;
    let { monticketRecordList } = this.state;
    let { user } = this.props;
    return (
      <li className={'cutRect-list' + (show ? ' on' : '')}>
        <div className="user-case-a">
          {this.renderMonthTicketRank(story)}
        </div>
        <div className="user-case-b">
          <span>剩余火星币：<em>{ user.goldAmount || 0 }</em>火星币</span>
          <Link to="/pay">充值</Link>
        </div>
        <div className="monTicket">
          {
            map(monticketList.slice(0, 4), (item, index) => {
              return (
                <dl key={index} className={this.state.monticketListCut == index? 'on' : ''} onClick={() => this.setState({monticketListCut: index})}>
                  <dt className="shade"><i></i></dt>
                  <dd>
                    <p>{item.title}</p>
                    <span>{item.remark}</span>
                  </dd>
                </dl>
              )
            })
          }
          {
            map(monticketList.slice(4, 5), (item, index) => {
              return (
                <dl key={index} className={'surpass' + (this.state.monticketListCut == 4? ' on' : '')} onClick={() => {
                  this.setState({monticketListCut: 4})
                }}>
                  <dt className="shade"><i></i></dt>
                  <dd>
                    <p>{ item.title }<em>超越前一名</em></p>
                    <span>{item.remark}</span>
                  </dd>
                </dl>
              );
            })
          }
          {
            map(monticketList.slice(5, 6), (item, index) => {
              return (
                <dl key={index} className={'surpass' + (this.state.monticketListCut == 5? ' on' : '')} onClick={() => {
                  this.setState({monticketListCut: 5})
                }}>
                  <dt className="shade"><i></i></dt>
                  <dd>
                    <p>{ item.title }<em>成为第一名</em></p>
                    <span>{item.remark}</span>
                  </dd>
                </dl>
              );
            })
          }
        </div>
        <div className="vote-box">
          <p className="vote-title">赠言</p>
          <input type="text" ref="voteRemark" defaultValue={this.state.defaultVoteRemark}/>
          <a onClick={this.voteMonthTicket.bind(this)} className="vote-btn">投票</a>
        </div>
        <p className="message">
          月票说明：<br />
          1）月票是一种荣誉，代表了读者对作品的喜爱程度<br />
          2）每月月票榜前十名的作品将会获得火星小说颁发的奖金<br />
          3）非vip作品不能享受被投月票资格
        </p>
        <dl className="record">
          <dt className="record-title">今日投票记录</dt>
          <dd className="record-rect">
            {
              map(monticketRecordList, (item, index) => {
                return (
                  <div key={index} className="record-list">
                    <Avatar url={item.imageurl} />
                    <p><a href="" className="name">{item.username}</a>{item.message}</p>
                    <p><em className="time">{item.time}</em><em className="goods">打赏了{item.num}个{item.pname}</em></p>
                  </div>
                )
              })
            }
          </dd>
        </dl>
      </li>
    )
  }

  // 投推荐票
  addRecommendVote(count) {
    let { story, dispatch, user } = this.props;

    if (!user.id) {
      dispatch(updateLoginModalState(true));
      return false;
    } else {
      if (user.recommendTicket < count) {
        _alertCenter('推荐票余额不足', 'error');
        return false;
      }
    }

    post('/api/user/recommendVote/add', {
      body: {
        storyId: story.id,
        voteNum: count,
      }
    }).then(resp => {
      console.log(resp);
      if (resp.status === 401) {
        console.info('用户未登录');
        dispatch(updateLoginModalState(true));
        return false;
      } else {
        if (resp.errorCode > 0) {
          _alertCenter('投票失败，请重试', 'error');
        } else {
          _alertCenter('投推荐票成功');
          FetchStoryInfo(dispatch, fetch, story.id);
          FetchUserInfo(dispatch, fetch);
        }
      }
    });
  }

  //推荐票
  getRecommendTicketList(show) {
    let { story, user, route } = this.props;
    let arr = [1,2,3,4];
    return (
      <li className={'cutRect-list' + (show ? ' on' : '')}>
        <div className="user-case-a"><span>月推荐票<em>{ story.recommentNum }</em></span><span>总推荐票<em>{ story.recommentNumTotal }</em></span><span>排名<em>No.{ story.recommentNumRank }</em></span></div>
        <div className="recommendTicket">
          <ul className="recommendTicket-rect">
            {
              map(arr, (count, index) => {
                return (
                  <li key={index}
                    onClick={this.addRecommendVote.bind(this, count)}
                    className="recommendTicket-list">
                    <img src={route.CDN + '/assets/images/zan.png'} /><i>+{count}</i>
                  </li>
                );
              })
            }
          </ul>
          <p>感谢您支持，推荐票还剩余<span>{user.recommendTicket || 0}</span>张</p>
          <h5>推荐票说明：<br /> 1.非付费用户每天登录获赠2张推荐票，付费用户每天登录获取4张推荐票 <br />2.推荐时效为24小时，每天0：00清零余额</h5>
        </div>
      </li>
    )
  }

  // 打赏
  voteRewardProduct() {
    let { dispatch, story, user } = this.props;
    let rewardCount = (this.refs.rewardCount.value.trim() - 0) || 0;
    let remark = this.refs.rewardRemark.value.trim();
    let { rewardIndex } = this.state;
    let reward = {};
    if (story.channel == '1') {
      reward = this.props.boyRewardProductList[rewardIndex] || {}
    } else {
      reward = this.props.girlRewardProductList[rewardIndex] || {}
    }

    if (!rewardCount || !reward.id) {
      return false;
    }

    if (!user.id) {
      dispatch(updateLoginModalState(true));
      return false;
    } else {
      if (user.goldAmount < this.getRewardValue()) {
        _alertCenter('火星币余额不足', 'error');
        return false;
      }
    }

    post('/api/user/reward/add', {
      body: {
        pid: reward.id,
        amount: rewardCount,
        storyId: story.id,
        remark: remark.substr(0, 200),
      }
    }).then(resp => {
      // this.refs.rewardRemark.value = '';
      this.setState({
        rewardIndex: 0
      });
      console.log(resp)
      if (resp.status === 401) {
        console.info('用户未登录');
        dispatch(updateLoginModalState(true));
        return false;
      } else {
        if (resp.errorCode > 0) {
          _alertCenter('投票失败，请重试', 'error');
        } else {
          _alertCenter('打赏成功');
          this.refs.rewardCount.value = '1';
          FetchStoryInfo(dispatch, fetch, story.id);
          this.fetchRewardRecordList();
          FetchUserInfo(dispatch, fetch);
        }
      }
    });
  }

  // 打赏
  getRewardList(show) {
    let { dispatch, boyRewardProductList, girlRewardProductList, params } = this.props;
    let { rewardFetched, rewardRecordList } = this.state;
    if (!rewardRecordList.length && !rewardFetched) {
      this.fetchRewardRecordList()
        .then(resp => {
          this.setState({rewardFetched: true});
        });
    }
    
    let { user, story, route } = this.props;
    let wardProductList = [];
    let defaultRewardRemark = '';
    if (story.channel === '1') {
      if (!boyRewardProductList.length) {
        FetchBoyRewardProductList(dispatch, fetch);
      }
      wardProductList = [].concat(boyRewardProductList);
      defaultRewardRemark = '守护作者大大，从现在开始。'
    } else {
      if (!girlRewardProductList.length) {
        FetchGirlRewardProductList(dispatch, fetch);
      }
      defaultRewardRemark = '让你拥有更加迷人的魅力。';
      wardProductList = [].concat(girlRewardProductList);
    }
    return (
      <li className={'cutRect-list' + (show ? ' on' : '')}>
        <div className="user-case-a"><span>打赏<em>{story.rewardTotal}</em></span></div>
        <div className="user-case-b">
          <span>剩余火星币：<em>{user.goldAmount || 0}</em>火星币</span>
          <Link to="/pay">充值</Link>
        </div>
        <div className="reward">
          <div className="reward-rect">
            {
              map(wardProductList, (item, index) => {
                return (
                  <dl key={item.id} className={'reward-list' + (this.state.rewardIndex === index ? ' on' : '')} onClick={() => {
                        this.refs.rewardRemark.value = item.remark;
                        this.setState({rewardIndex: index})
                      }
                    }>
                    <dd className="shade"><i></i></dd>
                    <dd><img src={route.CDN + REWARD_MAP[item.image]} /></dd>
                    <dt>{item.title}</dt>
                  </dl>
                );
              })
            }
          </div>
          <ul className="count-ract">
            <li>
              <span>数量：</span>
              <em className="sub" onClick={this.minusRewardCount.bind(this)}>-</em>
              <input type="text" defaultValue={this.state.rewardCount} ref="rewardCount" onChange={this.rewardCountHandler.bind(this)} className="num" />
              <em className="add" onClick={this.addRewardCount.bind(this)}>+</em>
            </li>
            <li><span>价值：</span><em className="money">{this.getRewardValue()}</em><span>火星币</span></li>
          </ul>
        </div>
        <div className="vote-box">
          <p className="vote-title">赠言</p>
          <input type="text" ref="rewardRemark" defaultValue={defaultRewardRemark} />
          <a className="vote-btn" onClick={this.voteRewardProduct.bind(this)}>打赏</a>
        </div>
        <p className="message">打赏说明：
          <br />通过打赏是对作者进行鼓励的一种方式，如果您对小说满意，除了给与作者订阅支持，也可以
          <br />打赏激励作者创作更好的作品。您打赏的道具，我们将按比例和作者分成
        </p>
        <dl className="record">
          <dt className="record-title">今日打赏记录</dt>
          <dd className="record-rect">
            {
              map(rewardRecordList, (item, index) => {
                return (
                  <div key={index} className="record-list">
                    <Avatar url={item.imageurl} />
                    <p><a href="" className="name">{item.username}</a>{item.message}</p>
                    <p><em className="time">{item.time}</em><em className="goods">打赏了{item.num}个{item.pname}</em></p>
                  </div>
                )
              })
            }
          </dd>
        </dl>
      </li>
    )
  }

  toggleVote(index) {
    this.setState({awardCut: index});
    setTimeout(() => {
      window.catalogTop = document.getElementById('detailCatalogBox').offsetTop;
    }, 300);
  }

  render() {
    let { awardCut } = this.state;
    let { story } = this.props;
    return (
      <div className="award">
        <ul className="award-cutBtn">
          <li className={'cutBtn-list win-head' + (awardCut === 0 ? ' on': '')} 
            onClick={this.toggleVote.bind(this, 0)}>月票</li>
          <li className={'cutBtn-list win-head' + (awardCut === 1 ? ' on': '')} 
            onClick={this.toggleVote.bind(this, 1)}>推荐票</li>
          <li className={'cutBtn-list win-head' + (awardCut === 2 ? ' on': '')} 
            onClick={this.toggleVote.bind(this, 2)}>打赏</li>
        </ul>
        <ol className="award-cutRect">
          {
            story.isPay ? this.getmonTicketList(awardCut === 0) : this.renderDisabledMonTicket(awardCut === 0)
          }
          {
            this.getRecommendTicketList(awardCut === 1)
          }
          {
            this.getRewardList(awardCut === 2)
          }
        </ol>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      user: state.common.user,
      monticketList: state.details.monticketList,
      boyRewardProductList: state.details.boyRewardProductList,
      girlRewardProductList: state.details.girlRewardProductList,
    };
  }
)(Award);