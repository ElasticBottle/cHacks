import React, { useEffect, useRef, useState } from "react";

function Map({
  center,
  userLocations,
}: {
  center: google.maps.LatLngLiteral;
  userLocations: any;
}) {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [gmap, setGmap] = useState<google.maps.Map | undefined>(undefined);

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
    setGmap(map);
  }, [center.lat, center.lng]);
  useEffect(() => {
    if (!userLocations || !gmap) {
      return;
    }
    for (let location of userLocations) {
      const result: string[] = location.location.split(",");

      const long = parseFloat(result[0].substring(1));
      const lat = parseFloat(result[1].slice(0, -1));
      new google.maps.Marker({
        position: {
          lng: long,
          lat: lat,
        },
        map: gmap,
        title: location.location,
      });
    }
  }, [gmap, userLocations]);
  return (
    <div
      style={{ height: "calc(100vh - 56px)", width: "100vw" }}
      ref={ref}
      id="map"
    />
  );
}

export default React.memo(Map);
