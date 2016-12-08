import React, { Component } from 'react';
import { Link } from 'react-router';
import { map, indexOf, remove } from 'lodash';
import fetch from '../../../utils/fetch';
import queryString from 'query-string';

export default class Catalog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: [],
      storyVolumeList: [],
      VolumeChapterList: {}
    };
  }

  componentDidMount() {
    let query = queryString.parse(location.search);
    window.catalogTop = document.getElementById('detailCatalogBox').offsetTop;
    if (query.position == 1) {
      console.info(window.catalogTop);
      setTimeout(() => {
        window.scrollTo(0, window.catalogTop - 60);
      }, 800)
    }

    this.getVolumeList({
      storyId: this.props.story.id
    });
  }

  componentWillReceiveProps(nextProps) {
   let oldStory = this.props.story;
   let newStory = nextProps.story;
   if (oldStory.id !== newStory.id) {
    this.getVolumeList({storyId: newStory.id});
   }
  }

  getVolumeList(params) {
    return fetch('/api/details/c/story/' + params.storyId + '/volumes').then(resp => {
      this.setState({
        storyVolumeList: resp.data
      });
      this.toggleVolume(resp.data[0].id);
      setTimeout(() => {
        window.commentTop = document.getElementById('detailCommentBox').offsetTop;
      }, 300);
    })
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

      let {VolumeChapterList} = this.state;
      let chapterList = VolumeChapterList[volumeId];
      if (!chapterList) {
        chapterList = [];
        fetch('/api/details/c/story/volume/' + volumeId + '/chapters').then((resp) => {
          VolumeChapterList[volumeId] = resp.data.slice(0,10);
          this.setState({VolumeChapterList});
        })
      }

    }

    this.setState({
      collapse
    });

    setTimeout(() => {
      window.commentTop = document.getElementById('detailCommentBox').offsetTop;
    }, 300);
  }

  getChapterListByVolume(volumeId) {
    let { story } = this.props;
    let storyId = story.id;
    if (indexOf(this.state.collapse, volumeId) > -1) {
      let {VolumeChapterList} = this.state;
      let chapterList = VolumeChapterList[volumeId];
      return (
        <dd style={{display: 'block'}}>
          {this.renderChapterList(chapterList, volumeId)}
          <p className="moreBox"><Link to={'/catalogue?storyId=' + storyId + '&volumeId=' + volumeId} className="more">查看更多目录</Link></p>
        </dd>
      );
    }
    return (<dd></dd>);
  }

  renderChapterList(chapterList, volumeId) {
    let { story } = this.props;
    if (chapterList) {
      return (
        <div className="catalog-list">
          {
            map(chapterList, (item, index) => {
              return (<Link key={index} to={'/story/reading/' + story.id + '/' + volumeId + '/' + item.id}>{item.name}</Link>);
            })
          }
        </div>
      );
    }
    return (<div>加载中...........</div>)
  }

  render() {
    let { storyVolumeList } = this.state;
    return (
      <div className="catalog" id="detailCatalogBox">
        {
          map(storyVolumeList, (item, index) => {
            return (
              <dl key={index} className="catalog-rect">
                <dt className="roll" onClick={this.toggleVolume.bind(this, item.idStr)}><i></i>{item.name}</dt>
                {this.getChapterListByVolume(item.idStr)}
              </dl>
            )
          })
        }
      </div>
    )
  }
}