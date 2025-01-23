//  This function is used to check for matches in the grid. It takes a grid as an argument and returns an array of objects with the row and column of each match. The function checks for horizontal and vertical matches of 3 or more candies in a row or column. If a match is found, the function adds the row and column of each candy in the match to the matches array. The function then returns the matches array.
export const checkForMatches = async (grid: any[][]) => {
  const matches: {row: number; col: number}[] = [];

  // check for horizontal matches (3 or more candies in a column)
  for (let row = 0; row < grid.length; row++) {
    let matchLength = 1;
    for (let col = 0; col < grid[row].length - 1; col++) {
      if (grid[row][col] !== null && grid[row][col] === grid[row][col + 1]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            console.log('horizontal match', row, col - i);
            matches.push({row, col: col - i});
          }
        }
        matchLength = 1;
      }
    }

    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        console.log('horizontal match', row, grid[row].length - 1 - i);
        matches.push({row: row, col: grid[row].length - 1 - i});
      }
    }
  }

  // check for vertical matches (3 or more candies in a row)

  for (let col = 0; col < grid[0].length; col++) {
    let matchLength = 1;
    for (let row = 0; row < grid.length - 1; row++) {
      if (grid[row][col] !== null && grid[row][col] === grid[row + 1][col]) {
        matchLength++;
      } else {
        if (matchLength >= 3) {
          for (let i = 0; i < matchLength; i++) {
            console.log('vert match', row, col - i);
            matches.push({row: row - i, col: col});
          }
        }
        matchLength = 1;
      }
    }

    if (matchLength >= 3) {
      for (let i = 0; i < matchLength; i++) {
        console.log('vertically match', col, grid[col].length - 1 - i);
        //
        matches.push({row: grid.length - 1 - i, col: col});
      }
    }
  }

  console.log('matches', matches);

  return matches;
};

// This function is used to shift candies down in the grid. It takes a grid as an argument and returns a new grid with the candies shifted down. The function loops through each column in the grid and shifts the candies down by moving non-null candies
export const clearMatches = async (
  grid: any[][],
  matches: {row: number; col: number}[],
) => {
  matches.forEach(matche => {
    grid[matche.row][matche.col] = 0;
  });
  console.log('grid after clear', grid);
  return grid;
};

//
export const shiftCandiesDown = async (grid: any[][]) => {
  for (let col = 0; col < grid[0].length; col++) {
    let emptyRow = grid.length - 1;

    for (let row = grid.length - 1; row >= 0; row--) {
      if (grid[row][col] !== null && grid[row][col] !== 0) {
        if (emptyRow !== row) {
          grid[emptyRow][col] = grid[row][col];
          grid[row][col] = 0;
        }
        emptyRow--;
      } else if (grid[row][col] === null) {
        emptyRow = row - 1;
      }
    }
  }

  return grid;
};

//
export const fillRandomCandies = async (grid: any[][]) => {
  const candyTypes = [1, 2, 3, 4, 5];
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 0; row < grid.length - 1; row++) {
      if (grid[row][col] !== null && grid[row][col] === 0) {
        const randomCandy =
          candyTypes[Math.floor(Math.random() * candyTypes.length)];
        grid[row][col] = randomCandy;
      }
    }
  }

  return grid;
};

//
export const checkForPossibleMoves = async (
  grid: any[][],
): Promise<boolean> => {
  const rl = grid.length;
  const cl = grid[0].length;

  //   with using thrid variable, we can swap it throught this method.....
  const swap = (r1: number, c1: number, r2: number, c2: number) => {
    const temp = grid[r1][c1];
    grid[r1][c1] = grid[r2][c2];
    grid[r2][c1] = temp;
  };

  for (let row = 0; row < rl; row++) {
    for (let col = 0; col < cl; col++) {
      if (grid[row][col] === null) continue;

      //   horizational swapping
      if (col + 1 < cl && grid[row][col + 1] !== null) {
        swap(row, col, row, col + 1);
        if ((await checkForMatches(grid)).length > 0) {
          swap(row, col, row, col + 1);
          return true;
        }
        swap(row, col, row, col + 1);
      }

      //   Vitically swapping
      if (row + 1 < rl && grid[row + 1][col] !== null) {
        swap(row, col, row + 1, col);
        if ((await checkForMatches(grid)).length > 0) {
          swap(row, col, row + 1, col);
          return true;
        }
        swap(row, col, row + 1, col);
      }
    }
  }

  console.log('No Possible Moves Founds');
  return false;
};

//
export const Suffle = async (grid: any[][]) => {
  console.log('Shuffling Grid....');
  const candies = grid.flat().filter(cell => cell !== null);
  const rowlength = grid.length;
  const collength = grid[0].length;

  for (let i = candies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i + 1);
    [candies[i], candies[j]] = [candies[i], candies[j]];
  }

  let index = 0;
  for (let row = 0; row < rowlength; row++) {
    for (let col = 0; col < collength; col++) {
      if (grid[row][col] !== null) {
        grid[row][col] = candies[index++];
      }
    }
  }

  return grid;
};

export const handleSuffleAndClear = async (gird: any[][]) => {};
