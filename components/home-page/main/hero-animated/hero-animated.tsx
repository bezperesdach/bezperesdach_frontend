import Lottie from "@rookino/react-lottie-light";
import heroAnimated from "../../../../public/assets/images/hero/Hero.json";

type Props = {
  className?: string;
};

const HeroAnimated = ({ className }: Props) => {
  const defaultOptions = {
    animationData: heroAnimated,
    loop: true,
    autoplay: true,
    rendererSettings: {
      progressiveLoad: true,
      hideOnTransparent: true,
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie className={className} options={defaultOptions} />;
};

export default HeroAnimated;
