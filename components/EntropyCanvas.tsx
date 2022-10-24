import { useInterval } from "@chakra-ui/react";
import { FC, useContext, useEffect, useRef } from "react";
import { WorldContext } from "../utils/context/WorldContextProvider";
import { scale } from "../utils/scale";
import { getCell, getEntropy, World } from "../utils/WaveFunctionCollapse";

const getTilesize = (canvas: HTMLCanvasElement, world: World) => {
  const { width, height } = world;

  let tileSize: number;
  if (width / height < canvas.width / canvas.height) {
    tileSize = canvas.height / height;
  } else {
    tileSize = canvas.width / width;
  }
  const offsetX = (canvas.width - width * tileSize) / 2;
  const offsetY = (canvas.height - height * tileSize) / 2;

  return { tileSize, offsetX, offsetY };
};

const clearCanvas = (canvas: HTMLCanvasElement, world: World) => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const { width, height } = world;

  canvas.width = canvas.parentElement!.offsetWidth;
  canvas.height = canvas.parentElement!.offsetHeight;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const { tileSize, offsetX, offsetY } = getTilesize(canvas, world);

  ctx.fillStyle = "black";
  ctx.fillRect(offsetX, offsetY, width * tileSize, height * tileSize);
};

const drawEntropies = (canvas: HTMLCanvasElement, world: World) => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const { width, height, tileset, entropies } = world;

  const { tileSize, offsetX, offsetY } = getTilesize(canvas, world);

  const initialEntropy = getEntropy(
    tileset.tiles.map((tile) => tile.ratio),
    tileset
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const entropy = getCell(x, y, entropies, world);
      ctx.fillStyle = `hsl(${scale(
        entropy / initialEntropy,
        0,
        1,
        240,
        0
      )}deg 100% 50%)`;
      ctx.fillRect(
        x * tileSize + offsetX,
        y * tileSize + offsetY,
        tileSize,
        tileSize
      );
    }
  }
};

type Props = {};

const EntropyCanvas: FC<Props> = ({}) => {
  const { world } = useContext(WorldContext);
  const { width, height } = world;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    clearCanvas(canvas, world);
  }, [world, width, height]);

  useInterval(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    clearCanvas(canvas, world);
    drawEntropies(canvas, world);
  }, 33);

  return <canvas ref={canvasRef} />;
};

export default EntropyCanvas;
