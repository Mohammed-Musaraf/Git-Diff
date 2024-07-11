import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RouteDetails } from "./App";
import { bodyTextStyle, monoSpaceStyle, textColor } from "./style";
import { CommitDifferenceResponse } from "./types";

const CommitDifference: React.FC<Partial<RouteDetails>> = (props) => {
  const [diff, setDiff] = useState<CommitDifferenceResponse[] | null>(null);
  const toast = useToast();
  useEffect(() => {
    const { commitSHA, owner, repository } = props;
    const serverUrl =
      import.meta.env.VITE_SERVER_URL ?? "http://localhost:3000";
    const url = `${serverUrl}/repositories/${owner}/${repository}/commits/${commitSHA}/diff`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setDiff(data))
      .catch((error) => {
        console.error("Error fetching the diff:", error);
        toast({
          title: "Error fetching data",
          description: "There was an error fetching the commit difference.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }, [toast]);

  if (!diff) return null;
  return (
    <Accordion
      allowMultiple
      as={VStack}
      spacing="1.5rem"
      w="full"
      alignItems="flex-start"
      mx="auto"
      defaultIndex={[0]}
    >
      {diff.map(({ baseFile, hunk }, index) => {
        return (
          <AccordionItem w="full" key={`${baseFile.path}-${index}`}>
            <h2>
              <AccordionButton pb="0.25rem">
                <AccordionIcon color="gray.500" boxSize="4" />
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color={textColor.link}
                  sx={bodyTextStyle}
                >
                  {baseFile.path}
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel
              p="0.25rem"
              border="1px"
              borderRadius="2px"
              borderColor="#EFEBF1"
            >
              {hunk.map(({ header, lines }, index) => {
                return (
                  <Box key={`${header} - ${index}`}>
                    <Text sx={monoSpaceStyle}>{header}</Text>
                    {lines.map((line, index) => {
                      const isLineDeleted = line.content.startsWith("-");
                      const isLineAdded = line.content.startsWith("+");
                      return (
                        <Grid
                          templateColumns="5ch 5ch 1fr"
                          gap={6}
                          w="full"
                          alignItems="flex-start"
                          bgColor={
                            isLineDeleted
                              ? "#FFE4E9"
                              : isLineAdded
                              ? "#D8FFCB"
                              : "white"
                          }
                          key={`${line.content}-${index}`}
                        >
                          <GridItem>
                            <Text sx={monoSpaceStyle} textAlign="right">
                              {line.baseLineNumber}
                            </Text>
                          </GridItem>
                          <GridItem>
                            {!isLineDeleted || isLineAdded ? (
                              <Text sx={monoSpaceStyle} textAlign="right">
                                {line.baseLineNumber}
                              </Text>
                            ) : null}
                          </GridItem>
                          <GridItem>
                            <Text whiteSpace="pre-wrap" sx={monoSpaceStyle}>
                              {line.content}
                            </Text>
                          </GridItem>
                        </Grid>
                      );
                    })}
                  </Box>
                );
              })}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CommitDifference;
