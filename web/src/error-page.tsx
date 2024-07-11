import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  return (
    <Flex
      width="100%"
      height="100vh"
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="xl" mb={4} textAlign="center">
        Oops! Something went wrong.
      </Heading>
      <Text fontSize="lg" textAlign="center">
        Error {error?.statusText}: {error?.message}
      </Text>
    </Flex>
  );
}
