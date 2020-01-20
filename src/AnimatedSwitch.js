import React from 'react';
import { Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

export const ContextRouteAnimation = posed.div({
  enter: {
    // x: 0,
    // y: 0,
    opacity: 1,
    // scale: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 400
    }
  },
  exit: {
    opacity: 0,
    // scale: 1.5,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 400
    }
  },
  leftSide: {
    // x: '-100%',
    opacity: 0,
    // scale: 1.5,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 400
    }
  },
  rightSide: {
    // x: '100%',
    opacity: 0,
    // scale: 1.5,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 400
    }
  },
  top: {
    y: '-100%',
    transition: {
      type: 'tween',
      eas: 'easeInOut',
      duration: 400
    }
  },
  bottom: {
    y: '100%',
    transition: {
      type: 'tween',
      eas: 'easeInOut',
      duration: 400
    }
  }
});

export function AnimatedSwitch({ history, location, children, ...rest }) {
  console.log('====================================');
  console.log('AnimatedSwitch, location:', location);
  console.log('====================================');
  const reverse = location.pathname === '/';

  return (
    <PoseGroup
    // flipMove={false}
    // preEnterPose={reverse ? 'leftSide' : 'rightSide'}
    // exitPose={reverse ? 'rightSide' : 'leftSide'}
    // preEnterPose={reverse ? 'bottom' : 'top'}
    // exitPose={reverse ? 'top' : 'bottom'}
    >
      <ContextRouteAnimation key={location.pathname} reverse={reverse}>
        <Switch location={location} {...rest}>
          {children}
        </Switch>
      </ContextRouteAnimation>
    </PoseGroup>
  );
}

export default React.memo(AnimatedSwitch);
// export default AnimatedSwitch;
