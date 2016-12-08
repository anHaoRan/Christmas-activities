import React, { Component } from 'react';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import ReactSwipe from 'react-swipe';

export default class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      current: 0,
    };
  }

  componentDidMount() {
    this.getSlider();
  }

  getSlider() {
    fetch('/api/copyright/slider').then(resp => {
      this.setState({
        list: resp.data || []
      });
    })
  }

  render() {
    let { list, current } = this.state;
    return (
      <div className="box_left">
        <ReactSwipe ref="swipe" key={list.length}
          className="sliderBox"
          swipeOptions={{
            startSlide: 0,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: (index, elem) => {
              this.setState({
                current: index
              });
            }
          }}>
          {
            map(list, (item, index) => {
              return (
                <div key={index}>
                  <a href={item.targetType == 1 ? ('/story/' + item.targetId) : item.linkUrl} 
                    target="_blank"
                    style={{
                    display: 'block',
                    width: '659px', 
                    height: '321px', 
                    background: 'url(' + item.pic + ') no-repeat 50% / cover'
                  }}>
                  </a>
                </div>
              )
            })
          }
        </ReactSwipe>

        <ul className="slider-pagination">
          {
            map(list, (item, index) => {
              let isActive = current === index;
              if (list.length === 2) {
                isActive = current % 2 === index;
              }
              return (
                <li 
                  key={index}
                  className={isActive ? 'active' : ''} 
                  onClick={(index) => {
                    // let swipe = this.refs.swipe.swipe;
                    // if (!isActive) {
                    //   swipe.slide(index, 400);
                    // }
                }}>{index}</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}