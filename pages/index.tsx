import { Box, Container, Link, Text, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Demo from "../components/Demo";
import Paper from "../components/Paper";

const Home: NextPage = () => {
  return (
    <Box bgColor="gray.100">
      <Head>
        <title>Collapse</title>
      </Head>
      <Container maxW="8xl" pt="4" mb="4">
        <Paper>
          <Text fontSize="4xl" fontWeight="black">
            Collapse
          </Text>
          <Text fontSize="xl" fontWeight="thin">
            Generate Procedural Worlds With Wave-Function Collapse
          </Text>
        </Paper>
      </Container>
      <Container maxW="8xl">
        <Demo />
      </Container>
      <Container maxW="8xl" my="4">
        <Paper>
          <Text>
            {`Wave-function collapse is a proceedural generation technique very loosely inspired by wave-function collapse in quantum mechanics.`}
          </Text>
          <Text>
            Imagine that we have grass tiles, sand tiles, and water tiles.
          </Text>
          <Box p="8">
            <Box>
              <Text>Let the constraints be as follows:</Text>
              <Text>Grass can only be adjacent to coast.</Text>
              <Text>Sand can be adjacent to both grass and water.</Text>
              <Text>Water can only be adjacent to sand.</Text>
            </Box>
          </Box>
          <Text>
            In the beginning, every tile can be anything. Force a tile to
            collapse to select a possibility at random. This reduces the
            possible adjacent tiles. Repeat this until all tiles are filled.
          </Text>

          <Text>This project was inspired by:</Text>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/20KHNA9jTsE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Paper>
      </Container>
      <footer>
        <Container maxW="8xl" my="4">
          <Paper>
            <Text>
              Created by{" "}
              <Link href="https://www.duypham.tech/" target="_blank">
                Duy Pham
              </Link>
              .
            </Text>
            <Text>
              <Link
                href="https://github.com/qbit-0/wave-function-collapse"
                target="_blank"
              >
                Source code
              </Link>{" "}
              for the curious.
            </Text>
          </Paper>
        </Container>
      </footer>
    </Box>
  );
};

export default Home;
