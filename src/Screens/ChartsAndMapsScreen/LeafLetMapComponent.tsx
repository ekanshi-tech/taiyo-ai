import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import { useQuery } from 'react-query';
import { leafLetMapDataType } from '../../TS/Interfaces/Leaf.left.interface';
import { useState } from 'react';

function LeafLeftMapComponent() {
  const { isLoading, data } = useQuery('leaf-let-api', () =>
    fetch('https://disease.sh/v3/covid-19/countries').then(res => res.json()),
  );

  return isLoading ? (
    <h1 className="text-center">Fetching Leftlet Data...</h1>
  ) : (
    <>
      <h1 className="mt-6 mb-4 text-2xl text-center">
        COVID-19 Data in Leaflet
      </h1>
      <div className="w-full h-[400px] overflow-hidden bg-white">
        <MapContainer
          center={{ lat: 0, lng: 0 }}
          zoom={1}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data &&
            data.map((item: leafLetMapDataType, index: number) => (
              <LocationMarker key={index} countryItem={item} />
            ))}
        </MapContainer>
      </div>
    </>
  );
}

interface LocationMarkerPropType {
  countryItem: leafLetMapDataType;
}

function LocationMarker({ countryItem }: LocationMarkerPropType) {
  const [position, setPosition] = useState({
    lat: countryItem.countryInfo.lat,
    lng: countryItem.countryInfo.long,
  });
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup className="w-[250px] text-inherit">
        <h1>Country Name: {countryItem.country}</h1>
        <p>Total Active Cases: {countryItem.active}</p>
        <p>Total Recovered Cases: {countryItem.recovered}</p>
        <p>Total Deaths Cases: {countryItem.deaths}</p>
      </Popup>
    </Marker>
  );
}

export default LeafLeftMapComponent;
