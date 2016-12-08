import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './modal/Login';
import Register from './modal/Register';
import Recover from './modal/Recover';
import { updateLoginModalState } from '../../actions/commonActions';

class LoginModal extends Component {

  constructor(props) {
    super(props);
  }

  getModal() {
    let { dispatch } = this.props;
    let type = this.props.opened - 0;
    if (type === 1) {
      return (<Login onChange={(type) => {
        dispatch(updateLoginModalState(type));
      }}/>);
    } else if (type === 2) {
      return (<Register onChange={(type) => {
        dispatch(updateLoginModalState(type));
      }}/>);
    } else if (type === 3) {
      return (<Recover onChange={(type) => {
        dispatch(updateLoginModalState(type));
      }}/>);
    } else {
      return (<div></div>);
    }
  }

  render() {
    let type = this.props.opened;
    return (
      <div className="auth-modal" style={{position: 'fixed', zIndex: 10000, display: type > 0 ? 'block' : 'none'}}>
        { this.getModal() }
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      opened: state.common.loginModalOpened
    };
  }
)(LoginModal);