import { Box, BoxProps } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = BoxProps;

const Paper: FC<Props> = (props) => {
  return <Box boxShadow="md" p="4" rounded="md" bgColor="white" {...props} />;
};

export default Paper;
