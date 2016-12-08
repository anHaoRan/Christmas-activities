import React, { Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import fetch from '../utils/fetch';
import Avatar from '../components/Avatar';

const TYPE_ARR = ['人气榜', '收藏榜', '推荐榜', '月票榜', '新书榜', '土豪榜'];
const SCOPE_CLASS = ['girlBg', 'boyBg'];
const GIRL_COLUMN = [6261, 6262, 6263, 6264, 6265, 6266];
const BOY_COLUMN = [6161, 6162, 6163, 6164, 6165, 6166];
const COLUMN = [GIRL_COLUMN, BOY_COLUMN];

export default class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      current: 0,
      range: ['日', '周', '月', '总'],
      hover: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scope !== nextProps.scope) {
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

  fetchContent(current) {
    this.setState({current});
    if (current === 3) {
      current = 0;
    } else {
      current += 1;
    }
    let { scope, type, size } = this.props;
    let column = COLUMN[scope][type];
    let url = '/api/rank/c/ranking/page?novelColumn=' + column + '&timeType=' + current + '&pageSize=' + (size || 10);
    if (type === 5) {
      url = '/api/rank/c/ranking/tuhao/page?novelColumn=' + column + '&timeType=' + current + '&pageSize=' + (size || 10);
    }
    fetch(url)
      .then(resp => {
        this.setState({
          list: resp.data.list
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
    let { title, paddingTop, scope, type, size, border, local } = this.props;
    let { current, list, range } = this.state;
    return (
      <div className="ranking" style={{paddingTop: (paddingTop || 0) + 'px'}}>
        <h2 className="rankTitle">
          {title || TYPE_ARR[type]}
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
                return (<em 
                  style={{display}}
                  key={index}
                  className={current === index ? 'on': ''} 
                  onClick={this.fetchContent.bind(this, index)}>{item}</em>);
              })
            }
          </span>
        </h2>
        <dl style={this.getHeight()}>
          {
            map(list.slice(0, size), (item, index) => {
              let count = index + 1;
              return (
                <dd key={index} 
                  style={{borderBottom: border ? '1px solid #e6e5e5': 'none'}} 
                  className={ this.state.hover === index ? 'on' : '' } 
                  onMouseOver={()=> this.setState({hover: index})} >

                  <Link to={'/story/' + item.story.id} className={"rectBg " + SCOPE_CLASS[scope]}>
                    <em className="num">{count < 10 ? '0' + count : count}</em>
                    <img src={item.story.cover} />
                    <h3 className="bookName">{item.story.name}</h3>
                    <p className="author">{item.story.author}</p>
                  </Link>
                </dd>
              );
            })
          }
          <dt className="more">
            {
              local ? 
              (<a href="javascript:void(0)" onClick={() => {
                this.props.onDetail({
                  scope,
                  type: type + 1
                });
              }}>查看更多</a>)
              :
              (<Link to={'/chart?scope=' + scope + '&type=' + (type + 1)}>查看更多</Link>)
            }
          </dt>
        </dl>
      </div>
    );
  }

  generateTuhaoRank() {
    let { scope, type, size, border, local } = this.props;
    let { current, list, range } = this.state;
    return (
      <div className="smallWealthy">
        <h2 className="rankTitle">
          土豪榜
          <span>
            {
              map(range, (item, index) => {
                let display = 'block';
                if (index === 0) {
                  display = 'none';
                }
                return (<em 
                  style={{display}}
                  key={index}
                  className={current === index ? 'on': ''} 
                  onClick={this.fetchContent.bind(this, index)}>{item}</em>);
              })
            }
          </span>
        </h2>
        <dl style={this.getHeight()}>
          {
            map(list.slice(0, size), (item, index) => {
              let count = index + 1;
              return (
                <dd key={index} 
                  style={{borderBottom: border ? '1px solid #e6e5e5': 'none'}} 
                  className={ this.state.hover === index ? 'on' : '' } 
                  onMouseOver={()=> this.setState({hover: index})} >

                  <a href="javascript:void(0)" className={'rectBg ' + SCOPE_CLASS[scope]}>
                    <em className="num">{count < 10 ? '0' + count : count}</em>
                    <Avatar url={item.faceAddress} />
                    <h3 className="name">{item.name}</h3>
                    <p className="money">土豪值：{item.topValue}</p>
                  </a>
                </dd>
              );
            })
          }
          <dt className="more">
            {
              local ? 
              (<a href="javascript:void(0)" onClick={() => {
                this.props.onDetail({
                  scope,
                  type: type + 1
                });
              }}>查看更多</a>)
              :
              (<Link to={'/chart?scope=' + scope + '&type=' + (type + 1)}>查看更多</Link>)
            }
          </dt>
        </dl>
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