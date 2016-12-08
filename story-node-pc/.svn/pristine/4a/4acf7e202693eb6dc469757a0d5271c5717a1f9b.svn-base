import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '../../components/Menu';

import SearchResult from './search/SearchResult';
import SearchRecommend from './search/SearchRecommend';

class Search extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.search.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.search.disabled = true;
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/search.min.css'}/>
        <Menu />
        <div className="search-box">
          <div className="searchRect">
            <h2 className="result-title">搜索结果</h2>
            <SearchResult />
          </div>
          <SearchRecommend />
        </div>
      </div>
    );
  }
}

export default connect()(Search);