import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetch from '../../utils/fetch';
import Menu from '../../components/Menu';
import queryString from 'query-string';
import { updateNewsPage } from '../../actions/newsPageActions';

class NewsPage extends Component {

  static fetchData(dispatch, Fetch=fetch, query) {
    return Fetch('/api/event/c/event/' + query.id).then(resp => {
      return dispatch(updateNewsPage(resp.data));
    });
  }

  componentDidMount() {
    NewsPage.fetchData(this.props.dispatch, fetch, queryString.parse(location.search));
  }

  render() {
    let { event } = this.props;
    let content = event.content || '';
    return (
      <div>
        <Menu />
        <div style={{width: '1000px', padding: '0 0 50px', margin: '0 auto', overflow: 'hidden'}}>
          <h2>{event.eventName}</h2>
          <div style={{lineHeight: '2'}} dangerouslySetInnerHTML={{__html: content.replace(/\n/g, '<br />').replace(/\s/g, '')}}></div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      event: state.newsPage.news
    };
  }
)(NewsPage);