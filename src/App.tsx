import { useEffect, useState } from "react";

type Grid = Array<Array<number>>;

type Dir = "left" | "right" | "up" | "down";

function moveTileDown(original: number, grid: Grid, row: number, col: number) {
  if (row > 3) return grid;

  const current = grid[row][col];
  if (current !== original && current !== 0) return grid;

  grid[row][col] = current === 0 ? original : current + original;
  grid[row - 1][col] = 0;
  return moveTileDown(original, grid, row + 1, col);
}

function moveTilesDown(grid: Grid, row = 3, col = 3) {
  if (row < 0 || col < 0) return grid;

  if (grid[row][col] !== 0) {
    grid = moveTileDown(grid[row][col], grid, row + 1, col);
  }

  const _col = col === 0 ? 3 : col - 1;
  const _row = col === 0 ? row - 1 : row;

  return moveTilesDown(grid, _row, _col);
}

function moveTileUp(original: number, grid: Grid, row: number, col: number) {
  if (row < 0) return grid;

  const current = grid[row][col];
  if (current !== original && current !== 0) return grid;

  grid[row][col] = current === 0 ? original : current + original;
  grid[row + 1][col] = 0;
  return moveTileUp(original, grid, row - 1, col);
}

function moveTilesUp(grid: Grid, row = 0, col = 0) {
  if (row > 3 || col > 3) return grid;

  if (grid[row][col] !== 0) {
    grid = moveTileUp(grid[row][col], grid, row - 1, col);
  }

  const _col = col === 3 ? 0 : col + 1;
  const _row = col === 3 ? row + 1 : row;

  return moveTilesUp(grid, _row, _col);
}

function moveTileLeft(original: number, grid: Grid, row: number, col: number) {
  if (row < 0) return grid;

  const current = grid[row][col];
  if (current !== original && current !== 0) return grid;

  grid[row][col] = current === 0 ? original : current + original;
  grid[row][col + 1] = 0;
  return moveTileLeft(original, grid, row, col - 1);
}

function moveTilesLeft(grid: Grid, row = 0, col = 0) {
  if (row > 3 || col > 3) return grid;

  if (grid[row][col] !== 0) {
    grid = moveTileLeft(grid[row][col], grid, row, col - 1);
  }

  const _row = row === 3 ? 0 : row + 1;
  const _col = row === 3 ? col + 1 : col;

  return moveTilesLeft(grid, _row, _col);
}

function moveTileRight(original: number, grid: Grid, row: number, col: number) {
  if (row > 3) return grid;

  const current = grid[row][col];
  if (current !== original && current !== 0) return grid;

  grid[row][col] = current === 0 ? original : current + original;
  grid[row][col - 1] = 0;
  return moveTileRight(original, grid, row, col + 1);
}

function moveTilesRight(grid: Grid, row = 3, col = 3) {
  if (row < 0 || col < 0) return grid;

  if (grid[row][col] !== 0) {
    grid = moveTileRight(grid[row][col], grid, row, col + 1);
  }

  const _row = row === 0 ? 3 : row - 1;
  const _col = row === 0 ? col - 1 : col;

  return moveTilesRight(grid, _row, _col);
}

function moveTiles(grid: Grid, dir: Dir) {
  const newGrid = grid.map((i) => [...i]);

  switch (dir) {
    case "up":
      return moveTilesUp(newGrid);
    case "down":
      return moveTilesDown(newGrid);
    case "left":
      return moveTilesLeft(newGrid);
    case "right":
      return moveTilesRight(newGrid);
    default:
      return newGrid;
  }
}

export default function App() {
  const [grid, setGrid] = useState<Grid>([
    [0, 4, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 2, 4],
    [0, 2, 0, 0],
  ]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "A":
        case "ArrowLeft":
          setGrid((grid) => moveTiles(grid, "left"));
          return;
        case "W":
        case "ArrowUp":
          setGrid((grid) => moveTiles(grid, "up"));
          return;
        case "S":
        case "ArrowDown":
          setGrid((grid) => moveTiles(grid, "down"));
          return;
        case "D":
        case "ArrowRight":
          setGrid((grid) => moveTiles(grid, "right"));
          return;
        default:
          return;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex gap-2 flex-col">
        {grid.map((row, index) => (
          <div key={index} className="flex gap-2">
            {row.map((cell, index) => {
              return (
                <div
                  key={index}
                  className="border border-black w-20 h-20 text-4xl flex justify-center items-center"
                >
                  {cell > 0 ? cell : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// that's it for now, will find better algo for tile movement
