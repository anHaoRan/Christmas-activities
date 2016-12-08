import React, { Component } from 'react';
import { Link } from 'react-router';
import { map, indexOf, remove } from 'lodash';
import fetch, { post } from '../../../utils/fetch';

const STATE_ARR = ['', '更新', '完结'];

export default class BookRack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amend: 0,
      checked: [],
      list: []
    }
  }

  componentDidMount() {
    fetch('/api/user/shelf').then(resp => {
      this.setState({
        list: resp.data
      });
    })
  }

  toggleCheck(index) {
    let {checked} = this.state;
    if (this.isChecked(index)) {
      remove(checked, (item) => {
        return item === index;
      });
    } else {
      checked.push(index);
    }
    this.setState(checked);
  }

  isChecked(index) {
    return this.state.checked.indexOf(index) > -1;
  }

  isAll() {
    return this.state.checked.length === this.props.shelf.length;
  }

  checkAll() {
    if (this.isAll()) {
      this.setState({checked: []});
      return false;
    }
    this.setState({
      checked: map(this.props.shelf, (item, index) => {
        return index;
      })
    });
  }

  removeShelf() {
    let { checked, list } = this.state;
    if (!checked.length) {
      return false;
    }

    let idArr = map(checked, (index) => {
      return list[index].id;
    })
    _loading();
    post('/api/user/c/shelf/remove/' + idArr.join(','))
      .then((resp) => {

        this.setState({
          checked: []
        });

        _loading(1);

        let { list } = this.state;
        remove(list, (item, index) => {
          return indexOf(checked, index) > -1;
        });
        this.setState({
          list
        });
      });
  }

  render() {
    let { display } = this.props;
    let { amend, list } = this.state;
    return (
      <div className="bookrack" style={{display: display ? 'block': 'none'}}>
        <div className="bookrack-title">
          <span style={{display: amend ? 'none': 'block'}} className="amend-btn" onClick={() => this.setState({amend: 1})}>编辑</span>
          <div className="amend" style={{display: amend ? 'block': 'none'}} >
            <span 
              onClick={this.checkAll.bind(this)}
              className={"allCheck" + (this.isAll() ? ' checked' : '')}>
              <span className="checkbox"></span>全选
            </span>
            <span className="del" onClick={this.removeShelf.bind(this)}>删除</span>
            <span className="accomplish" onClick={() => {
              this.setState({amend: 0, checked: []});
            }}>完成</span>
          </div>
        </div>
        <div className="bookrack-rect">
          {
            map(list, (item, index) => {
              let { storyVo, lastTimeChapter } = item;
              return (
                <div key={index} className="book-list">
                  <Link to={'/story/' + storyVo.id}>
                    <img src={storyVo.cover} />
                    <h3 className="bookName">{storyVo.name}</h3>
                    <p className="old">{lastTimeChapter ? ('上次阅读到：' + lastTimeChapter) : '还未读过'}</p>
                    <p className="new">最新更新：{storyVo.latestChapter}</p>
                    <i className="upDateLog" style={{display: (storyVo.state == 1 && lastTimeChapter != storyVo.latestChapter) ? 'block' : 'none'}}></i>
                    <i className="endLog" style={{display: storyVo.state == 2 ? 'block' : 'none'}}></i>
                  </Link>
                  <div onClick={this.toggleCheck.bind(this, index)} className="shade" style={{display: amend ? 'block' : 'none' }}>
                    <span className={"checkBox" + (this.isChecked(index) ? ' checked' : '')}></span>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}