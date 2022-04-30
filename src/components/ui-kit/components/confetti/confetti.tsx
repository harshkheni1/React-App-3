import React, { FC, useEffect, useState, useRef, Fragment } from 'react';
import { WithStyle } from '../../utils';
import { ConfettiProps, StyleProps } from './types';
import { ConfettiStyled, ParticlesStyled, ParticleStyled } from './confetti.styled';
import { generateRandomColor, generateWholeNumber, LEFT_OFFSET, TOP_OFFSET } from './const';

const customWindow =
  typeof window === 'undefined'
    ? {
        innerWidth: 1000,
        innerHeight: 1000,
      }
    : window;
const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback && savedCallback?.current) {
        /* eslint-disable-next-line */
        // @ts-ignore
        savedCallback?.current();
      }
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const CircularParticle: FC = () => {
  const size = generateWholeNumber(5, 10);
  const defaultStyle: StyleProps = {
    backgroundColor: generateRandomColor(),
    width: size,
    height: size,
    borderRadius: size,
    transform: `rotateZ(${generateWholeNumber(0, 45)}deg)`,
    left: generateWholeNumber(0, customWindow?.innerWidth),
    top: generateWholeNumber(-TOP_OFFSET, 0),
  };
  const [style, setStyleState] = useState(defaultStyle);

  useEffect(() => {
    const { left } = style;
    const timeout = setTimeout(() => {
      setStyleState({
        ...style,
        top: customWindow?.innerHeight + generateWholeNumber(0, TOP_OFFSET) + 'px',
        left: Number(left) + generateWholeNumber(-LEFT_OFFSET, LEFT_OFFSET) + 'px',
      });
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <ParticleStyled as="div" style={style} />;
};

const SquiggleParticle: FC = () => {
  const size = generateWholeNumber(15, 45);
  const defaultStyle: StyleProps = {
    fill: generateRandomColor(),
    width: size,
    height: size,
    transform: `rotateZ(${generateWholeNumber(-15, 15)}deg)`,
    left: generateWholeNumber(0, customWindow?.innerWidth),
    top: generateWholeNumber(-TOP_OFFSET, 0),
  };
  const [style, setStyleState] = useState(defaultStyle);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const { left } = style;

      setStyleState({
        ...style,
        top: customWindow.innerHeight + generateWholeNumber(0, TOP_OFFSET) + 'px',
        left: Number(left) + generateWholeNumber(-LEFT_OFFSET, LEFT_OFFSET) + 'px',
        transform: `rotateZ(${generateWholeNumber(-15, 15)}deg)`,
      });
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ParticleStyled as="svg" style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
        fill={style.fill}
        d="M428.127,0l-12.716,10.062l12.718-10.06c8.785,11.101,19.716,24.917,19.716,51.051 s-10.932,39.951-19.716,51.053c-7.382,9.331-12.716,16.072-12.716,30.927c0,14.854,5.334,21.594,12.716,30.925   c8.784,11.101,19.716,24.917,19.716,51.05c0,26.135-10.931,39.949-19.715,51.051c-7.383,9.331-12.717,16.072-12.717,30.927   c0,14.855,5.332,21.593,12.711,30.919l-25.435,20.124c-8.781-11.097-19.708-24.909-19.708-51.042 c0-26.135,10.931-39.949,19.715-51.051c7.383-9.331,12.717-16.072,12.717-30.927c0-14.855-5.335-21.595-12.717-30.926 c-8.784-11.101-19.715-24.916-19.715-51.049s10.931-39.95,19.715-51.051c7.383-9.331,12.717-16.072,12.717-30.928 c0-14.855-5.335-21.596-12.718-30.927L428.127,0z"
      />
    </ParticleStyled>
  );
};

const Particles: FC<{ count: number; id: number }> & WithStyle = ({ count, id }) => {
  const particles = [];
  const types = [SquiggleParticle, CircularParticle, CircularParticle];

  for (let i = 0; i < count; i += 1) {
    const Particle = types[generateWholeNumber(0, 3)];
    particles.push(<Particle key={`${id}_Particle_${i}`} />);
  }

  return <ParticlesStyled>{particles}</ParticlesStyled>;
};

export const Confetti: FC<ConfettiProps> & WithStyle = (props) => {
  const { duration, interval, isActive } = props;

  const [id, setIdState] = useState(1);
  const [confetties, setConfettiesState] = useState([1]);
  const [isRunning, setIsRunning] = useState(isActive);

  useEffect(() => {
    setIdState(1);
    setConfettiesState([1]);
    setIsRunning(isActive);

    const clrear = setTimeout(() => {
      setIsRunning(false);
    }, duration * 1000);

    if (!isActive) {
      clearTimeout(clrear);
    }

    return () => {
      clearTimeout(clrear);
      setIsRunning(false);
    };
  }, [isActive]);

  useInterval(
    () => {
      const newId = id + 1;
      setIdState(newId);
      setConfettiesState([...confetties, newId]);
    },
    isRunning ? interval * 1000 : null,
  );

  useInterval(
    () => {
      const removedFirst = confetties;
      removedFirst.shift();
      setConfettiesState(removedFirst);
    },
    isRunning ? (interval + 5) * 1000 : null,
  );

  return (
    <Fragment>
      {isRunning && typeof window !== 'undefined' && (
        <ConfettiStyled>
          {confetties.map((cId) => (
            <Particles key={`Particles_${cId}`} id={cId} count={Math.floor(customWindow.innerWidth / 20)} />
          ))}
        </ConfettiStyled>
      )}
    </Fragment>
  );
};

Confetti.defaultProps = {
  duration: 30,
  interval: 5,
  isActive: true,
};

Confetti.displayName = 'Confetti';
Confetti.Style = ConfettiStyled;
