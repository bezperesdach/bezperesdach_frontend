import Lottie from "@rookino/react-lottie-light";
import { useEffect } from "react";
import heroAnimated from "../../../../public/assets/images/hero/hero.json";

type Props = {
  className?: string;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeroAnimated = ({ className, setLoaded }: Props) => {
  useEffect(() => {
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
