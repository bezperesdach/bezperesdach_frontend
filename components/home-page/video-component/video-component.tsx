import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduce-motion/use-prefers-reduce-motion";

type Props = {
  className?: string;
  videoMov?: string;
  videoWebm?: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoComponent = ({ className, videoMov, videoWebm, isVisible, setIsVisible }: Props) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [domLoaded, setDomLoaded] = useState(false);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setDomLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check if video can be played and show it
  const loaded = () => {
    const player = videoPlayerRef.current;
    if (player) {
      setTimeout(() => {
        const promise = player.play();
        if (promise.then) {
          promise.then(() => setIsVisible(true)).catch(() => setIsVisible(false));
        }
      }, 300);
    }
  };

  return (
    <>
      {domLoaded && !prefersReducedMotion && (
        <video
          className={className}
          loop
          muted
          autoPlay
          ref={videoPlayerRef}
          disablePictureInPicture
          playsInline
          style={{ top: isVisible ? "0" : "300%" }}
          onLoadedData={loaded}
        >
          <source src={videoMov} type="video/quicktime" />
          <source src={videoWebm} type="video/webm" />
        </video>
      )}
    </>
  );
};

export default VideoComponent;
