import Lottie from "lottie-react";
// import { useEffect } from "react";
import heroAnimated from "../../../../public/assets/images/hero/Hero.json";

type Props = {
  className?: string;
};

const HeroAnimated = ({ className }: Props) => {
  return (
    <Lottie
      className={className}
      animationData={heroAnimated}
      autoPlay
      loop
      // onDOMLoaded={() => (AnimationFinishedLoading ? AnimationFinishedLoading() : undefined)}
    />
  );
};

export default HeroAnimated;
