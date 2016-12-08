import React, { Component } from 'react';

const DEFAULT_FACE = '//p2.duyao001.com/image/article/15bcc989e86a8b1deb2dcc7286b23e59_150x150.png';

// 头像
export default class Avatar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { url } = this.props;
    if (url && /_\d+x\d+\./.test(url)) {
      url = url.replace(/_\d+x\d+\./, '_150x150.');
    }
    return (
      <img src={url || DEFAULT_FACE} alt="" className={this.props.className}/>
    );
  }
}