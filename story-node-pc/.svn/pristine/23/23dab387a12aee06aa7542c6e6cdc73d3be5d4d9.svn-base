import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetch, { post } from '../../../utils/fetch';
import {
  updateLoginModalState
} from '../../../actions/commonActions';
import queryString from 'query-string';
import Header from '../../../components/Header';

export default class IntroSip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      twoCode: 0,
      transpond: 0,
      position: 0,
      y: 0
    }
  }

  componentDidMount() {
    let query = queryString.parse(location.search);
    this.setState({
      position: (query.position || 0) - 0
    });

    this.setState({
      y: window.scrollY
    });

    window.onscroll = () => {
      Header.headControl();
      this.onScroll();
    }
  }

  onScroll() {
    let y = window.scrollY;
    this.setState({ y });

    if (y < (window.catalogTop - 100)) {
      this.setState({ position: 0 });
    } else if (y > (window.commentTop - 300)) {
      this.setState({ position: 2 });
    } else {
      this.setState({ position: 1 });
    }
  }

  componentWillUnmount() {
    window.onscroll = Header.headControl;
  }

  skipPosition(position) {
    this.setState({position});
    let query = queryString.parse(location.search);
    query.position = position;
    this.scrollTo(position);
    this.context.router.push('/story/' + this.props.params.storyId + '?' + queryString.stringify(query));
  }

  scrollTo(position) {

    if (position === 0) {
      window.scrollTo(0, 610);
    } else if (position === 1) {
      window.scrollTo(0, window.catalogTop - 100)
    } else if (position === 2) {
      window.scrollTo(0, window.commentTop - 300)
    }
  }

  getNavStyle() {
    let { y } = this.state;
    if (y > 610) {
      return {
        position: 'fixed',
        top: '59px',
        zIndex: 100,
        background: '#fff',
        width: '680px'
      };
    }
    return {
    };
  }

  getIntroduceStyle() {
    let { y } = this.state;
    if (y > 610) {
      return {
        marginTop: '44px',
        paddingTop: '21px'
      };
    }
    return {
      paddingTop: '21px'
    };
  }

  addShelf() {
    let { dispatch, story } = this.props;

    post('/api/user/c/shelf/add/' + story.id).then(resp => {
      if (resp.status === 401) {
        console.info('用户未登录');
        dispatch(updateLoginModalState(true));
        return false;
      } else {
        console.info('加入书架成功');
        _alertCenter('加入书架成功');
      }
    });
  }

  render() {

    let { story, route, read } = this.props;
    let fireValue = story.fireValue || 0;
    let fireText = fireValue;
    let hasWan = fireValue > 9999;
    if (hasWan) {
      if (fireValue % 10000) {
        fireText = (fireValue / 10000).toFixed(1);
      } else {
        fireText = fireValue / 10000;
      }
    }

    let introduce = '<p>' + (story.introduce || '').replace(/\n+/g, '</p><p>').replace(/\s*/g, '') + '</p>';

    return (
      <div className="intro">
        <div className="intro-sip">
          <a href={'/story/reading/' + read.storyId + '/' + read.volumeId + '/' + read.chapterId} target="_blank">
            <img src={story.cover} className="bookImg"/>
          </a>
          <div className="intro-wz">
            <div className="fire-value">
              <div className="fv-count"><em>{fireText}</em><span style={{display: hasWan ? 'inline' : 'none'}}>万</span></div>
              <div className="fv-label">火力值</div>
            </div>
            <h2 className="booxName" title={story.name}>{story.name}</h2>
            <span className="authorName">{story.author}</span>
            <em className="classify">分类：{story.type}</em>
            <em className="lab">标签：{story.tag}</em>
            <em className="worNum">字数：{story.wordNumber}字</em>
            <p className="state">更新状态：{story.latestChapterTime}&nbsp;更新至{story.latestChapter}！</p>
            <dl className="btn-list">
              <dt>
                <a href="javascript:void(0)" onClick={this.addShelf.bind(this)}>加入书架</a>
                <a href={'/story/reading/' + read.storyId + '/' + read.volumeId + '/' + read.chapterId} target="_blank">立即阅读</a>
              </dt>
              <dd>
                <div className="twoCode" onMouseEnter={() => this.setState({twoCode: 1})} onMouseLeave={() => this.setState({twoCode: 0})}>
                  <span className="tCBox" style={{display: this.state.twoCode == 0? 'none': 'block'}}><img src={route.CDN + '/assets/images/qrcode.jpg'} alt=""/></span>
                </div>
                {
                //   <div className="transpond" onMouseEnter={() => this.setState({transpond: 1})} onMouseLeave={() => this.setState({transpond: 0})}>
                //   <span className="tBox" style={{display: this.state.transpond == 0? 'none': 'block'}}>
                //     <em className="weixin"></em>
                //     <em className="weibo"></em>
                //     <em className="qq"></em>
                //   </span>
                // </div>
                }
              </dd>
            </dl>
          </div>
        </div>
        <div className="intro-con">
          <ul style={this.getNavStyle()}>
            <li 
              onClick={this.skipPosition.bind(this, 0)} 
              className={'win-head' + (this.state.position === 0 ? ' on' : '')}>简介</li>
            <li 
              onClick={this.skipPosition.bind(this, 1)} 
              className={'win-head' + (this.state.position === 1 ? ' on' : '')}>目录</li>
            <li 
              onClick={this.skipPosition.bind(this, 2)} 
              className={'win-head' + (this.state.position === 2 ? ' on' : '')}>评论</li>
          </ul>
          <div className="introduce" 
            dangerouslySetInnerHTML={{__html: introduce}} 
            style={this.getIntroduceStyle()}></div>
        </div>
      </div>
    )
  }
}

IntroSip.contextTypes = {
  router: React.PropTypes.object.isRequired
};