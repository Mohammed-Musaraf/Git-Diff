import { ButtonProps } from "@chakra-ui/react";

const extendedSize = ["slim", "medium", "large"] as const;
type ExtendedButtonSize = (typeof extendedSize)[number];

type ButtonSizeType = {
  [key in ExtendedButtonSize]: ButtonProps;
};

export const buttonSizes: ButtonSizeType = {
  slim: {
    height: "24px",
    fontSize: "xs",
    fontWeight: "medium",
    padding: "4px 8px",
  },
  medium: {
    height: "32px",
    fontSize: "sm",
    fontWeight: "medium",
    padding: "8px 8px",
  },
  large: {
    height: "40px",
    fontSize: "md",
    fontWeight: "medium",
    padding: "8px 16px",
  },
};

const defaultSytles: ButtonProps = {
  borderRadius: "4px",
};

const extendedVariants = [
  "primary",
  "secondary",
  "destructive",
  "hyperlink",
] as const;
export type ExtendedButtonVariants = (typeof extendedVariants)[number];

type ButtonVariantsType = {
  [key in ExtendedButtonVariants]: ButtonProps;
};


export const buttonVariants: ButtonVariantsType = {
  primary: {
    ...defaultSytles,
    color: "white",
    backgroundColor: "brand.500",
    _hover: {
      backgroundColor: "brand.600",
    },
    _active: {
      backgroundColor: "brand.700",
    },
    _disabled: {
      backgroundColor: "brand.100 !important",
    },
  },
  secondary: {
    ...defaultSytles,
    color: "gray.600",
    backgroundColor: "white",
    border: "1px solid",
    borderColor: "gray.200",
    _hover: {
      backgroundColor: "gray.200",
    },
    _active: {
      backgroundColor: "gray.400",
    },
    _disabled: {
      backgroundColor: "gray.100 !important",
    },
  },
  destructive: {
    ...defaultSytles,
    color: "white",
    backgroundColor: "red.500",
    _hover: {
      backgroundColor: "red.600",
    },
    _active: {
      backgroundColor: "red.700",
    },
    _disabled: {
      backgroundColor: "red.100 !important",
    },
  },
  hyperlink: {
    ...defaultSytles,
    color: "blue.500",
    _hover: {
      color: "blue.600",
    },
    _active: {
      color: "blue.700",
    },
    _disabled: {
      color: "blue.100 !important",
    },
  },
};
