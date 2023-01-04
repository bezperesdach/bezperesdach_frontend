import heroAnimated from "public/assets/images/hero/hero.mp4";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
};

const HeroAnimated = ({ className, isLoaded, setLoaded }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          src={heroAnimated}
          style={{ visibility: !isLoaded ? "hidden" : "visible" }}
          onLoadedData={() => setLoaded(true)}
          onAbort={() => setLoaded(false)}
          onPause={() => setLoaded(false)}
        />
      )}
    </>
  );
};

export default HeroAnimated;
