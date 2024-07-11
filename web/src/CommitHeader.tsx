import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import {
  bodyTextStyle,
  headerTextStyle,
  linkMonoSpaceStyle,
  textColor,
} from "./style";

const CommitHeader = () => {
  return (
    <HStack>
      <Image
        src="https://bit.ly/dan-abramov"
        alt="Dan Abramov"
        boxSize="50px"
        borderRadius="full"
        alignSelf="flex-start"
      />
      <VStack alignItems="flex-start" alignSelf="flex-start" flex={0.6}>
        <Text sx={headerTextStyle}>
          Remove some wrappers from a previous abstraction (#14142)
        </Text>
        <Text sx={bodyTextStyle} color={textColor.muted}>
          Authored by <span style={{ color: textColor.body }}>eseliger</span>{" "}
          four days ago
        </Text>
        <Text sx={bodyTextStyle} color={textColor.body}>
          This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Eget ipsum massa egestas id pellentesque volutpat maecenas amet.
        </Text>
      </VStack>
      <VStack alignItems="flex-end" alignSelf="flex-end" flex={0.4}>
        <Text sx={bodyTextStyle} color={textColor.muted}>
          Commited by <span style={{ color: "#32405D" }}>renovate-bot</span>
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
      </VStack>
    </HStack>
  );
};

export default CommitHeader;
