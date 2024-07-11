import {
  HStack,
  Image,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RouteDetails } from "./App";
import { bodyTextStyle, headerTextStyle, textColor } from "./style";
import { CommitResponse } from "./types";

const CommitHeader: React.FC<Partial<RouteDetails>> = (props) => {
  const [diffCommit, setDiffCommit] = useState<CommitResponse | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const { commitSHA, owner, repository } = props;
    const serverUrl =
      import.meta.env.VITE_SERVER_URL ?? "http://localhost:3000";
    const url = `${serverUrl}/repositories/${owner}/${repository}/commits/${commitSHA}`;

    setLoading(true); 
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDiffCommit(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching the commit:", error);
        toast({
          title: "Error fetching data",
          description: "There was an error fetching the commit.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false); 
      });
  }, [props, toast]);

  if (isLoading) {
    return (
      <VStack
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner boxSize="30px" color="blue.500" />
      </VStack>
    );
  }

  if (!diffCommit) return null;
  return (
    <HStack w="full">
      <Image
        src={diffCommit.author?.avatar_url}
        alt="Dan Abramov"
        boxSize="50px"
        borderRadius="full"
        alignSelf="flex-start"
      />
      <VStack alignItems="flex-start" alignSelf="flex-start" flex={0.6}>
        <Text sx={headerTextStyle}>{diffCommit.message}</Text>
        <Text sx={bodyTextStyle} color={textColor.muted}>
          Authored by{" "}
          <span style={{ color: textColor.body }}>
            {diffCommit.author?.login}
          </span>{" "}
          four days ago
        </Text>
        <Text sx={bodyTextStyle} color={textColor.body}>
          This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Eget ipsum massa egestas id pellentesque volutpat maecenas amet.
        </Text>
      </VStack>
      {/* <VStack alignItems="flex-end" alignSelf="flex-end" flex={0.4}>
        <Text sx={bodyTextStyle} color={textColor.muted}>
          Commited by{" "}
          <span style={{ color: "#32405D" }}>{diffCommit.committer.login}</span>{" "}
          three days ago
        </Text>
        <Text sx={bodyTextStyle} color={textColor.muted}>
          Commit{" "}
          <span style={{ color: textColor.body }}>
            05f0f517a5125a2bc78cda806329017ccabd059a
          </span>
        </Text>
        <Text sx={bodyTextStyle} color={textColor.muted}>
          Parent{" "}
          <span style={{ color: textColor.link, ...linkMonoSpaceStyle }}>
            ab003b92b05f0f517a5125a2bc78cda806329017
          </span>
        </Text>
      </VStack> */}
    </HStack>
  );
};

export default CommitHeader;
