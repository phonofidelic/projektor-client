import React from 'react';
import { Switch } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import { motion, AnimatePresence } from 'framer-motion';

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

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

export function AnimatedSwitch({ history, location, children, ...rest }) {
  const reverse = location.pathname === '/';

  return (
    <AnimatePresence>
      {/* <ContextRouteAnimation key={location.pathname} reverse={reverse}> */}
      <motion.div
        // enter={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ ease: 'easeInOut', duration: 400 }}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <Switch location={location} {...rest}>
          {children}
        </Switch>
      </motion.div>
      {/* </ContextRouteAnimation> */}
    </AnimatePresence>
  );
}

export default React.memo(AnimatedSwitch);
// export default AnimatedSwitch;
