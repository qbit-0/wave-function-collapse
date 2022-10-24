import { Box, Flex, HStack } from "@chakra-ui/react";
import WorldContextProvider from "../utils/context/WorldContextProvider";
import {
  DEFAULT_COLLAPSE_INTERVAL,
  DEFAULT_HEIGHT,
  DEFAULT_MIN_ENTROPY_RANGE,
  DEFAULT_RATIO_ADHERENCE,
  DEFAULT_RULES,
  DEFAULT_TILESET,
  DEFAULT_WIDTH,
} from "../utils/worldConfigs";
import Paper from "./Paper";
import WorldContainer from "./WorldContainer";
import WorldControls from "./WorldControls";

type Props = {};

const Demo = (props: Props) => {
  return (
    <WorldContextProvider
      initialWidth={DEFAULT_WIDTH}
      initialHeight={DEFAULT_HEIGHT}
      initialTileset={DEFAULT_TILESET}
      initialRules={DEFAULT_RULES}
      initialRatioAdherence={DEFAULT_RATIO_ADHERENCE}
      initialMinEntropyRange={DEFAULT_MIN_ENTROPY_RANGE}
      initialPauseCollapse={false}
      initialCollapseInteval={DEFAULT_COLLAPSE_INTERVAL}
      initialDisplayMode={"biome"}
    >
      <Paper p="2" overflow="clip">
        <WorldContainer />
      </Paper>
      <Box mt="4">
        <WorldControls />
      </Box>
    </WorldContextProvider>
  );
};

export default Demo;
