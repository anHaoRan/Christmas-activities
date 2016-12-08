import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { map , assign } from 'lodash';
import queryString from 'query-string';

import Menu from '../../components/Menu';
import ChartList from './chart/ChartList';

const Tab = ['全部', '人气榜', '收藏榜', '推荐榜', '月票榜', '新书榜', '土豪榜'];

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scope: 0,
      type: 0,
      size: 20,
      clickState: 0,
      boyClick: -1,
    };
  }
  
  componentWillMount() {
    if (typeof window !== 'undefined') {
      window.styleMap.chart.disabled = false;
    }
  }

  componentWillUnmount() {
    window.styleMap.chart.disabled = true;
  }

  componentDidMount(){
    let query = queryString.parse(location.search)
    this.querySearch(query)
  }

  querySearch(query){
    let scope = query.scope - 0;
    let type = query.type - 0;

    if(scope === 0){
      this.setState({clickState:type,type:type,scope:scope,boyClick: -1})
    }

    if(scope === 1){
      this.setState({boyClick:type,type:type,scope:scope, clickState: -1})
    }
  }
  
  // 女频
  girlTabClick(json){
    this.setState(json)
    this.context.router.push('/chart?scope=0&type=' + json.type);
  }

  // 男频
  boyTabClick(json){
    this.setState(json)
    this.context.router.push('/chart?scope=1&type=' + json.type);
  }

  render() {
    let { route } = this.props;
    return (
      <div>
        <Menu />
        <link rel="stylesheet" href={route.CDN + '/assets/styles/chart.min.css'}/>
        <div className='chart-main'>
          <div className="chart-nav">
            <dl className="nav-girl">
              <dt>
                <h2>女频排行</h2>
              </dt>
              {
                map(Tab,(item,index)=>{
                  return(
                    <dd className={this.state.clickState == index ? "on":""} 
                      onClick={() => this.girlTabClick({
                        type: index,
                        scope: 0,
                        clickState: index,
                        boyClick: -1
                      })} key={index}><a href="javascript:void(0)">{item}</a></dd>
                  )
                })
              }
            </dl>
            <dl className="nav-boy">
              <dt>
                <h2>男频排行</h2>
              </dt>
              {
                map(Tab,(item,index)=>{
                  return(
                    <dd className={this.state.boyClick == index ? "on":""} 
                      onClick={() => this.boyTabClick({
                        type: index,
                        scope: 1,
                        boyClick: index,
                        clickState: -1
                      })} key={index}><a href="javascript:void(0)">{item}</a></dd>
                  )
                })
              }
            </dl>
          </div>
          <ChartList {...this.state} onDetail={(json) => {
            this.querySearch(json);
            this.context.router.push('/chart?scope=' + json.scope + '&type=' + json.type);
          }}/>
        </div>
      </div>
    );
  }
}

Chart.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect()(Chart);