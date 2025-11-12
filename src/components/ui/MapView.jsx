import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useReport } from '../../context/ReportContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapView() {
  const { reports } = useReport();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <MapContainer center={[12.7311, 121.4156]} zoom={13} style={{ height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {reports
          .filter((r) => typeof r.lat === 'number' && typeof r.lng === 'number')
          .map((r) => (
          <Marker key={r.id} position={[r.lat, r.lng]}>
            <Popup>
              <strong>{r.location}</strong><br />
              {r.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}