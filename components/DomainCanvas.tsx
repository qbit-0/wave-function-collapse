import { useInterval } from "@chakra-ui/react";
import { FC, useContext, useEffect, useMemo, useRef } from "react";
import { WorldContext } from "../utils/context/WorldContextProvider";
import { getCell, World } from "../utils/WaveFunctionCollapse";

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

const drawDomains = (canvas: HTMLCanvasElement, world: World) => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const { width, height, tileset, domains } = world;

  const { tileSize, offsetX, offsetY } = getTilesize(canvas, world);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const domain = getCell(x, y, domains, world);
      if (!domain) return;
      domain.forEach((tileProb, tileId) => {
        if (tileProb !== 1) return;
        ctx.globalAlpha = tileProb;
        ctx.fillStyle = tileset.tiles[tileId].value;
        ctx.fillRect(
          x * tileSize + offsetX,
          y * tileSize + offsetY,
          tileSize,
          tileSize
        );
      });
      ctx.globalAlpha = 1;
    }
  }
};

type Props = {};

const DomainCanvas: FC<Props> = ({}) => {
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
    drawDomains(canvas, world);
  }, 33);

  return <canvas ref={canvasRef} />;
};

export default DomainCanvas;
