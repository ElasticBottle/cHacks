import React, { useEffect, useRef } from "react";

function Map({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const uluru = { lat: -25.344, lng: 131.036 };
    const map = new window.google.maps.Map(ref.current, {
      center: uluru,
      zoom: 6,
    });
    new google.maps.Marker({
      position: { lat: -25.344, lng: 131.036 },
      map,
      title: "Hello World!",
    });

    new google.maps.Marker({
      position: { lat: -20, lng: 120 },
      map,
      title: "Marker 2",
    });
  });

  return (
    <div
      style={{ minHeight: "calc(100vh - 56px)", minWidth: "100%" }}
      ref={ref}
      id="map"
    />
  );
}

export default Map;
