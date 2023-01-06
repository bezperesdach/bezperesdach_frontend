import { useEffect, useState } from "react";

type Props = {
  className?: string;
  videoMov?: string;
  videoWebm?: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const VideoComponent = ({ className, videoMov, videoWebm, isVisible, setIsVisible }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loaded = () => {
    setTimeout(() => setIsVisible(true), 100);
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
