import React, { Component } from 'react';
import Avatar from '../../../components/Avatar';

const GENDER_CLASS = ['girlBg', 'boyBg', 'girlBg'];

export default class AuthorExplain extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let { story } = this.props;
    return (
      <div className="author-explain">
        <dl className={GENDER_CLASS[story.channel]}>
          <dt className="author-tx"><Avatar url={story.faceUrl} /></dt>
          <dd className="author-name">{story.author}</dd>
        </dl>
        <p className="author-sent">个人说明：{story.authorIntroduce}</p>
      </div>
    )
  }
}