import React, { Component } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';

export default class WorksList extends Component {

  constructor(props) {
    super(props);
    this.state= {
      list: [],
      leftNum: 0
    }
  }

  componentDidMount() {
    fetch('/api/copyright/works').then(resp => {
      this.setState({
        list: resp.data
      });
    })
  }

  doLeft() {
    let size = this.state.list.length;
    let { leftNum } = this.state;
    if (leftNum + 5 < size) {
      this.setState({
        leftNum: leftNum + 1
      });
    }
  }

  doRight() {
    let size = this.state.list.length;
    let { leftNum } = this.state;
    if (leftNum > 0) {
      this.setState({
        leftNum: leftNum - 1
      });
    }
  }

  render() {
    let { list, leftNum } = this.state;
    let w = list.length * 204;
    return (
    <div className="outplay_box">
      <div className="left" onClick={this.doLeft.bind(this)}></div>
      <div className="right" onClick={this.doRight.bind(this)}></div>
      <div className="top">
        <h2>最新出售作品</h2>
      </div>
      <div className="main">
        <ul className="outplay_ul" style={{ width: w + 'px', left: leftNum * -204 + 'px'}}>
         {
          map(list,(item,index) =>{
            return(
              <li key={index} className="item">
                <Link to={'/story/' + item.story.idStr}>
                <div className="img"><img src={item.story.cover} /></div>                  
                  <span className="_fictionName win-head">{item.story.name}</span>
                  <span className="_author">{item.story.author}</span>
                  <span className="_classification">分类：<span>{item.story.type}</span></span>
                </Link>
              </li>
            )
          })
         }
        </ul>
      </div>
    </div>
    );
  }
}