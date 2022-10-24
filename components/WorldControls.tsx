import { Button, Divider, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import { FC, useContext } from "react";
import { WorldContext } from "../utils/context/WorldContextProvider";
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  MAX_COLLAPSE_INTERVAL,
  MAX_HEIGHT,
  MAX_MIN_ENTROPY_RANGE,
  MAX_WIDTH,
  MIN_COLLAPSE_INTERVAL,
  MIN_HEIGHT,
  MIN_MIN_ENTROPY_RANGE,
  MIN_WIDTH,
} from "../utils/worldConfigs";
import Paper from "./Paper";
import SliderInput from "./SliderInput";

type Props = {};

const WorldControls: FC<Props> = ({}) => {
  const {
    width,
    setWidth,
    height,
    setHeight,
    minEntropyRange,
    setMinEntropyRange,
    collapseInterval,
    setCollapseInterval,
    displayMode,
    setDisplayMode,
    resetWorld,
  } = useContext(WorldContext);

  return (
    <Stack direction={["column", "column", "row"]} gap="2">
      <Paper flex="1">
        <Text fontSize="lg" fontWeight="bold" textAlign="center" pb="2">
          Collapse Settings
        </Text>
        <VStack w="full" alignItems="stretch">
          <Divider />
          <Text>Collapse Inverval (ms)</Text>
          <SliderInput
            value={collapseInterval}
            setValue={setCollapseInterval}
            min={MIN_COLLAPSE_INTERVAL}
            max={MAX_COLLAPSE_INTERVAL}
            step={0.1}
          />
          <Divider />
          <Text>Collapse Leniency</Text>
          <SliderInput
            value={minEntropyRange}
            setValue={setMinEntropyRange}
            min={MIN_MIN_ENTROPY_RANGE}
            max={MAX_MIN_ENTROPY_RANGE}
            step={0.0001}
          />
          <Divider />
          <Button
            onClick={() => {
              resetWorld();
            }}
          >
            Reset World
          </Button>
        </VStack>
      </Paper>

      <Paper flex="1">
        <Text fontSize="lg" fontWeight="bold" textAlign="center" pb="2">
          Display Settings
        </Text>
        <VStack w="full" alignItems="stretch">
          <Divider />
          <Button
            isActive={displayMode === "biome"}
            onClick={() => {
              setDisplayMode("biome");
            }}
          >
            Biome
          </Button>
          <Button
            isActive={displayMode === "domain"}
            onClick={() => {
              setDisplayMode("domain");
            }}
          >
            Possibilities
          </Button>
          <Button
            isActive={displayMode === "entropy"}
            onClick={() => {
              setDisplayMode("entropy");
            }}
          >
            Entropy
          </Button>
        </VStack>
      </Paper>

      <Paper flex="1">
        <Text fontSize="lg" fontWeight="bold" textAlign="center" pb="2">
          World Settings
        </Text>
        <VStack w="full" alignItems="stretch">
          <Divider />
          <Text>World Width</Text>
          <SliderInput
            value={width}
            setValue={setWidth}
            min={MIN_WIDTH}
            max={MAX_WIDTH}
            step={1}
            isInt
          />

          <Text>World Height</Text>
          <SliderInput
            value={height}
            setValue={setHeight}
            min={MIN_HEIGHT}
            max={MAX_HEIGHT}
            step={1}
            isInt
          />

          <Button
            onClick={() => {
              setWidth(DEFAULT_WIDTH);
              setHeight(DEFAULT_HEIGHT);
            }}
          >
            Reset Dimensions
          </Button>
        </VStack>
      </Paper>
    </Stack>
  );
};

export default WorldControls;
