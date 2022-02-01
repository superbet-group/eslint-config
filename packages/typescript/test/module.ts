export const sqrt = (x: number): number => Math.sqrt(x);

// function that takes 2 2D arrays and returns a 2D array of the sum of them
export const merge2DArrays = (a: number[][], b: number[][]): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i += 1) {
    const row: number[] = [];
    for (let j = 0; j < a[i].length; j += 1) {
      row.push(a[i][j] + b[i][j]);
    }
    result.push(row);
  }
  return result;
};
