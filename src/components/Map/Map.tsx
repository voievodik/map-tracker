import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
} from 'react-leaflet';
import { questQueue } from '../../data-structure';
import { updateQuests, getQuests, initializeQuests } from '../../api/quest';
import { LocationType } from '../../types/LocationType';
import { QuestResponseType } from '../../types/QuestResponseType';
import { QuestsType } from '../../types/QuestsType';

export const Map = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [dataQuests, setDataQuests] = useState<QuestResponseType | null>(null);
  const [visibleQuests, setVisibleQuests] = useState<QuestsType[]>([]);

  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        const newLocation = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };

        setLocation(newLocation);
      },
    });

    return null;
  };

  useEffect(() => {
    initializeQuests();
  }, []);

  useEffect(() => {
    if (location) {
      questQueue.enqueue(location, (new Date()).toString());
    }

    getQuests().then(setDataQuests);
    updateQuests();
  }, [location]);

  useEffect(() => {
    const result: QuestsType[] = [];

    if (dataQuests) {
      let currentData = dataQuests;

      while (currentData) {
        result.push({
          id: uuid(),
          location: currentData.location,
          timestamp: currentData.timestamp,
        });

        currentData = currentData.next;
      }
    }

    setVisibleQuests(result);
  }, [dataQuests]);

  return (
    <MapContainer
      center={[49.84675013911866, 24.010410352608236]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <LocationFinderDummy />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {visibleQuests.map((item, index) => (
        <Marker key={item.id} position={[item.location.lat, item.location.lng]}>
          <Tooltip
            direction="top"
            offset={[-15, -15]}
            permanent
          >
            {index + 1}
          </Tooltip>
          <Popup>
            {item.timestamp}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
