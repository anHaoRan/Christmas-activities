import React, { Component } from 'react';
import { assign } from 'lodash';

export default class Pagination extends Component {
  
  constructor(props) {
    super(props);
  }

  onPageSearch(page) {
    this.props.onPageChange(page);
  }

  getPrevPage() {
    let { page } = this.props;
    if (page === 1) {
      return (
        <li className="prev disabled">
          <span></span>
        </li>
      );
    }
    return (
      <li className="prev">
        <a href="javascript:void(0)" onClick={this.onPageSearch.bind(this, page - 1)}>
        </a>
      </li>
    );
  }

  getFirstPage() {
    let { page } = this.props;
    if (page === 1) {
      return (
        <li className="active">
          <span>1</span>
        </li>
      );
    }
    return (
      <li>
        <a href="javascript:void(0)" 
          onClick={this.onPageSearch.bind(this, 1)}>1</a>
      </li>
    );
  }

  getPageList() {
    let arr = [];
    let { page, totalPages } = this.props;
    let start = 0;
    let end = 0;
    let prevDots = false;
    let nextDots = false;
    if (totalPages > 8) { // 8页以内，全部显示
      if (page < 4) {
        start = 1;
        end = 6;
        nextDots = true;
      } else if (totalPages - page < 4) {
        start = totalPages - 6;
        end = totalPages - 1;
        prevDots = true;
      } else {
        start = page - 2;
        end = page + 3;
        prevDots = true;
        nextDots = true;
      }
    } else {
      start = 1;
      end = totalPages - 1;
    }

    if (prevDots) {
      arr.push((<li className="dots" key={'prevDots'}><i></i></li>));
    }

    for (let index = start; index < end; index++) {
      arr.push(this.getEveryPage(index + 1));
    }

    if (nextDots) {
      arr.push((<li className="dots" key={'nextDots'}><i></i></li>));
    }
    return arr;
  }

  getEveryPage(number) {
    let { page } = this.props;
    if (page === number) {
      return (
        <li key={number} className="active">
          <span>{number}</span>
        </li>
      );
    }
    return (
      <li key={number}>
        <a href="javascript:void(0)" onClick={this.onPageSearch.bind(this, number)}>{number}</a>
      </li>
    );
  }

  getLastPage() {
    let { page, totalPages } = this.props;
    if (page === totalPages) {
      return (
        <li className="active">
          <span>{page}</span>
        </li>
      );
    }
    return (
      <li>
        <a href="javascript:void(0)" 
          onClick={this.onPageSearch.bind(this, totalPages)}>{totalPages}</a>
      </li>
    );
  }

  getNextPage() {
    let { page, totalPages } = this.props;
    if (page === totalPages) {
      return (
        <li className="next disabled">
          <span></span>
        </li>
      );
    }
    return (
      <li className="next">
        <a href="javascript:void(0)" 
          onClick={this.onPageSearch.bind(this, page + 1)}></a>
      </li>
    );
  }

  render() {
    let { small } = this.props;
    return (
      <div className={'pagination' + (small ? ' small' : '')} style={{
        display: this.props.totalPages > 1 ? 'block' : 'none',
        textAlign: 'center'
      }}>
        <ul>
          {this.getPrevPage()}
          {this.getFirstPage()}
          {this.getPageList()}
          {this.getLastPage()}
          {this.getNextPage()}
        </ul>
      </div>
    );
  }
}