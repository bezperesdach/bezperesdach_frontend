import React from "react";
import { motion, Transition, SVGMotionProps } from "framer-motion";

interface LineProps extends SVGMotionProps<SVGLineElement> {
  initial: string;
  animate: string;
  transition: Transition;
}

interface Props extends SVGMotionProps<SVGSVGElement> {
  isOpen?: boolean;
  color?: string;
  strokeWidth?: string | number;
  transition?: Transition;
  lineProps?: LineProps;
  width?: number;
  height?: number;
}

const MenuButton = ({
  isOpen = false,
  width = 32,
  height = 32,
  strokeWidth = 1,
  color = "#000",
  transition = { ease: "easeOut" },
  lineProps,
  ...props
}: Props) => {
  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
      transition: { duration: 0.15 },
    },
    opened: {
      rotate: 45,
      translateY: 2,
      transition: { duration: 0.25 },
    },
  };
  const center = {
    closed: {
      opacity: 1,
      transition: { duration: 0.15 },
    },
    opened: {
      opacity: 0,
      transition: { duration: 0.25 },
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
      transition: { duration: 0.15 },
    },
    opened: {
      rotate: -45,
      translateY: -2,
      transition: { duration: 0.25 },
    },
  };
  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  };
  const unitHeight = 4;
  const unitWidth = (unitHeight * (width as number)) / (height as number);

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      aria-label="toggle menu"
      {...props}
    >
      <motion.line x1="0" x2={unitWidth} y1="0" y2="0" variants={top} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="2" y2="2" variants={center} {...lineProps} />
      <motion.line x1="0" x2={unitWidth} y1="4" y2="4" variants={bottom} {...lineProps} />
    </motion.svg>
  );
};

export { MenuButton };
