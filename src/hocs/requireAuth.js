import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { history } from 'config';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      // console.log('requireAurth, props:', this.props);
      if (!this.props.token) {
        history.push('/');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      token: state.user.userInfo.token
    };
  };

  return connect(mapStateToProps, actions)(ComposedComponent);
};
