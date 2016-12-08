import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';

class SearchRecommend extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      recommend: []
    };
  }

  componentWillReceiveProps(nextProps) {
    let { searchList, dispatch } = this.props;
    let first = nextProps.searchList.list[0];
    let { type } = this.state;
    if (nextProps.searchList.pageNo === 0 && first && first.type !== type) {
      this.setState({
        type: first.type
      });
      type = first.type;
    }
    fetch('/api/details/c/story/guessYouLike?page=1&type=' + (type || '古代言情')).then(resp => {
        this.setState({
          recommend: resp.data.slice(0, 4)
        });
      });
  }

  render() {
    let { recommend } = this.state;
    return (
      <div className="recommend">
        <h2 className="recommend-title">精彩推荐</h2>
        <div className="recommend-rect">
          {
            map(recommend, (story, index) => {
              return (
                <dl key={index} className="recommend-list">
                  <dt><img src={story.cover} /></dt>
                  <dd>
                    <Link to={'/story/' + story.id}>
                      <h3 className="bookName" title={story.name}>{story.name}</h3>
                      <span className="author">{story.author}</span>
                      <p className="intro">简介： {story.pcIntroduce}</p>
                    </Link>
                  </dd>
                </dl>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      searchList: state.search.searchList
    };
  }
)(SearchRecommend);