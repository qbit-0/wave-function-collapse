import { Box, useInterval } from "@chakra-ui/react";
import { useContext } from "react";
import { WorldContext } from "../utils/context/WorldContextProvider";
import { collapseLowestEntropyCell } from "../utils/WaveFunctionCollapse";
import DomainCanvas from "./DomainCanvas";
import EntropyCanvas from "./EntropyCanvas";

const MAX_INTERVAL = 30;

type Props = {};

const WorldContainer = () => {
  const {
    world,
    pauseCollapse,
    collapseInterval,
    displayMode: display,
  } = useContext(WorldContext);

  const clampedInterval =
    collapseInterval < MAX_INTERVAL ? MAX_INTERVAL : collapseInterval;

  useInterval(
    () => {
      if (world && world.entropies.some((entropy) => entropy > 0)) {
        for (let i = 0; i < clampedInterval / collapseInterval; i++) {
          collapseLowestEntropyCell(world);
        }
      }
    },
    pauseCollapse ? 0 : clampedInterval
  );

  if (!world) {
    return null;
  }

  let canvas;
  switch (display) {
    case "biome":
      canvas = <DomainCanvas />;
      break;
    case "domain":
      canvas = <DomainCanvas onlyShowCollapsed={false} />;
      break;
    case "entropy":
      canvas = <EntropyCanvas />;
      break;
  }

  return <Box height="500">{canvas}</Box>;
};

export default WorldContainer;
