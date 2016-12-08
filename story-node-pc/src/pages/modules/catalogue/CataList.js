import React, { Component } from 'react';
import { Link } from 'react-router';
import { map, indexOf, remove } from 'lodash';

export default class CataList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: []
    };
  }

  getReadLink(chapterId, volumeId) {
    let story = queryString.parse(location.search).storyId;
    return '/story/reading/' + story + '/' + volumeId + '/' + chapterId;
  }

  toggleVolume(volumeId) {
    let { collapse } = this.state;
    let index = indexOf(collapse, volumeId);
    if (index > -1) {
      remove(collapse, (id) => {
        return id === volumeId;
      })
    } else {
      collapse.push(volumeId)
    }

    this.setState({
      collapse
    });
  }

  getChapterListByVolume(volume) {
    let { collapse } = this.state;
    if (indexOf(collapse, volume.id) === -1) {
      return (
        <dd style={{display: 'block'}}>
          {
            map(volume.chapterList, (chapter, index) => {
              return (
                <Link className={chapter.isPay ? 'vip' : ''} 
                  key={index} 
                  to={'/story/reading/' + volume.storyIdStr + '/' + volume.id + '/' + chapter.id}>
                  <span className="chapter-name">{chapter.name}</span>
                </Link>);
            })
          }
        </dd>
      );
    }
    return (<dd></dd>);
  }

  render() {
    let { volumeList } = this.props;
    return (
      <div className="catalogue-list">
        {
          map(volumeList, (volume, index) => {
            return (
              <dl key={index} className="roll">
                <dt onClick={this.toggleVolume.bind(this, volume.id)}>
                  <span>
                    <em className="rect"></em>{volume.name}
                  </span>
                </dt>
                {this.getChapterListByVolume(volume)}
              </dl>
            )
          })
        }
      </div>
    );
  }
}