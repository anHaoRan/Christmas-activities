import React, { Component } from 'react';
import { Link } from 'react-router';
export default class Subject extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (typeof(document.onselectstart) != "undefined") {        
      document.onselectstart = function () {
        return false;
      };
    } else {
      document.onmousedown = function () {
        return false;
      };
      document.onmouseup = function () {
        return true;
      };
    }
    document.oncontextmenu = function () {
      return false;
    }
  }

  componentWillUnmount() {
    if (typeof(document.onselectstart) != "undefined") {        
      document.onselectstart = function () {
      };
    } else {
      document.onmousedown = function () {
      };
      document.onmouseup = function () {
      };
    }
    document.oncontextmenu = function () {
    }
  }

  getPayDetail(user, price) {
    if (user && user.id) {
      let total = user.goldAmount - 0 + user.giveAmount;
      let arr = [
        <p key={0}>火星币余额<span>{user.goldAmount}</span>火星币</p>,
        <p key={1}>火星券余额<span>{user.giveAmount}</span>火星券</p>,
        total < price ? (<Link className="button" key={2} to="/pay">余额不足，充值并购买</Link>) : (<button className="button" key={2} onClick={this.buyChapter.bind(this)}>立即购买</button>)
      ];
      return arr;
    }
    return (
      <button className="button" onClick={this.openLoginModal.bind(this)}>请登录</button>
    );
  }

  buyChapter() {
    let { current } = this.props;
    this.props.buyChapter(current.chapter.id);
  }

  openLoginModal() {
    this.props.openLoginModal();
  }
  
  getPay(){
    let { current, fontSize, user, content, buyed } = this.props;
    let { chapter } = current;
    if (chapter.isPay && !buyed) {
      return (
        <div className='subject_main'>
            <div className="paidRecharge">
                <h2>
                   {chapter.name}
                </h2>
                <div className="paidRecharge_content">
                   <h3>本章为付费章节</h3>
                   <p>字数<span>{chapter.wordNumber}</span></p>
                   <p>价格<span>{chapter.price}</span>火星币</p>
                   {this.getPayDetail(user, chapter.price)}
                </div>
            </div>
          </div>
      );
    }

    let contentFormat = '<p>' + content.replace(/\n+/g, '</p><p>').replace(/\s*/g, '') + '</p>';

    return (
      <div className='subject_main' id="SubjectContent">
        <div className="_main_header" id="header">
          <h2>{chapter.name}</h2>
        </div>
        <div className="main_content"
          style={{
            fontSize: fontSize, 
            MozUserSelect: 'none', 
            WebkitUserSelect: 'none', 
            userSelect: 'none',
            paddingBottom: '30px',
          }}
          dangerouslySetInnerHTML={{__html: contentFormat}}></div>
      </div>
    );
  }

  toggleAutoBuy(){
    let { user } = this.props;
    this.props.toggleAutoBuy(1 - (user.autoPayChapter || 0));
  }
  
  render() {
    let { user } = this.props;
    return (
      <div className="subject" id="contnet_box">
        <div className="signOut" id="signOut">
          <Link to={"/story/" + this.props.storyId}> &lt;退出阅读 </Link>
        </div>
        <div className="subject_top">
          <div className="checkboxFive">
            <div 
              style={{position: 'relative',top: '2px'}} 
              className={'checkboxDiv' + (user.autoPayChapter ? " active" : "")} 
              onClick={this.toggleAutoBuy.bind(this)}></div>
            <span className="autoPurchase">自动购买下一章</span>
          </div>
          {
          //   <div className="meun">
          //   <Link to={'/story/' + this.props.storyId + '&position=2'}>评论<span className="_red">168</span></Link>
          // </div>
          }
          <Link className="reward" to={'/story/' + this.props.storyId + '?award=2'}>打赏</Link>
          {
            // <a href="javascript:;" className="share"></a>
          }
        </div>
        {this.getPay()}
      </div>
    )
  }
}