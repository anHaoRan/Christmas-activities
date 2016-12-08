import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import Avatar from '../../../components/Avatar';

export default class InfoCenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cutState: 0
    }
  }

  getInform() {
    return (
      <div className="infocenter-tzCon">
        <dl className="tz-list">
          <dt className="tx"><Avatar url={''}/></dt>
          <dd className="rightBox">
            <p><a href="#" className="name">小星星</a>赞了<a href="#" className="name">我</a>对《最好的我们》的评论：小说太好看了，坐等更新！</p>
            <span className="time">2016-07-15 16:04</span>
          </dd>
        </dl>
      </div>
    )
  }

  getComment() {
    return (
      <div className="infocenter-plCon">
        <dl className="pl-list">
          <dt className="tx"><Avatar url={''}/></dt>
          <dd className="rightBox">
            <h3><a href="#" className="name">小星星</a>对《最好的我们》的评论：<p className="myPl">小说太好看了，坐等更新！</p></h3>
            <ul className="timeAndreply">
              <li className="time">2016-07-15 16:04</li>
              <li className="replyBtn">回复(20)</li>
            </ul>
            <div className="reply-rect">
              <textarea></textarea>
            </div>
          </dd>
        </dl>
      </div>
    )
  }

  getMyReply() {
    return (
      <div className="infocenter-plCon">
        <dl className="pl-list">
          <dt className="tx"><Avatar url={''}/></dt>
          <dd className="rightBox">
            <h3><a href="#" className="name">小星星</a>对《最好的我们》的评论：<p className="myPl">小说太好看了，坐等更新！</p></h3>
            <ul className="timeAndreply">
              <li className="time">2016-07-15 16:04</li>
              <li className="replyBtn">回复(20)</li>
            </ul>
            <div className="reply-rect">
              <textarea></textarea>
            </div>
          </dd>
        </dl>
      </div>
    )
  }

  judgeCut() {
    if(this.state.cutState == 0){
      return this.getInform();
    }else if(this.state.cutState == 1){
      return this.getComment();
    }else if(this.state.cutState == 2){
      return this.getMyReply();
    }
  }

  render() {
    let { display } = this.props;
    return (
      <div className="infocenter" style={{display:display?'block': 'none'}}>
        <ol className="cut-btnRect">
          <li className={this.state.cutState == 0? 'on': ''} onClick={() => this.setState({cutState: 0})}>通知</li>
          <li className={this.state.cutState == 1? 'on': ''} onClick={() => this.setState({cutState: 1})}>评论</li>
          <li className={this.state.cutState == 2? 'on': ''} onClick={() => this.setState({cutState: 2})}>我的回复</li>
        </ol>
        {this.judgeCut()}
      </div>
    );
  }
}