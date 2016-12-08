import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map } from 'lodash';
import fetch from '../../../utils/fetch';
import { updateGirlPopularityList, updateBoyPopularityList } from '../../../actions/homeActions';
import Q from 'q';

class Popularity extends Component {

  static fetchData(dispatch, Fetch = fetch) {
    return Fetch('/api/home/popularity/list/female').then((resp) => {
      dispatch(updateGirlPopularityList(resp.data));
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      girlActive: 0,
      boyActive: 0,
    };
  }

  componentDidMount() {
    let { dispatch } = this.props;
    Popularity.fetchData(dispatch);
  }

  switchToMaleChannel() {
    this.setState({
      type: 1
    });
    let { dispatch, boyList } = this.props;
    if (!boyList.length) {
      fetch('/api/home/popularity/list/male').then((resp) => {
        dispatch(updateBoyPopularityList(resp.data));
      })
    }
  }

  getMaleChannel() {
    let { boyList } = this.props;
    return (
      <ol className="cut-rect rect-male">
        {
          map(boyList, (item, index) => {
            let count = index + 1;
            count = count > 9 ? count : '0' + count;
            return (
              <li key={index} className={index === this.state.boyActive ? 'on' : ''} onMouseOver={() => this.setState({boyActive: index})}>
                <Link to={'/story/' + item.story.idStr} className="pinkBg">
                  <em className="num">{count}</em>
                  <img src={item.story.cover} alt="" />
                  <p className="bookName win-head">{item.story.name}</p>
                  <span className="author">{item.story.author}</span>
                </Link>
              </li>
            );
          })
        }
      </ol>
    );
  }

  getFemaleChannel() {
    let { girlList } = this.props;
    return (
      <ol className="cut-rect rect-female">
        {
          map(girlList, (item, index) => {
            let count = index + 1;
            count = count > 9 ? count : '0' + count;
            return (
              <li key={index} className={index === this.state.girlActive ? 'on' : ''} onMouseOver={() => this.setState({girlActive: index})}>
                <Link to={'/story/' + item.story.idStr} className="pinkBg">
                  <em className="num">{count}</em>
                  <img src={item.story.cover} alt="" />
                  <p className="bookName win-head">{item.story.name}</p>
                  <span className="author">{item.story.author}</span>
                </Link>
              </li>
            );
          })
        }
      </ol>
    );
  }
  
  render() {
    return (
      <div className="wrap-pop">
        <ul className="cut-btnRect win-head">
          <li onClick={() => {this.setState({type: 0})}} className={this.state.type === 0 ? 'on' : ''}><i className="girl"></i>女生人气榜</li>
          <li onClick={this.switchToMaleChannel.bind(this)} className={this.state.type === 1 ? 'on' : ''}><i className="boy"></i>男生人气榜</li>
        </ul>
        { this.state.type === 1 ? this.getMaleChannel() : this.getFemaleChannel() }
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      girlList: state.home.girlPopularityList,
      boyList: state.home.boyPopularityList
    };
  }
)(Popularity);