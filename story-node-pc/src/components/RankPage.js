import React, { Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import { time2str } from '../utils';
import fetch from '../utils/fetch';
import Avatar from '../components/Avatar';
import Pagination from '../components/Pagination';

const TYPE_ARR = ['人气榜', '收藏榜', '推荐榜', '月票榜', '新书榜', '土豪榜'];
const SCOPE_CLASS = ['girlBg', 'boyBg'];
const GIRL_COLUMN = [6261, 6262, 6263, 6264, 6265, 6266];
const BOY_COLUMN = [6161, 6162, 6163, 6164, 6165, 6166];
const COLUMN = [GIRL_COLUMN, BOY_COLUMN];
const Portrait = ['champion','runner-up','third'];
const HOVER_CLASS = ['grilhover', 'boyhover'];

export default class RankPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNo: 0,
      totalPages: 0,
      current: 0,
      range: ['日', '周', '月', '总'],
      hover: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scope !== nextProps.scope || this.props.type !== nextProps.type) {
      setTimeout(() => {
        this.search();
      }, 100);
    }
  }

  componentDidMount() {
    this.search();
  }

  search() {
    let { type } = this.props;
    let current = 1; // 默认周月总，取【月】
    // 月票榜，只取【月】
    if (type === 3) {
      current = 2; // (2 + 1 === 3)
    } else if (type === 4) { // 新书榜，日月周，取【日】
      current = 0;
    }
    this.fetchContent(current);
  }

  fetchContent(current, pageNo=1) {
    this.setState({current});
    if (current === 3) {
      current = 0;
    } else {
      current += 1;
    }
    let { scope, type } = this.props;
    let column = COLUMN[scope][type];

    let url = '/api/rank/c/ranking/page?novelColumn=' + column + '&timeType=' + current + '&pageNo=' + pageNo + '&pageSize=20';
    if (type === 5) {
      url = '/api/rank/c/ranking/tuhao/page?novelColumn=' + column + '&timeType=' + current + '&pageNo=' + pageNo + '&pageSize=20';
    }

    fetch(url)
      .then(resp => {
        this.setState({
          list: resp.data.list,
          pageNo: resp.data.pageNo,
          totalPages: resp.data.totalPages
        });
      });
  }

  getHeight() {
    let { size } = this.props;
    let H = (size - 1) * 44 + 90 + 46 + 2;
    return {
      height: H + 'px'
    }
  }

  generateNormalRank() {
    let { scope, type} = this.props;
    let { current, list, range } = this.state;
    return (
      <div className="chrat-rect">
        <div className="restsChrat on">
          <div className="restsChrat-title">
            <h2 className="rankTitle">
              {TYPE_ARR[type]}
            </h2>
            <span style={{display: type !== 3 ? 'block' : 'none'}}>
              {
                map(range, (item, index) => {
                  let display = 'block';
                  // 新书榜没【总】
                  if (index === 3 && type === 4) {
                    display = 'none';
                  } else if (index === 0 && type !== 4) {
                    // 其他没有【日】
                    display = 'none';
                  }
                  return (<a
                    href="javascript:void(0)"
                    style={{display}}
                    key={index}
                    className={current === index ? 'on': ''} 
                    onClick={this.fetchContent.bind(this, index, 1)}>{item}</a>);
                })
              }
            </span>
          </div>
          <ul className="restsChrat-list">
            <li className="list-title">
              <span className="num">序号</span>
              <span className="type">分类</span>
              <span className="bookNameBox">小说名称</span>
              <span className="newChapter">更新章节</span>
              <span className="author">作者</span>
              <span className="time">最新更新时间</span>
            </li>
            {
              map(list, (item, index) => {
                let story = item.story || {};
                return (
                  <li className={HOVER_CLASS[scope]} key={index}>
                    <Link to={"/story/" + story.id}>
                      <span className="num">{index + 1}</span>
                      <span className="type">{story.type}</span>
                      <span className="bookNameBox">
                        <h2 className="bookName">{story.name}</h2>
                        <i className={story.isPay == 1 ? "vip-logo" : "" }></i>
                      </span>
                      <span className="newChapter">{story.latestChapter}</span>
                      <span className="author">{story.author}</span>
                      <span className="time">{time2str(story.latestChapterTime)}</span>
                    </Link>
                  </li>
                );
              })
            }
          </ul>
          <Pagination onPageChange={(page) => {
            this.fetchContent(this.state.current, page);
          }} page={this.state.pageNo + 1} totalPages={this.state.totalPages} />
        </div>
      </div>
    );
  }

  generateTuhaoRank() {
    let { scope, type } = this.props;
    let { current, list, range } = this.state;
    return (
      <div className="chrat-rect">
        <div className="wealthy on">
          <div className="wealthy-title">
            <h2 className="rankTitle">
              土豪榜
            </h2>
            <span>
              {
                map(range, (item, index) => {
                  let display = 'block';
                  if (index === 0) {
                    display = 'none';
                  }
                  return (<a 
                    href="javascript:void(0)"
                    style={{display}}
                    key={index}
                    className={current === index ? 'on': ''} 
                    onClick={this.fetchContent.bind(this, index, 1)}>{item}</a>);
                })
              }
            </span>
          </div>
          <ul className="wealthy-list">
            <li className="list-title">
              <span>排名</span>
              <span>头像</span>
              <span>昵称</span>
              <span>土豪值</span>
            </li>
            {
              map(list, (item, index) => {
                return (
                  <li className={HOVER_CLASS[scope]} key={index}>
                    <span>{item.topNum}
                      <i style={{display: this.state.pageNo === 0 ? 'block' : 'none'}} className={Portrait[index]}></i>
                    </span>
                    <span><Avatar url={item.faceAddress}/></span>
                    <span>{item.name}</span>
                    <span>{item.topValue}</span>
                  </li>
                );
              })
            }
          </ul>
          <Pagination onPageChange={(page) => {
            this.fetchContent(this.state.current, page);
          }} page={this.state.pageNo + 1} totalPages={this.state.totalPages} />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.type === 5) {
      return this.generateTuhaoRank();
    }
    return this.generateNormalRank();
  }
}