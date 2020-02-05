const VELOCITY = 2;
const STIFFNESS = 1;

const transition = {
  velocity: VELOCITY
};

export const pageVariants = {
  initial: {
    opacity: 0,
    x: 500,
    transition: { transition }
    // velocity: VELOCITY,
    // stiffness: STIFFNESS
  },
  in: {
    opacity: 1,
    x: 0,
    transition: { transition }
    // velocity: VELOCITY,
    // stiffness: STIFFNESS
  },
  out: {
    opacity: 0,
    x: 500,
    transition: { transition }
    // VELOCITY: VELOCITY,
    // stiffness: STIFFNESS
  }
};

export const getPageVariant = startPos => {
  console.log('====================================');
  console.log('getPageVariant, startPos:', startPos);
  console.log('====================================');
  const x = startPos === 'right' ? 500 : -500;
  return {
    initial: {
      opacity: 0,
      x: x,
      transition: { transition }
    },
    in: {
      opacity: 1,
      x: 0,
      transition: { transition }
    },
    out: {
      opacity: 0,
      x: x,
      transition: { transition }
    }
  };
};
