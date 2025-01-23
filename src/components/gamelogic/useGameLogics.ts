import {useRef} from 'react';
import {Animated} from 'react-native';
import {State} from 'react-native-gesture-handler';

const useGameLogics = (data: any[][], setData: (data: any) => any) => {
  // give the animated values to the tiles in the grid
  // object of x, y values for each tile translatedX and translatedY positions
  // it can be move horizontally or vertically, so we need to keep track of both x and y values
  const animatedValues = useRef<any>(
    data.map(row =>
      row.map(tile =>
        tile === null
          ? null
          : {
              x: new Animated.Value(0),
              y: new Animated.Value(0),
            },
      ),
    ),
  ).current;

  //   handleGesture is a function that takes the event, row index, column index, state, and setCollectedCandies as arguments.
  const handleGesture = async (
    e: any,
    rowIndex: number,
    colIndex: number,
    state: any,
    setCollectedCandies: any,
  ) => {
    // if the tile is empty, return
    if (data[rowIndex][colIndex] === null) {
      return;
    }

    //  state end means the gesture is ended, in other words, the user has lifted their finger from the screen
    if (state === State.END) {
      const {translationX, translationY} = e.nativeEvent;
      //   get the absolute value of the translationX and translationY, convert them to positive numbers
      const absX = Math.abs(translationX);
      const absY = Math.abs(translationY);

      //  if the absolute value of the translationX is greater than the absolute value of the translationY, it means the user has moved the tile horizontally (left or right)
      //   else the user has moved the tile vertically (up or down)
      if (absX > absY) {
        //  if the translationX is greater than 0, it means the user has moved the tile to the right, otherwise, the user has moved the tile to the left
        if (translationX > 0) {
        } else {
        }
      } else {
      }
    }
  };

  return {
    animatedValues,
    handleGesture,
  };
};

export default useGameLogics;
