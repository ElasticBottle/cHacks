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
    const home = { lat: center.lat, lng: center.lng };
    const map = new window.google.maps.Map(ref.current, {
      center: home,
      zoom: 17,
    });
    new google.maps.Marker({
      position: { lat: center.lat, lng: center.lng },
      map,
      title: "Home",
    });

    /* new google.maps.Marker({
      position: { lat: -20, lng: 120 },
      map,
      title: "Marker 2",
    }); */
  }), [];

  return (
    <div
      style={{ height: "calc(100vh - 56px)", width: "100vw" }}
      ref={ref}
      id="map"
    />
  );
}

export default Map;
