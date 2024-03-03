import { useEffect, useState } from "react";

import Map, {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";

const accessToken =
  "pk.eyJ1IjoiYWhtZWQtZWxkZXNva3kiLCJhIjoiY2xpM2cwYnFhMGZpMzNmbXYyMHE5anR5YSJ9.WtjeR-8o2jCLYBcLiZUf7w";

function CustomMap({
  width = "100%",
  height = "100%",
  location,
  zoom = 6,
  draggable = true,
  setLocation = () => {},
}) {
  const [viewState, setViewState] = useState({
    longitude: location?.long,
    latitude: location?.lat,
    zoom,
  });

  useEffect(() => {
    setLocation({
      long: viewState?.longitude,
      lat: viewState?.latitude,
    });
  }, [viewState?.latitude, viewState?.longitude]);
  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width, height }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={accessToken}
      attributionControl={true}
    >
      <FullscreenControl />
      <GeolocateControl onGeolocate={console.log} />
      <Marker
        onDragEnd={(item) => {
          setViewState({
            ...viewState,
            longitude: item?.lngLat?.lng,
            latitude: item?.lngLat?.lat,
          });
        }}
        draggable={draggable}
        longitude={viewState?.longitude}
        latitude={viewState?.latitude}
        anchor="bottom"
      >
        <img
          src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png"
          style={{ width: "3rem", height: "3rem" }}
        />
      </Marker>
      <AttributionControl customAttribution="Map design by Ahmed Eldesouky" />
    </Map>
  );
}

export default CustomMap;
