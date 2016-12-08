import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map, assign } from 'lodash';
import fetch from '../../../utils/fetch';
import {
  updateSearchResultList
} from '../../../actions/searchActions';
import queryString from 'query-string';
import Pagination from '../../../components/Pagination';

class SearchResult extends Component {

  static fetchData(dispatch, Fetch = fetch, query) {
    return Fetch('/api/search/c/common/search?' + queryString.stringify(query)).then(resp => {
     return dispatch(updateSearchResultList(resp.data));
   });
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    SearchResult.fetchData(dispatch, fetch, queryString.parse(location.search));
  }

  searchResult(pageNo) {
    let { dispatch } = this.props;
    let query = queryString.parse(location.search);
    SearchResult.fetchData(dispatch, fetch, assign({}, query, {
      pageNo: pageNo - 1
    }));
  }

  render() {
    let { searchList } = this.props;
    let { pageNo, totalPages } = searchList;
    if (searchList && searchList.total > 0) {
      return (
        <div>
          {
            map(searchList.list, (result, i) => {
              return (
                <dl className="result-list" key={i}>
                  <dt><img src= {result.cover} /></dt>
                  <dd>
                    <Link to={'/story/' + result.id}>
                      <h3 className="bookName" dangerouslySetInnerHTML={{__html: result.name}}></h3>
                      <span className="author" dangerouslySetInnerHTML={{__html: result.author}}></span>
                      <p className="intro" 
                        dangerouslySetInnerHTML={{
                          __html: result.introduce.replace(/\s+/g, '').replace('emclass=', 'em class=')
                        }}></p>
                      <b className="type">分类：{result.type}</b>
                    </Link>
                  </dd>
                </dl>
              )
            })
          }
          <Pagination onPageChange={this.searchResult.bind(this)} page={pageNo + 1} totalPages={totalPages} />
        </div>
      )
    } else {
      return (
        <div className="no-result">抱歉！搜索无结果</div>
      );
    }
  }
}

export default connect(
  (state) => {
    return {
      searchList: state.search.searchList
    };
  }
)(SearchResult);