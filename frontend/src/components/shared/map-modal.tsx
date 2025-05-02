import React, { useState } from "react";
import { lazy, Suspense } from 'react';
import { useTranslation } from "react-i18next";

const DynamicMap = lazy (() => import("./leaflet-map"))
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "../../components/ui/dialog";
import Loader from "../ui/loader";
import { Button } from "../ui/button";
  
  interface Location {
    lat: number;
    lng: number;
    city: string; 
    code:string;
  }

  interface MapModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (selecting: "from" | "to", location: Location) => void;
    selecting: "from" | "to";
  }

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, onSelect, selecting }) => {
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
    const {t}= useTranslation()
    const handleMapClick = async (location: { lat: number; lng: number }) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || "Unknown Location";
            const code = data.address.country_code || "un"
            const locationWithCity: Location = { ...location, city, code };
    
            setSelectedLocation(locationWithCity);
            onSelect(selecting, locationWithCity);
        } catch (error) {
            const locationWithCity: Location = { ...location, city: "Unknown Location",code:"un" };
            setSelectedLocation(locationWithCity);
            onSelect(selecting, locationWithCity);
            console.error(error)
        }
    };
        


  const handleConfirm = () => {
    if (selectedLocation) {
      onSelect(selecting, selectedLocation);
      onClose();
    }
  };

  return (    
  <Suspense fallback={<div className="flex items-center justify-center h-screen w-full absolute bg-background z-20"><Loader/></div>}>
      <Dialog open={isOpen}  onOpenChange={onClose}>
    <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogHeader>{t("select")}</DialogHeader>
        <div className="h-[300px] w-full">
          <DynamicMap onClick={handleMapClick} selectedLocation={selectedLocation} />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="destructive">{t("close")}</Button>
          <Button onClick={handleConfirm} disabled={!selectedLocation}>{t("continue")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Suspense>
  );
};

export default MapModal;
