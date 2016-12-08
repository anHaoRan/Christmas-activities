import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
  updateUserPayRecord,
  updateUserPayChapterConsumeRecord,
  updateUserRewardConsumeRecord,
  updateUserVoteConsumeRecord,
} from '../../../actions/userActions';
import Pagination from '../../../components/Pagination';

class AccountManage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bigCut: 0,
      smallCut: 0
    }
  }

  componentDidMount() {
    this.getRechargeRecord();
    this.getPayChapterRecord();
    this.getRewardRecord();
    this.getVoteRecord();
  }

  getVoteRecord(pageNo=0) {
    let { dispatch } = this.props;
    fetch('/api/user/c/user/getUserVoteRecord?&pageNo=' + pageNo).then(resp => {
      dispatch(updateUserVoteConsumeRecord(resp.data))
    });
  }

  getRewardRecord(pageNo=0) {
    let { dispatch } = this.props;
    fetch('/api/user/c/user/getUserRewardRecord?pageNo=' + pageNo).then(resp => {
      dispatch(updateUserRewardConsumeRecord(resp.data))
    });
  }

  getPayChapterRecord(pageNo=0) {
    let { dispatch } = this.props;
    fetch('/api/user/c/user/getUserPayRecord?pageNo=' + pageNo).then(resp => {
      dispatch(updateUserPayChapterConsumeRecord(resp.data))
    });
  }

  getRechargeRecord(pageNo=0) {
    let { dispatch } = this.props;
    fetch('/api/user/c/user/getRechargeRecord?pageNo=' + pageNo).then(resp => {
      dispatch(updateUserPayRecord(resp.data))
    });
  }

  //充值记录
  getTopUpResultRect() {
    let { payRecord } = this.props;
    return (
      <div>
        <ol className="topUp-resultRect">
          <li className="list-title">
            <span className="quantity">充值火星币数量</span>
            <span className="sum">消费金额</span>
            <span className="time">充值时间</span>
            <span className="way">充值方式</span>
            <span className="state">充值状态</span>
          </li>
          {
            map(payRecord.list, (record, index) => {
              return (
                <li key={index}>
                  <span className="quantity">{record.tradeAmount}火星币</span>
                  <span className="sum">{record.rechargeFee}</span>
                  <span className="time">{record.createTime}</span>
                  <span className="way">{record.rechargeType}</span>
                  <span className={ 'state' + (record.rechargeStatus ? ' true' : ' false') }>{record.rechargeStatus ? '成功' : '失败'}</span>
                </li>
              );
            })
          }
        </ol>
        <Pagination onPageChange={(pageNo) => {
            this.getRechargeRecord(pageNo);
          }} page={payRecord.pageNo + 1} 
            totalPages={payRecord.totalPages}/>
      </div>
    )
  }

  //付费章节消费记录
  purchaseStStory() {
    let {payChapterConsumeRecord} = this.props;
    return (
      <div>
        <ol className="consume-resultRect">
          <li className="list-title">
            <span className="bookName">小说名称</span>
            <span className="chapter">更新章节</span>
            <span className="consume">消费火星币/券</span>
            <span className="time">最新更新时间</span>
          </li>
          {
            map(payChapterConsumeRecord.list, (record, index) => {
              return (
                <li key={index}>
                  <span className="bookName"><h2>{record.bookName}</h2></span>
                  <span className="chapter">{record.operateDesc}</span>
                  <span className="consume">{record.costAmount}</span>
                  <span className="time">{record.createTime}</span>
                </li>
              );
            })
          }
        </ol>
        <Pagination onPageChange={(pageNo) => {
            this.getPayChapterRecord(pageNo);
          }} page={payChapterConsumeRecord.pageNo + 1} 
            totalPages={payChapterConsumeRecord.totalPages}/>
      </div>
    )
  }

  //打赏记录
  getAwardRecord() {
    let { rewardConsumeRecord } = this.props;
    // console.log(rewardConsumeRecord);
    return (
      <div>
        <ol className="award-resultRect">
          <li className="list-title">
            <span className="bookName">打赏书名</span>
            <span className="goods">打赏内容</span>
            <span className="value">价值</span>
            <span className="time">时间</span>
            <span className="sent">赠言</span>
          </li>
          {
            map(rewardConsumeRecord.list, (record, index) => {
              return (
                <li key={index}>
                  <span className="bookName"><h2>{record.bookName}</h2></span>
                  <span className="goods">{record.operateDesc}</span>
                  <span className="value">{record.costAmount}</span>
                  <span className="time">{record.createTime}</span>
                  <span className="sent">{record.descn}</span>
                </li>
              );
            })
          }
        </ol>
        <Pagination onPageChange={(pageNo) => {
            this.getRewardRecord(pageNo);
          }} page={rewardConsumeRecord.pageNo + 1} totalPages={rewardConsumeRecord.totalPages}/>
      </div>
    )
  }
  //月票记录
  getMonTicket() {
    let { voteConsumeRecord } = this.props;
    // console.log(voteConsumeRecord);
    return (
      <div>
        <ol className="vote-resultRect">
          <li className="list-title">
            <span className="bookName">书名</span>
            <span className="goods">票数</span>
            <span className="value">价值</span>
            <span className="time">时间</span>
            <span className="sent">赠言</span>
          </li>
          {
            map(voteConsumeRecord.list, (record, index) => {
              return (
                <li key={index}>
                  <span className="bookName"><h2>{record.bookName}</h2>{/*<i className="viplog"></i>*/}</span>
                  <span className="goods">{record.operateDesc}票</span>
                  <span className="value">{record.operateDesc * 200}火星币</span>
                  <span className="time">{record.createTime}</span>
                  <span className="sent">{record.descn}</span>
                </li>
              );
            })
          }
        </ol>
        <Pagination onPageChange={(pageNo) => {
          this.getVoteRecord(pageNo);
        }} page={voteConsumeRecord.pageNo + 1} totalPages={voteConsumeRecord.totalPages}/>
      </div>
    )
  }

  judgeConsumptionRect(){
    if(this.state.smallCut == 0){
      return this.purchaseStStory();
    }else if(this.state.smallCut == 1){
      return this.getAwardRecord();
    }else if(this.state.smallCut == 2){
      return this.getMonTicket();
    }
  }

  //消费记录
  getConsumption() {
    return (
      <div>
        <ul className="xfjl-cutRect">
          <li className={this.state.smallCut == 0? 'on': ''} onClick={() => this.setState({smallCut: 0})}>付费章节消费记录</li>
          <li className={this.state.smallCut == 1? 'on': ''} onClick={() => this.setState({smallCut: 1})}>打赏记录</li>
          <li className={this.state.smallCut == 2? 'on': ''} onClick={() => this.setState({smallCut: 2})}>投票记录</li>
        </ul>
        {this.judgeConsumptionRect()}
      </div>
    )
  }

  render() {
    let { display, user } = this.props;
    return (
      <div style={{display:display?'block': 'none'}}>
        <div className="moneyRect">
          <ul className="remainingRect">
            <li>
              <label>火星币余额：</label><span>{user.goldAmount}</span><em>火星币</em></li>
            <li>
              <label>火星券余额：</label><span>{user.giveAmount}</span><em>火星券</em></li>
          </ul>
          <Link to="/pay" className="topUpBtn">充值</Link>
        </div>
        <ul className="cutRect">
          <li className={this.state.bigCut == 0? 'on': ''} onClick={() => this.setState({bigCut: 0})}>充值记录</li>
          <li className={this.state.bigCut == 1? 'on': ''} onClick={() => this.setState({bigCut: 1})}>消费记录</li>
        </ul>
        {this.state.bigCut == 0? this.getTopUpResultRect(): this.getConsumption()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      payRecord: state.user.payRecord,
      payChapterConsumeRecord: state.user.payChapterConsumeRecord,
      rewardConsumeRecord: state.user.rewardConsumeRecord,
      voteConsumeRecord: state.user.voteConsumeRecord,
    };
  }
)(AccountManage);