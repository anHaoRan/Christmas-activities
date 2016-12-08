import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  updateCurrentStory
} from '../../actions/detailsActions';
import {
  updateCurrentUser,
  updateLoginModalState
} from '../../actions/commonActions';
import Menu from '../../components/Menu';
import fetch, { post } from '../../utils/fetch';
import IntroSip from './details/IntroSip';
import Award from './details/Award';
import Catalog from './details/Catalog';
import CommentListRect from './details/CommentListRect';
import AuthorExplain from './details/AuthorExplain';
// import FansRank from './details/FansRank';
import GuessLick from './details/GuessLick';

const FetchUserInfo = (dispatch, Fetch) => {
  return Fetch('/api/auth/user?t=' + (new Date - 0), {}).then(resp => {
    return dispatch(updateCurrentUser(resp.data || {}));
  });
}

class Details extends Component {

  static fetchData(dispatch, Fetch = fetch, query, params) {
    let { storyId } = params;
    return Fetch('/api/details/c/story/' + storyId + '/detail').then(resp => {
      return dispatch(updateCurrentStory(resp.data));
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      storyLoaded: false,
      commentTamp: 1,
      read: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.storyLoaded && nextProps.story.id) {
      this.setState({
        storyLoaded: true
      });
    }
  }

  componentDidMount() {
    let {params, dispatch} = this.props;
    Details.fetchData(this.props.dispatch, fetch, {}, params);
    // 统计
    fetch('/api/collect/story?storyId=' + params.storyId);
    fetch('/api/details/reading/' + params.storyId).then(resp => {
      this.setState({
        read: resp || {}
      });
    })
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.details.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.details.disabled = true;
    let { dispatch } = this.props;
    dispatch(updateCurrentStory({}));
  }

  reloadDetail(storyId) {
    let { story } = this.props;
    if (story.id !== storyId) {
      _loading();
      Details.fetchData(this.props.dispatch, fetch, {}, {storyId})
        .then(resp => {
          _loading(1);
        });
    }
  }

  addComment() {
    let { story, dispatch } = this.props;
    let content = this.refs.comment.value.trim();
    post('/api/user/comment/add', {
      body: {
        storyId: story.id,
        title: '发表评论',
        content
      }
    }).then(resp => {
      console.log(resp);
      this.refs.comment.value = '';
      if (resp.status === 401) {
        console.info('用户未登录');
        dispatch(updateLoginModalState(true));
        return false;
      } else {
        _alertCenter('评论成功');
        FetchUserInfo(dispatch, fetch);
        this.setState({
          commentTamp: this.state.commentTamp + 1
        });
      }
    })
  }

  render() {
    let { route } = this.props;
    let { storyLoaded, read } = this.state;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/details.min.css'}/>
        <Menu />
        <div className="details-main">
          <div className="details">
            { storyLoaded ? <IntroSip read={read} {...this.props}/> : <br /> }
            { storyLoaded ? <Award read={read} {...this.props}/> : <br /> }
            { storyLoaded ? <Catalog read={read} {...this.props}/> : <br /> }
            <div className="comment-rect">
              <div className="comment-txt">
                <textarea ref="comment"></textarea>
              </div>
              <span className="comment-btn" onClick={this.addComment.bind(this)}>发表评论</span>
            </div>
            <div className="commentList-rect">
              <CommentListRect read={read} commentTamp={this.state.commentTamp} {...this.props}/>
            </div>
          </div>
          <div className="main-right">
            { storyLoaded ? <AuthorExplain read={read} {...this.props}/> : <br /> }
            { storyLoaded ? <GuessLick read={read} reloadDetail={this.reloadDetail.bind(this)} {...this.props} /> : <br /> }
            {/*<FansRank {...this.props} />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.common.user,
      story: state.details.currentStory
    };
  }
)(Details);