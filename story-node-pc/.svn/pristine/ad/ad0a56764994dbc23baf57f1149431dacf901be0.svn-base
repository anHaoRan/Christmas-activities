import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import fetch from '../../utils/fetch';
import queryString from 'query-string';
import { map } from 'lodash';
import Q from 'q';
import Menu from '../../components/Menu';
import CataList from './catalogue/CataList';

class Catalogue extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      story: {},
      volumeList: []
    };
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.catalogue.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.catalogue.disabled = true;
  }

  getAllVolumeList(story) {
    return fetch('/api/cata/c/story/' + story.id + '/volumes').then(resp => {
        return resp.data;
      });
  }

  // 指定卷的所有章节列表
  getChapterListByVolume(volumeId) {
    return fetch('/api/details/c/story/volume/' + volumeId + '/chapters').then(resp => {
      return resp.data;
    });
  }

  getAllChapter(story) {
    let volumeList = [];
    this.getAllVolumeList(story).then(volumeList => {
      Q.all(map(volumeList, (volume, index) => {
        return this.getChapterListByVolume(volume.id).then(chapterList => {
          return volumeList[index].chapterList = chapterList;
        })
      })).then(resp => {
        this.setState({volumeList});
      })
    })
  }

  componentDidMount() {
    let query = queryString.parse(location.search);
    fetch('/api/cata/c/story/' + query.storyId).then(resp => {
      this.setState({
        story: resp.data
      });
      this.getAllChapter(resp.data);
    });
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <link rel="stylesheet" href={route.CDN + '/assets/styles/catalogue.min.css'}/>
        <Menu />
        <div className="catalogue-box">
          <h2 className="catalogue-bookName">{this.state.story.name}</h2>
          <CataList volumeList={this.state.volumeList}/>
        </div>
      </div>
    );
  }
}

export default connect()(Catalogue);