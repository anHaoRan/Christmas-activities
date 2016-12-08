import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/Menu';

import Popularity from './home/Popularity';
import Slider from './home/Slider';
import Recommend from './home/Recommend';
import Infor from './home/Infor';
import RecomBook from './home/RecomBook';
import GirlRecomBook from './home/GirlRecomBook';
import BoyRecomBook from './home/BoyRecomBook';
import UpDateRank from './home/UpDateRank';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      fixation: 0
    };
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.index.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.index.disabled = true;
  }

  render() {
    let { route } = this.props;
    let cdn = route.CDN;
    return (
      <div>
        <link rel="stylesheet" href={cdn + '/assets/styles/index.min.css'}/>
        <Menu />
        <div className="hotr-wrap" id='hotr-wrap'>
          <div className="wrap-top">
            <Popularity />
            <div className="wrap-rightbox">
              <Slider />
              <Recommend />
            </div>
          </div>
          <div className="wrap-bottom">
            <div className="downloadRect">
              <a href="/download" target="_blank">
                <ul className="download-linkRect">
                  <li className="linkRect-list">电脑下载IOS版</li>
                  <li className="linkRect-list">电脑下载Andriod版</li>
                </ul>
                <div className="phone-log"></div>
                <ol className="twoCode">
                  <li>扫描二维码下载客户端</li>
                  <li><img src={cdn + '/assets/images/qrcode.jpg'} /></li>
                </ol>
              </a>
            </div>
            <Infor />
          </div>
        </div>
        <div className="fire-recom">
          <RecomBook />
        </div>
        <div className="column girl-column">
          <GirlRecomBook/>
        </div>
        <div className="column boy-column">
         <BoyRecomBook />
        </div>
        <div className="update">
          <h2 className="update-title"><i></i>更新榜</h2>
          <UpDateRank />
        </div>
      </div>
    );
  }
}

export default connect()(Index);