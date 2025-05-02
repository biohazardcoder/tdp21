import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface LeafletMapProps {
  onClick: (location: { lat: number; lng: number }) => void;
  selectedLocation?: { lat: number; lng: number };
}

const LocationMarker: React.FC<{ onClick: (latlng: { lat: number; lng: number }) => void }> = ({
  onClick,
}) => {
  useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const LeafletMapComponent: React.FC<LeafletMapProps> = ({ onClick, selectedLocation }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>(
    selectedLocation || { lat: 41.2995, lng: 69.2401 }
  );

  return (
    <MapContainer center={position} zoom={10} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon} />
      <LocationMarker
        onClick={(latlng) => {
          setPosition(latlng);
          onClick(latlng);
        }}
      />
    </MapContainer>
  );
};

export default LeafletMapComponent;
