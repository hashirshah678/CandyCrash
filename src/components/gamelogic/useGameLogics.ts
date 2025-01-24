import {useRef} from 'react';
import {Animated} from 'react-native';
import {State} from 'react-native-gesture-handler';
import {playSound} from '../../utils/SoundUtility';
import {RFPercentage} from 'react-native-responsive-fontsize';
import { checkForMatches, checkForPossibleMoves, clearMatches, fillRandomCandies, handleSuffleAndClear, shiftCandiesDown } from './gridUtils';

enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

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

  //
  const handleSwipe = async (
    rowIndex: number,
    colIndex: number,
    direction: Direction,
    setCollectedCandies: any,
  ) => {
    playSound('candy_shuffle');
    let newGrid = JSON.parse(JSON.stringify(data));
    let targetRow = rowIndex;
    let targetCol = colIndex;

    switch (direction) {
      case Direction.UP:
        targetRow -= 1;
        break;
      case Direction.DOWN:
        targetRow += 1;
        break;
      case Direction.LEFT:
        targetCol -= 1;
        break;
      case Direction.RIGHT:
        targetCol += 1;
        break;
      default:
        console.log('Invalid direction');
        break;
    }

    // check bounds and skip null tiles
    if (
      targetRow >= 0 &&
      targetRow < data.length &&
      targetCol >= 0 &&
      targetCol < data[0].length &&
      data[rowIndex][colIndex] !== null &&
      data[targetRow][targetCol] !== null
    ) {
      // target Tile Animated X to move the target tile to the source tile
      const targetAnimatedX = Animated.timing(
        animatedValues[targetRow][targetCol]!.x,
        {
          toValue: (colIndex - targetCol) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );
      //   target Tile Animated Y to move the target tile to the source tile
      const targetAnimatedY = Animated.timing(
        animatedValues[targetRow][targetCol]!.y,
        {
          toValue: (rowIndex - targetRow) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );
      //   source Tile Animated X to move the source tile to the target tile
      const sourceTileAnimatedX = Animated.timing(
        animatedValues[rowIndex][colIndex]!.x,
        {
          toValue: (targetCol - colIndex) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );
      //   source Tile Animated Y to move the source tile to the target tile
      const sourceTileAnimatedY = Animated.timing(
        animatedValues[rowIndex][colIndex]!.y,
        {
          toValue: (targetRow - rowIndex) * RFPercentage(5),
          duration: 200,
          useNativeDriver: true,
        },
      );

      Animated.parallel([
        targetAnimatedX,
        targetAnimatedY,
        sourceTileAnimatedX,
        sourceTileAnimatedY,
      ]).start(async () => {
        console.log(newGrid);

        //  swap the source tile with the target tile, change with index
        [newGrid[rowIndex][colIndex], newGrid[targetRow][targetCol]] = [
          newGrid[targetRow][targetCol],
          newGrid[rowIndex][colIndex],
        ];
        console.log(newGrid);

        // check if there are any matching candies

        let matches = await checkForMatches(newGrid);
        if (matches?.length > 0) {
          let totalClearedCandies = 0;
          while (matches.length > 0) {
            playSound('candy_clear');
            totalClearedCandies += matches.length;
            newGrid = await clearMatches(newGrid, matches);
            newGrid = await shiftCandiesDown(newGrid);
            newGrid = await fillRandomCandies(newGrid);
            matches = await checkForMatches(newGrid);
          }

          // set the new grid data
          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);
          setData(newGrid);
          const hasMove = await checkForPossibleMoves(newGrid);
          if (!hasMove) {
            const d = await handleSuffleAndClear(newGrid);
            newGrid = d.grid;
            totalClearedCandies += d.clearMatching;
            while (!(await checkForPossibleMoves(newGrid))) {
              const p = await handleSuffleAndClear(newGrid);
              newGrid = p.grid;
              totalClearedCandies += p.clearMatching;
            }
            setData(newGrid);
          }
          setCollectedCandies((prev: number) => prev + totalClearedCandies);
        } else {
          animatedValues[rowIndex][colIndex]!.x.setValue(0);
          animatedValues[rowIndex][colIndex]!.y.setValue(0);
          animatedValues[targetRow][targetCol]!.x.setValue(0);
          animatedValues[targetRow][targetCol]!.y.setValue(0);
          setData(newGrid);
        }
      });
    }
  };

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
          await handleSwipe(
            rowIndex,
            colIndex,
            Direction.RIGHT,
            setCollectedCandies,
          );
        } else {
          await handleSwipe(
            rowIndex,
            colIndex,
            Direction.LEFT,
            setCollectedCandies,
          );
        }
      } else {
        //  if the translationY is greater than 0, it means the user has moved the tile down, otherwise, the user has moved the tile up
        if (translationY > 0) {
          await handleSwipe(
            rowIndex,
            colIndex,
            Direction.DOWN,
            setCollectedCandies,
          );
        } else {
          await handleSwipe(
            rowIndex,
            colIndex,
            Direction.UP,
            setCollectedCandies,
          );
        }
      }
    }
  };

  return {
    animatedValues,
    handleGesture,
  };
};

export default useGameLogics;
