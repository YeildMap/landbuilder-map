import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet'

// Fix default icon issue for leaflet in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

// Sample GeoJSON zones
const planningZones = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "zone": "Residential" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-0.1, 51.51],
            [-0.1, 51.52],
            [-0.08, 51.52],
            [-0.08, 51.51],
            [-0.1, 51.51]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": { "zone": "Commercial" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-0.12, 51.5],
            [-0.12, 51.51],
            [-0.1, 51.51],
            [-0.1, 51.5],
            [-0.12, 51.5]
          ]
        ]
      }
    }
  ]
}

const zoneStyle = (feature) => {
  switch (feature.properties.zone) {
    case 'Residential': return { color: 'blue', weight: 2, fillOpacity: 0.3 }
    case 'Commercial': return { color: 'green', weight: 2, fillOpacity: 0.3 }
    default: return { color: 'gray', weight: 1, fillOpacity: 0.2 }
  }
}

const allZones = ['Residential', 'Commercial']

function LandbuilderMap() {
  const [activeZones, setActiveZones] = useState(allZones)
  const [drawnLayers, setDrawnLayers] = useState([])

  const toggleZone = (zone) => {
    if (activeZones.includes(zone)) {
      setActiveZones(activeZones.filter(z => z !== zone))
    } else {
      setActiveZones([...activeZones, zone])
    }
  }

  const filteredFeatures = planningZones.features.filter(f =>
    activeZones.includes(f.properties.zone)
  )

  const _onCreated = (e) => {
    setDrawnLayers([...drawnLayers, e.layer.toGeoJSON()])
    console.log('Created:', e.layer.toGeoJSON())
  }

  return (
    <div>
      <div className="flex gap-4 p-2">
        {allZones.map(zone => (
          <button
            key={zone}
            className={`px-4 py-1 border rounded ${
              activeZones.includes(zone) ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => toggleZone(zone)}
          >
            {zone}
          </button>
        ))}
      </div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "90vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <GeoJSON data={{ type: 'FeatureCollection', features: filteredFeatures }} style={zoneStyle} />
        <Marker position={[51.5, -0.1]}>
          <Popup>Property Marker Example</Popup>
        </Marker>
        <EditControl
          position="topright"
          onCreated={_onCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            polyline: false,
            marker: true,
            circlemarker: false,
          }}
        />
      </MapContainer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<LandbuilderMap />)
