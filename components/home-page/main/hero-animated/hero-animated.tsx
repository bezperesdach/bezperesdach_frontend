import heroAnimated from "public/assets/images/hero/hero.mp4";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
};

const HeroAnimated = ({ className, isLoaded, setLoaded }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [ableToView, setAbleToView] = useState(false);
  // const { isMobile } = useDeviceDetect();

  useEffect(() => {
    setDomLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (isLoaded) {
  //     setTimeout(() => setAbleToView(true), 1000);
  //   }
  // }, [isLoaded]);

  const loaded = () => {
    setTimeout(() => setAbleToView(true), 1000);
  };

  return (
    <>
      {domLoaded && (
        <video
          className={className}
          loop
          muted
          autoPlay
          disablePictureInPicture
          playsInline
          style={{ top: ableToView ? "0" : "300%" }}
          onLoadedData={loaded}
        >
          <source src={heroAnimated} type="video/mp4" />
        </video>
      )}
    </>
  );
};

export default HeroAnimated;
