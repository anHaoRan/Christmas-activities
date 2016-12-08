import React, { Component } from 'react';
import Menu from '../../components/Menu';

export default class Download extends Component {

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.download.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.download.disabled = true;
  }

  constructor(props) {
    super(props);
  }

  render() {
    let { route } = this.props;
    let cdn = route.CDN;
    return (
      <div>
        <link rel="stylesheet" href={cdn + '/assets/styles/download.min.css'}/>
        <Menu />
        <div className="download-Box">
          <div className="download-main">
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="iphone">
              <img src={cdn + '/assets/images/qrcode.jpg'} />
            </div>
            <div className="main-right">
              <h2 className="APPName">火星小说APP</h2>
              <p className="info">全新最全免费掌阅小说<br />90后必备追书神器</p>
              <dl className="download-Rect">
                <dt className="download-Way">下载方式</dt>
                <dd className="iphone-wayRect">
                  <p className="wayName iphone-wayName">iphone</p>
                  <ol>
                    <li>1.扫码左侧二维码下载</li>
                    <li>2.在App Store中搜索“火星小说”下载</li>
                    <li>3.点击“iPhone下载”按钮直接用电脑下载</li>
                  </ol>
                  <a target='_blank' href="https://itunes.apple.com/zh/app/du-yao-xiao-shuo/id1060018265?l=zh&mt=1" className="download-btn">iPhone下载</a>
                </dd>
                <dd className="Android-wayRect">
                  <p className="wayName Android-wayName">Android</p>
                  <ol>
                    <li>1.扫码左侧二维码下载</li>
                    <li>2.在各大应用市场中搜索“火星小说”下载</li>
                    <li>3.点击“Andriod下载”按钮直接用电脑下载</li>
                  </ol>
                  <a target='_blank' href="http://s.duyao001.com/static/apk/PoisonNovel.apk" className="download-btn">Android下载</a>
                </dd>
              </dl>
              <div className="wapEntrance">
                <div className="twoCode-Rect">
                  <img src={cdn + '/assets/images/qrcode-wap.jpg'} />
                </div>
                <p className="sent">访问手机web站<br />手机浏览器访问:hotread.com</p>
              </div>
            </div>
          </div>
          <div className="wave-Box"></div>
        </div>
      </div>
    );
  }
}