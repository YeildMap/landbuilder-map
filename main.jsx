import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default icon issue for leaflet in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            Example Marker<br />London Center.
          </Popup>
        </Marker>
      </MapContainer>
      <div style={{ position: 'absolute', top: 10, right: 10, background: 'white', padding: '10px', borderRadius: '8px' }}>
        <a href="https://www.gov.uk/guidance/permission-in-principle" target="_blank" rel="noopener noreferrer">
          Planning Permission Guide
        </a>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
