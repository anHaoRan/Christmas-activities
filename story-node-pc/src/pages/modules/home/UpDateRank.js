import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import {
  updateFreeBookList,
  updateVipBookList
} from '../../../actions/homeActions';
import Q from 'q';
import { time2str } from '../../../utils'

class UpDateRank extends Component {

  static fetchData(dispatch, Fetch = fetch) {
    return Q.all([
     Fetch('/api/home/update/freebook').then(resp => {
       return dispatch(updateFreeBookList(resp.data));
     }),Fetch('/api/home/update/vipbook').then(resp => {
       return dispatch(updateVipBookList(resp.data));
     })
   ]);
  }

  constructor(props) {
    super(props);
    this.state = {
      type: 0
    }
  }

  componentDidMount() {
    let { dispatch } = this.props;
    UpDateRank.fetchData(dispatch);
  }

  getFreeBook() {
    let { freeBookList } = this.props;
    return (
      <ul className="bookRect">
        <li className="list-title"><span className="num">序号</span><span className="type">分类</span><span className="bookName">小说名称</span><span className="chapter">更新章节</span><span className="author">作者</span><span className="time">最新更新时间</span></li>
        {
          map(freeBookList, (book,i) => {
            return (
              <li key={i}>
                <Link to={'/story/' + book.story.idStr}>
                  <span className="num">{(i+1)<10?'0'+(i+1):(i+1)}</span>
                  <span className="type">[{book.story.type}]</span>
                  <span className="bookName">{book.story.name}</span>
                  <span className="chapter">{book.story.latestChapter}</span>
                  <span className="author">{book.story.author}</span>
                  <span className="time">{time2str(book.story.latestChapterTime)}</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    )
  }

  getVipBook() {
    let { vipBookList } = this.props;
    return (
      <ul className="bookRect">
        <li className="list-title"><span className="num">序号</span><span className="type">分类</span><span className="bookName">小说名称</span><span className="chapter">更新章节</span><span className="author">作者</span><span className="time">最新更新时间</span></li>
        {
          map(vipBookList, (book,i) => {
            return (
              <li key={i}>
                <Link to={'/story/' + book.story.idStr}>
                  <span className="num">{(i+1)<10?'0'+(i+1):(i+1)}</span>
                  <span className="type">[{book.story.type}]</span>
                  <span className="bookName">{book.story.name}<i className="vip-logo"></i></span>
                  <span className="chapter">{book.story.latestChapter}</span>
                  <span className="author">{book.story.author}</span>
                  <span className="time">{time2str(book.story.latestChapterTime)}</span>
                </Link>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div>
        <ol className="update-cutBtn">
          <li onClick={() => {this.setState({type: 0})}} className={this.state.type === 0? "cutBtn-list win-head on" : 'cutBtn-list win-head'}>最新免费小说更新<p></p></li>
          <li onClick={() => {this.setState({type: 1})}} className={this.state.type === 1? "cutBtn-list win-head on" : 'cutBtn-list win-head'}>最新VIP小说更新<p></p></li>
        </ol>
        { this.state.type === 0 ? this.getFreeBook() : this.getVipBook() }
        <p className="more-book"><Link to={'/library?option=' + this.state.type}>更多优秀小说</Link></p>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      freeBookList: state.home.freeBookList,
      vipBookList: state.home.vipBookList
    };
  }
)(UpDateRank);