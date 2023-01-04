import heroAnimated from "public/assets/images/hero/hero.mp4";
import { useEffect, useState } from "react";
import useDeviceDetect from "../../../../hooks/use-device-detect/use-device-detect";

type Props = {
  className?: string;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
};

const HeroAnimated = ({ className, isLoaded, setLoaded }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    setDomLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {domLoaded && !isMobile && (
        <video
          className={className}
          loop
          muted
          autoPlay
          disablePictureInPicture
          playsInline
          style={{ visibility: !isLoaded ? "hidden" : "visible" }}
          onLoadedData={() => setLoaded(true)}
        >
          <source src={heroAnimated} type="video/mp4" />
        </video>
      )}
    </>
  );
};

export default HeroAnimated;
