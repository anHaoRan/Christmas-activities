import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/Menu';
import Information from './copyright/Information';
import WorksList from './copyright/WorksList';
import RecommendList from './copyright/RecommendList';
import Slider from './copyright/Slider';

class Copyright extends Component {

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.qualityCopyright.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.qualityCopyright.disabled = true;
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <Menu />
        <link rel="stylesheet" href={route.CDN + '/assets/styles/qualityCopyright.min.css'}/>
        <div className='copyright_content'>
          <div className="copyright_box">
            <Slider />
            <div className="box_right">
              <h3>最新资讯</h3>
              <Information />
            </div>
          </div>
          <WorksList/>
          <RecommendList/>
        </div>
      </div>
    );
  }
}

export default connect()(Copyright);