import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  DIRECTIONS,
  WorldContext,
} from "../utils/context/WorldContextProvider";

type Props = {};

const Rules = (props: Props) => {
  const { sample } = useContext(WorldContext);
  const { palette, rules } = sample;

  return (
    <Accordion allowMultiple>
      {palette.map((tile, tileIndex) => (
        <AccordionItem key={tileIndex}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text>{tile}</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack>
              {palette.map((adjTile, adjTileIndex) => (
                <Box key={adjTileIndex}>
                  <HStack>
                    <Text>{adjTile}</Text>
                    <Divider />
                    {DIRECTIONS.map((direction, directionIndex) => {
                      if (rules?.[tileIndex]?.[adjTileIndex]?.[direction]) {
                        return (
                          <Text key={directionIndex}>{`${direction}`}</Text>
                        );
                      }
                    })}
                  </HStack>
                </Box>
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Rules;
