import React, { Component } from 'react';
import { Link } from 'react-router';
import { map, indexOf, remove, findIndex  } from 'lodash';
import fetch from '../../../utils/fetch';
import Q from 'q';
export default class LeftColumn extends Component {

  constructor(props) {
    super(props);
    this.state={
      volumeList:[],
      buySection:0,
      isAll:false,
      selectList: [],
    }
  }

  getAllVolumeList() {
    let { story } = this.props;
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

  buyAllChapter() {
    this.setState({buySection:1});
    let { volumeList } = this.state;
    if (!volumeList.length) {
      this.getAllVolumeList().then(volumeList => {
        Q.all(map(volumeList, (volume, index) => {
          return this.getChapterListByVolume(volume.id).then(chapterList => {
            return volumeList[index].chapterList = chapterList;
          })
        })).then(resp => {
          this.setState({volumeList});
        })
      })
    }
  }

  toggleSelectAll(){
    let { selectList, volumeList } = this.state;
    // console.log(volumeList,'volumeList')
    map(volumeList,(volume)=>{
        map(volume.chapterList,(chapter)=>{
          if (this.isSelected(chapter.id)) {
            remove(selectList, (item) => {
              this.setState({isAll:false})
               return item === chapter.id;
            })
          } else {
              this.setState({isAll:true})
             selectList.push(chapter.id);
          }
        })
    })
    this.setState({
      selectList,
    });
  }

  toggleSelectVolumeList(volume) {
    let { selectList } = this.state;
    // console.log(volume.chapterList,'volume.chapterList')
    map(volume.chapterList,(chapterId)=>{
      if (this.isSelected(chapterId.id)) {
           remove(selectList, (item) => {
             return item === chapterId.id;
           })
         } else {
           selectList.push(chapterId.id);
         }
    })
    
    // console.log(selectList,'selectList')
    this.setState({
      selectList
    });
  }

  toggleSelectChapterList(chapter) {
    let { selectList } = this.state;
    if (this.isSelected(chapter.id)) {
      remove(selectList, (item) => {
        return item === chapter.id;
      })
    } else {
      selectList.push(chapter.id);
    }

    // console.log(selectList)

    this.setState({
      selectList
    });
  }

  isSelected(chapterId) {
    return indexOf(this.state.selectList, chapterId) > -1;
  }
  isVolumeSelected(volumeId, index) {
    let { selectList, volumeList } = this.state;
    let currentVolumeChapterList = volumeList[index].chapterList;
    return map(currentVolumeChapterList, (chapter) => {
      return this.isSelected(chapter.id) ? '' : '0';
    }).join('').length === 0;
  }

  render() {
    let { story } = this.props;
    let { volumeList } = this.state;
    return (
    <div className="leftBox">
      <div className="leftColumn" id="left_box">
        <div className="_img">
            <img src={story.cover} />
        </div>
        <div className="_title">{story.name}</div>
        <div className="two_code"></div>
        <span className="codeDownload">二维码客户端下载</span>
        <a target="_blank" href="/download" className="_button">立即下载</a>
        <h1 style={{display: 'none'}}>火星小说{story.name ? ('《' + story.name + '》') : ''}</h1>
      </div>
     </div>
    )
  }
}