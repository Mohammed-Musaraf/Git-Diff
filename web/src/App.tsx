import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import CommitHeader from "./CommitHeader";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { bodyTextStyle, monoSpaceStyle, textColor } from "./style";

const hunk = [
  {
    header: "@@ -0,0 +27,11 @@",
    lines: [
      {
        baseLineNumber: 1,
        headLineNumber: 1,
        content: "@@ -28,9 +28,6 @@ jobs:",
      },
      {
        baseLineNumber: 2,
        headLineNumber: 2,
        content: "       - name: Build",
      },
      {
        baseLineNumber: 3,
        headLineNumber: 3,
        content: "         run: pnpm build",
      },
      {
        baseLineNumber: 4,
        headLineNumber: 4,
        content: " ",
      },
      {
        baseLineNumber: 5,
        headLineNumber: 5,
        content: "-      - name: Generate docs",
      },
      {
        baseLineNumber: 6,
        headLineNumber: 6,
        content: "-        run: pnpm build:prop-docs",
      },
      {
        baseLineNumber: 7,
        headLineNumber: 7,
        content: "-",
      },
      {
        baseLineNumber: 8,
        headLineNumber: 8,
        content: "       - name: Create release Pull Request or publish to NPM",
      },
      {
        baseLineNumber: 9,
        headLineNumber: 9,
        content: "         id: changesets",
      },
      {
        baseLineNumber: 10,
        headLineNumber: 10,
        content: "         uses: changesets/action@v1",
      },
      {
        baseLineNumber: 11,
        headLineNumber: 11,
        content: "@@ -43,16 +40,6 @@ jobs:",
      },
      {
        baseLineNumber: 12,
        headLineNumber: 12,
        content: "           NPM_TOKEN: ${{ secrets.NPM_TOKEN }}",
      },
      {
        baseLineNumber: 13,
        headLineNumber: 13,
        content: "           GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}",
      },
      {
        baseLineNumber: 14,
        headLineNumber: 14,
        content: " ",
      },
      {
        baseLineNumber: 15,
        headLineNumber: 15,
        content: "-      # - name: Create @dev release",
      },
      {
        baseLineNumber: 16,
        headLineNumber: 16,
        content: "-      #   if: steps.changesets.outputs.published != 'true'",
      },
      {
        baseLineNumber: 17,
        headLineNumber: 17,
        content: "-      #   run: |",
      },
      {
        baseLineNumber: 18,
        headLineNumber: 18,
        content: "-      #     git checkout main",
      },
      {
        baseLineNumber: 19,
        headLineNumber: 19,
        content: "-      #     pnpm version:dev",
      },
      {
        baseLineNumber: 20,
        headLineNumber: 20,
        content: "-      #     pnpm release:dev",
      },
      {
        baseLineNumber: 21,
        headLineNumber: 21,
        content: "-      #   env:",
      },
      {
        baseLineNumber: 22,
        headLineNumber: 22,
        content: "-      #     NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}",
      },
      {
        baseLineNumber: 23,
        headLineNumber: 23,
        content: "-      #     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}",
      },
      {
        baseLineNumber: 24,
        headLineNumber: 24,
        content: "-",
      },
      {
        baseLineNumber: 25,
        headLineNumber: 25,
        content: "       - name: Slack notification",
      },
      {
        baseLineNumber: 26,
        headLineNumber: 26,
        content: "         if: steps.changesets.outputs.published == 'true'",
      },
      {
        baseLineNumber: 27,
        headLineNumber: 27,
        content: "         run: pnpm slack",
      },
    ],
  },
];
function App() {
  const [count, setCount] = useState(0);

  return (
    <Box p="2rem" w="full">
      <VStack maxW="1100px" mx="auto" spacing="2rem">
        <CommitHeader />
        <Box w="full">
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <AccordionIcon color="gray.500" boxSize="4" />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    color={textColor.link}
                    sx={bodyTextStyle}
                  >
                    enterprise/internal/first/path/first_file.go
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                p="4px"
                border="1px"
                borderRadius="2px"
                borderColor="#EFEBF1"
              >
                {hunk.map(({ header, lines }, index) => {
                  return (
                    <Box key={index}>
                      <Text sx={monoSpaceStyle}>{header}</Text>
                      {lines.map((line) => {
                        return (
                          <HStack w="full" alignItems="flex-start">
                            <Text>{line.baseLineNumber}</Text>
                            <Text>{line.baseLineNumber}</Text>
                            <Text>{line.content}</Text>
                          </HStack>
                        );
                      })}
                    </Box>
                  );
                })}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <AccordionIcon color="gray.500" boxSize="4" />
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    color={textColor.link}
                    sx={bodyTextStyle}
                  >
                    enterprise/internal/second/path/second_file.go
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                p="4px"
                border="1px"
                borderRadius="2px"
                borderColor="#EFEBF1"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
