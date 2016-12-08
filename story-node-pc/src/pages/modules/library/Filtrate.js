import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map, assign } from 'lodash';
import fetch from '../../../utils/fetch';
import {
    updateLibraryList
 } from '../../../actions/libraryActions';
import Q from 'q';
import queryString from 'query-string';
import Pagination from '../../../components/Pagination';

const DEFAULT_QUERY_PARAMS = {
  channel: 2,
  type: '全部',
  tag: '全部',
  wordNumber: '全部',
  updateTime: '全部',
  option: '全部',
};

class Filtrate extends Component {

  static fetchData(dispatch, Fetch = fetch, query) {
    let p = assign({}, DEFAULT_QUERY_PARAMS, query);
    p.pageSize = 20;
    return Q.all([
      Fetch('/api/library/c/story/search?' + queryString.stringify(p)).then(resp => {
        return dispatch(updateLibraryList(resp.data));
      })
    ]);
  }

  constructor(props, context) {
    super(props);
    this.state={
      //频道
      channel: 2,
      //分类
      type: '全部',
      //标签
      tag: '全部',
      //小说字数
      wordNumber: 0,
      //小说时间
      updateTime: 0,
      //小说选项
      option: 0,
      //小说展开收起
      zipped: true,
    }
  }

  parseQuery(query) {
    let p = assign({}, DEFAULT_QUERY_PARAMS, query);

    this.setState({
      channel: p.channel - 0,
      type: p.type,
      tag: p.tag,
      wordNumber: p.wordNumber === '全部' ? 0 : p.wordNumber - 0,
      updateTime:  p.updateTime === '全部' ? 0 : p.updateTime - 0,
      option: p.option === '全部' ? 0 : p.option - 0 + 1,
    });
  }

  componentDidMount() {
    let { dispatch } = this.props;
    let query = queryString.parse(location.search)
    this.parseQuery(query);
    Filtrate.fetchData(dispatch, fetch, query);
  }

  search(json) {
    this.setState(json);
    let current = assign({}, json);
    if (current.wordNumber === 0) {
      current.wordNumber = '全部';
    }
    if (current.updateTime === 0) {
      current.updateTime = '全部';
    }
    if (current.option === 0) {
      current.option = '全部';
    } else if (current.option > 0) {
      current.option -= 1;
    }

    let query = assign({}, DEFAULT_QUERY_PARAMS, {
      channel: this.state.channel,
      type: this.state.type,
      tag: this.state.tag,
      wordNumber: this.state.wordNumber || '全部',
      updateTime: this.state.updateTime || '全部',
      option: this.state.option ? (this.state.option - 1) : '全部',
    }, current);
    
    Filtrate.fetchData(this.props.dispatch, fetch, query);
    this.context.router.push('/library?' + queryString.stringify(query));
  }

  render() {
    let { result, filrate } = this.props;
    let { pageNo, totalPages, list } = result;
    return (
      <div>
        <div className="filtrate">
            <ul className="filtrateRect">
              <li className="filtrate-list">
                  <label className="classify">小说频道：</label>
                  {
                    map(filrate.channel,(item,index)=>{
                      return(
                       <a 
                         href="javascript:void(0)"
                         key={index} 
                         className={(2 - index) === this.state.channel ? 'on' : ''} 
                         onClick={() => {
                          this.search({channel: 2 - index, type: '全部', tag: '全部'})
                         }}
                        >{item}</a>
                      )
                    }) 
                  }
              </li>
              <li className="filtrate-list">
                  <label className="classify">小说分类：</label>
                  <div>
                  {
                    map(filrate.classification[this.state.channel],(item,index)=>{
                        return(
                          <a 
                            href="javascript:void(0)"
                            key={index}
                            className={item === this.state.type ? 'on' : ''} 
                            onClick={() => this.search({type: item})}>{item}</a>
                        )
                    })
                  }
                  </div>
              </li>
              <li className="filtrate-list">
                  <label className="classify">小说标签：</label>
                  <div id="body" className="body">
                    {
                      map(filrate.tags[this.state.channel].slice(0, this.state.zipped ? 11 : 100),(item,index)=>{
                        return(
                          <a 
                            href="javascript:void(0)"
                            key={index} 
                            className={item === this.state.tag ? 'on' : ''} 
                            onClick={() => this.search({tag: item})}>{item}</a>  
                        )
                      })  
                    }
                    <a href="javascript:void(0)" onClick={() => {
                      this.setState({
                        zipped: !this.state.zipped
                      });
                    }} className="foor">
                      {this.state.zipped ? '展开' : '收起'}
                    </a>
                  </div>
              </li>
              <li className="filtrate-list">
                  <label className="classify">小说字数：</label>
                  {
                    map(filrate.numberOfwords,(item,index)=>{
                      return(
                        <a 
                          href="javascript:void(0)"
                          key={index} 
                          className={index === this.state.wordNumber ? 'on' : ''} 
                          onClick={() => this.search({wordNumber: index})}>{item}</a>
                      )
                    })
                  }
              </li>
              <li className="filtrate-list">
                  <label className="classify">小说时间：</label>
                  {
                    map(filrate.updateTime,(item,index)=>{
                      return(
                        <a 
                          key={index} 
                          href="javascript:void(0)" 
                          className={index === this.state.updateTime ? 'on' : ''} 
                          onClick={() => this.search({updateTime: index})}>{item}</a>
                      )
                    })  
                  }
              </li>
              <li className="filtrate-list">
                  <label className="classify">小说选项：</label>
                  {
                    map(filrate.option,(item,index)=>{
                      return(
                      <a 
                      key={index}
                      href="javascript:void(0)"
                      className={index === this.state.option ? 'on' : ''} 
                      onClick={() => this.search({option: index})}>{item}</a>
                      )
                    })
                  }
              </li>
            </ul>
            <p className="msg">所有小说按照更新时间排序</p>
        </div>
        <div className="filtrate-result">
          <ul className="noData" style={{display: result.total > 0 ? 'none' : 'block'}}>
            <li className="nodata">
              <div className="img"></div>
              <span className="text">抱歉！搜索无结果</span>
            </li>
          </ul>
          <ul className="resultRect" style={{display: result.total > 0 ? 'block' : 'none'}}>
            <li className="list-title">
              <span className="type">分类</span>
              <span className="bookName">小说名称</span>
              <span className="chapter">更新章节</span>
              <span className="author">作者</span>
              <span className="time">最新更新时间</span>
            </li>
            {
              map(list,(item,index)=>{
                return(
                  <li key={index}>
                    <Link to={"/story/"+item.id}>
                      <span className="type">[{item.type}]</span>
                      <span className="bookName">
                        <h2>{item.name}</h2>
                        <i className="vip-logo" style={{display: item.isPay ? 'block' : 'none'}}></i>
                      </span>
                      <span className="chapter">{item.latestChapter}</span>
                      <span className="author">{item.author}</span>
                      <span className="time">{item.latestRevisionDate}</span>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
          <Pagination onPageChange={(page) => {
            this.search({pageNo: page});
          }} page={pageNo + 1} totalPages={totalPages} />
        </div>
      </div>
    );
  }
}

Filtrate.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(
  (state) => {
    return {
      filrate: state.library.filrateList,
      result: state.library.result
    };
  }
)(Filtrate);