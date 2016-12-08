import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';

export default class RecomBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boyHotRecomList: [],
      girlHotRecomList: [],
    };
  }

  componentDidMount() {
    fetch('/api/home/girl/recombook').then(resp => {
      this.setState({
        girlHotRecomList: resp.data
      });
    })
    fetch('/api/home/boy/recombook').then(resp => {
      this.setState({
        boyHotRecomList: resp.data
      });
    })
  }

  render() {
    let { boyHotRecomList, girlHotRecomList } = this.state;
    return (
      <div className="recom-main">
        <h2 className="recom-title">火力推荐<i></i></h2>
        <ul className="girlRect">
        {
          map(girlHotRecomList, (girl,i) => {
            return (
              <li key={i} className="recom-list">
                <Link to={'/story/' + girl.story.id}>
                  <img src= {girl.story.cover} />
                  <div className="recom-detail">
                    <h3 className="bookName win-head">{girl.story.name}</h3>
                    <em className="author">{girl.story.author}</em>
                    <p className="recoSent">小编推荐：{girl.story.pcIntroduce}</p>
                    <span className="type">分类:{girl.story.type}</span>
                    <span className="readBtn">立即阅读</span>
                  </div>
                </Link>
                <i></i>
              </li>
            )
          })
        }
        </ul>
        <ul className="boyRect">
        {
          map(boyHotRecomList, (boy,i) => {
            return (
              <li key={i} className="recom-list">
                <Link to={'/story/' + boy.story.id}>
                  <img src= {boy.story.cover} />
                  <div className="recom-detail">
                    <h3 className="bookName win-head">{boy.story.name}</h3>
                    <em className="author">{boy.story.author}</em>
                    <p className="recoSent">小编推荐：{boy.story.pcIntroduce}</p>
                    <span className="type">分类:{boy.story.type}</span>
                    <span className="readBtn">立即阅读</span>
                  </div>
                  </Link>
                <i></i>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
}