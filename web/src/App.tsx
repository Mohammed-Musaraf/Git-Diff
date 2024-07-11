import { Box, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CommitDifference from "./CommitDifference";
import CommitHeader from "./CommitHeader";

export interface RouteDetails {
  owner: string;
  repository: string;
  commitSHA: string;
}

function App() {
  const { commitSHA, owner, repository } = useParams();
  return (
    <Box p="2rem" w="full">
      <VStack maxW="1100px" mx="auto" spacing="2rem">
        <CommitHeader {...{ commitSHA, owner, repository }} />
        <CommitDifference {...{ commitSHA, owner, repository }} />
      </VStack>
    </Box>
  );
}

export default App;
