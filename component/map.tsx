import { useRef, useEffect } from "react";

function Map({
    center,
    zoom,
  }: {
    center: google.maps.LatLngLiteral;
    zoom: number;
  }) {
    const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  
    useEffect(() => {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    });
  
    return <div ref={ref} id="map" />;
  }

  export default Map;