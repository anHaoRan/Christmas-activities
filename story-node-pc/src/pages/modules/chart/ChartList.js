import React, { Component } from 'react';
import { Link } from 'react-router';
import { map, assign } from 'lodash';
import fetch from '../../../utils/fetch';
import Rank from '../../../components/Rank';
import RankPage from '../../../components/RankPage';
import Avatar from '../../../components/Avatar';

export default class CharList extends Component {

  constructor(props) {
    super(props);
  }

  getTargetList() {
    let { scope, type } = this.props;
    if (type === 0) {
      return (
        <div className="chrat-rect">
          <div className="allChrat-box on">
            <Rank 
              onDetail={this.props.onDetail.bind(this)}
              local={true} scope={scope} type={0} size={10} />
            <Rank 
              onDetail={this.props.onDetail.bind(this)}
              local={true} scope={scope} type={1} size={10} />
            <Rank 
              onDetail={this.props.onDetail.bind(this)}
              local={true} scope={scope} type={2} size={10} />
            <Rank 
              onDetail={this.props.onDetail.bind(this)}
              local={true} scope={scope} type={3} size={10} />
            <Rank 
              onDetail={this.props.onDetail.bind(this)}
              local={true} scope={scope} type={4} size={10} />
            <Rank 
              onDetail={this.props.onDetail.bind(this)}
              local={true} scope={scope} type={5} size={10} />
          </div>
        </div>
      );
    } else {
      return (<RankPage scope={scope} type={type - 1} />);
    }
  }

  render() {
    return this.getTargetList();
  }
}

