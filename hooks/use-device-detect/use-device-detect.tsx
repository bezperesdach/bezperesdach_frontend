import React from "react";

export default function useDeviceDetect(query?: string) {
  const [isMobile, setMobile] = React.useState(true);

  React.useEffect(() => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = query
      ? Boolean(userAgent.toLowerCase().match(query.toLowerCase()))
      : Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    setMobile(mobile);
  }, [query]);

  return { isMobile };
}
