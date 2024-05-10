import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { type HalfCircleProgressProps } from './components/HalfCircleProgress';

type Props = HalfCircleProgressProps & {
  animated?: boolean;
  indeterminateAnimationDuration?: number;
  indeterminate?: boolean;
  progress?: number;
  direction?: 'clockwise' | 'counter-clockwise';
};

export default function withAnimation(
  WrappedComponent: React.ComponentType<any>,
  indeterminateProgress: number | undefined = undefined
) {
  return function AnimatedComponent(props: Props) {
    const {
      animated = true,
      indeterminateAnimationDuration = 1000,
      indeterminate = false,
      progress = 0,
    } = props;

    const progressValue = useRef(Math.min(Math.max(progress, 0), 1));
    const rotationValue = useRef(0);
    const progressState = new Animated.Value(progressValue.current);
    const rotationState = new Animated.Value(rotationValue.current);

    progressState.addListener((event) => {
      progressValue.current = event.value;
    });
    rotationState.addListener((event) => {
      rotationValue.current = event.value;
    });

    useEffect(() => {
      if (indeterminate) {
        spin();
        if (indeterminateProgress) {
          Animated.spring(progressState, {
            toValue: indeterminateProgress,
            useNativeDriver: false,
          }).start();
        }
      }
      return () => {
        progressState.removeAllListeners();
        rotationState.removeAllListeners();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (indeterminate) {
        spin();
      } else {
        Animated.spring(rotationState, {
          toValue: rotationValue.current > 0.5 ? 1 : 0,
          useNativeDriver: false,
        }).start((endState) => {
          if (endState.finished) {
            rotationState.setValue(0);
          }
        });
      }
      const newProgress = indeterminate
        ? indeterminateProgress || 0
        : Math.min(Math.max(progress, 0), 1);
      if (newProgress !== progressValue.current) {
        if (animated) {
          Animated.spring(progressState, {
            toValue: newProgress,
            bounciness: 0,
            useNativeDriver: false,
          }).start();
        } else {
          progressState.setValue(newProgress);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indeterminate, progress]);

    function spin() {
      rotationState.setValue(0);
      Animated.timing(rotationState, {
        toValue: props.direction === 'counter-clockwise' ? -1 : 1,
        duration: indeterminateAnimationDuration,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: false,
      }).start((endState) => {
        if (endState.finished) {
          spin();
        }
      });
    }

    return (
      <WrappedComponent
        {...props}
        progress={animated ? progressState : progress}
        rotation={rotationState}
      />
    );
  };
}
