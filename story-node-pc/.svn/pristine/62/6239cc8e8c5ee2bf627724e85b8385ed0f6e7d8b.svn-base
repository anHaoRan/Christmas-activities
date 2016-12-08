import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch, {post} from '../../../utils/fetch';
import Avatar from '../../../components/Avatar';
import queryString from 'query-string';
import {
  updateCurrentUser,
  updateLoginModalState
} from '../../../actions/commonActions';
import Pagination from '../../../components/Pagination';

export default class CommentListRect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      list: [],
      pageNo: 0,
      totalPages: 0,
      replyIndex: -1
    }
  }

  componentWillReceiveProps(nextProps) {
    let oldStory = this.props.story;
    let newStory = nextProps.story;
    if (oldStory.id !== newStory.id) {
      this.getCommentsList({storyId: newStory.id});
    }
    if (this.props.commentTamp !== nextProps.commentTamp) {
      this.getCommentsList({storyId: newStory.id});
    }
  }

  getCommentsList(params) {
    return fetch('/api/details/c/story/comment/page?storyId=' + params.storyId + '&pageNo=' + (params.pageNo || 1) + '&pageSize=10')
      .then(resp => {
        this.setState({
          list: resp.data.list,
          pageNo: resp.data.pageNo,
          totalPages: resp.data.totalPages
        });
      });
  }

  getActComments(params) {
    return fetch('/api/details/c/story/actComment/page?pageSize=5&resourceId=' + params.resourceId + '&pageNo=' + params.pageNo)
      .then(resp => {
        let { list } = this.state;
        let comment = list[params.index] || {};
        comment.actCommentPage = resp.data;
        list[params.index] = comment;
        this.setState({
          list
        });
      });
  }

  componentDidMount() {
    let query = queryString.parse(location.search);
    let { params } = this.props;
    let detailCommentBox = document.getElementById('detailCommentBox');
    window.commentTop = detailCommentBox.offsetTop;

    if (query.position == 2) {
      setTimeout(() => {
        window.scrollTo(0, window.commentTop - 260);
      }, 500)
    }

    this.getCommentsList(params)
      .then(() => {
        window.commentTop = detailCommentBox.offsetTop;

        if (query.position == 2) {
          setTimeout(() => {
            window.scrollTo(0, window.commentTop - 260);
          }, 800)
        }

      });
  }

  toggleReply(index) {
    let { replyIndex } = this.state;
    replyIndex = (replyIndex === index) ? -1 : index;
    this.setState({
      replyIndex
    });
  }

  doReply(target, comment, index) {
    let { dispatch } = this.props;
    post('/api/user/actComment/add', {
      body: {
        resourceId: comment.id,
        resUserId: comment.userId,
        commentId: 0,
        commentUserId: 0,
        content: target.content.value.substr(0, 500)
      }
    })
    .then(resp => {
      if (resp.status === 401) {
        console.info('用户未登录');
        dispatch(updateLoginModalState(true));
        return false;
      }
      // console.log(resp)
      target.content.value = '';
      this.setState({replyIndex: -1});
      _alertCenter('回复成功', '', '', 2000);
      this.getActComments({
        index: index - 1,
        resourceId: comment.id,
        pageNo: 1
      });
    });
  }

  doReplyOfReply(target, comment, index) {
    let { dispatch } = this.props;
    post('/api/user/actComment/add', {
      body: {
        resourceId: comment.resourceId,
        resUserId: comment.resUserId,
        commentId: comment.id,
        commentUserId: comment.userId,
        content: target.content.value.substr(0, 500)
      }
    })
    .then(resp => {
      if (resp.status === 401) {
        console.info('用户未登录');
        dispatch(updateLoginModalState(true));
        return false;
      }
      // console.log(resp)
      target.content.value = '';
      this.setState({replyIndex: -1});
      _alertCenter('回复成功', '', '', 2000);
      this.getActComments({
        index: index - 1,
        resourceId: comment.resourceId,
        pageNo: 1
      });
    });
  }

  getReply(index, comment) {
    let { replyIndex } = this.state;
    return (
      <form style={{display: replyIndex === index ? 'block' : 'none'}} className="reply-rect" onSubmit={(evt) => {
        evt.preventDefault();
        this.doReply(evt.target, comment, index);
      }}>
        <textarea name="content"></textarea>
        <div style={{textAlign: 'right'}}>
          <input type="submit" className="send-btn" value="发送" />
        </div>
      </form>
    );
  }

  getReplyOfReply(index, comment, parentIndex) {
    let { replyIndex } = this.state;
    return (
      <form style={{display: replyIndex === index ? 'block' : 'none', margin: '10px 0', background: 'transparent'}} className="reply-rect reply-of-reply" onSubmit={(evt) => {
        evt.preventDefault();
        this.doReplyOfReply(evt.target, comment, parentIndex);
      }}>
        <textarea name="content"></textarea>
        <div style={{textAlign: 'right'}}>
          <input type="submit" className="send-btn" value="发送" />
        </div>
      </form>
    );
  }

  getReplyList(parentIndex, actCommentPage, resourceId) {
    let {
      list,
      pageNo,
      totalPages
    } = actCommentPage;
    return (
      <div style={{display: list.length ? 'block' : 'none'}} className="replyOfReply">
        {
          map(list, (comment, index) => {
            let _index = parentIndex * 10 + '-' + (index + 1);
            return (
              <div key={index} className="reply-list">
                <Avatar url={comment.headImage} className="userPortrait" />
                <h2 className="userName">
                  <a href="javascript:void(0)" style={{cursor: 'default'}}>{comment.nickName}</a>
                  <span style={{display: (comment.commentUserId == 0 ? 'none' : 'inline')}}>
                    回复
                    <a href="javascript:void(0)" style={{cursor: 'default'}}>{comment.commentUserName}</a>
                  </span>
                </h2>
                <p className="reply-sent">{comment.commentContext}</p>
                <div style={{overflow: 'hidden', margin: '10px 0'}}>
                  {
                    // <em className="praise"><i className="no-heart"></i><span>(0)</span></em>
                  }
                  <em className="reply" onClick={this.toggleReply.bind(this, _index)}>回复</em>
                </div>
                {this.getReplyOfReply(_index, comment, parentIndex)}
              </div>
            );
          })
        }
        <Pagination onPageChange={(page) => {
          this.getActComments({
            resourceId: resourceId,
            pageNo: page,
            index: parentIndex - 1
          });
        }} page={pageNo + 1} totalPages={totalPages} small={true}/>
      </div>
    );
  }

  render() {
    let { list } = this.state;
    return (
      <div className="comment-box" id="detailCommentBox">
        {
          map(list, (item, index) => {
            let isDing = item.type == 1 || item.type == 3;
            let isJing = item.type == 2 || item.type == 3;
            return (
              <dl key={index} className="comment-list">
                <dt className="list-tx"><Avatar url={item.headImage} /></dt>
                <dd>
                  <h2><a href="javascript:void(0)" style={{cursor: 'pointer'}}>{item.nickname}</a></h2>
                  <p className="con-sent">{item.commentBody}</p>
                  <ul>
                    <li>
                      <span className="time">{item.createDateStr}</span>
                      <i className="ding" style={{display: isDing ? 'block' : 'none'}}></i>
                      <i className="jing" style={{display: isJing ? 'block' : 'none'}}></i>
                    </li>
                    <li>
                    <em className="reply" onClick={this.toggleReply.bind(this, index + 1)}>回复</em>
                    {
                      // <em className="praise">
                      //   <span>(0)</span>
                      //   <i className="no-heart"></i>
                      // </em>
                    }
                    </li>
                  </ul>
                  {this.getReply(index + 1, item)}
                  {this.getReplyList(index + 1, item.actCommentPage, item.id)}
                </dd>
              </dl>
            )
          })
        }
        <Pagination onPageChange={(page) => {
          this.getCommentsList({
            storyId: this.props.story.id,
            pageNo: page
          });
        }} page={this.state.pageNo + 1} totalPages={this.state.totalPages} />
      </div>
    )
  }
}