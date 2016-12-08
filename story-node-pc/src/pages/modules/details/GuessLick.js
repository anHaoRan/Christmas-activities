import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';

export default class GuessLick extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    let { dispatch, story } = this.props;
    fetch('/api/details/c/story/guessYouLike?page=1&type=' + story.type).then(resp => {
      this.setState({
        list: resp.data || []
      });
    })
  }

  render() {
    let { list } = this.state;
    return (
      <div className="guess">
        <h2>猜你喜欢</h2>
        <div className="guess-rect">
          {
            map(list, (item, index) => {
              return (
                <Link 
                  onClick={this.props.reloadDetail.bind(this, item.id)}
                  key={index} to={'/story/' + item.id}>
                  <dl className="guess-list">
                    <dt><img src={item.cover}/></dt>
                    <dd>
                      <h3 className="bookName" title={item.name}>{item.name}</h3>
                      <span className="author">{item.author}</span>
                      <p style={{height: '4.4em', overflow: 'hidden'}}>简介： {item.pcIntroduce}</p>
                    </dd>
                  </dl>
                </Link>
              );
            })
          }
        </div>
      </div>
    )
  }
}