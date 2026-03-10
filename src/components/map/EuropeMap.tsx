"use client";

import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useCallback } from "react";
import L from "leaflet";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { Layer, PathOptions } from "leaflet";
import "leaflet/dist/leaflet.css";

interface RegionProperties {
  id: string;
  name: string;
  color: string;
}

interface EuropeMapProps {
  geoData: FeatureCollection;
  selectedRegionId: string | null;
  onRegionSelect: (regionId: string) => void;
}

export default function EuropeMap({
  geoData,
  selectedRegionId,
  onRegionSelect,
}: EuropeMapProps) {
  const getStyle = useCallback(
    (feature?: Feature<Geometry, RegionProperties>): PathOptions => {
      if (!feature?.properties) return {};
      const { id, color } = feature.properties;
      const isSelected = id === selectedRegionId;

      return {
        fillColor: color,
        fillOpacity: isSelected ? 0.5 : 0.2,
        color: isSelected ? color : "#8896AA",
        weight: isSelected ? 3 : 1,
        opacity: 1,
        className: "cursor-pointer",
      };
    },
    [selectedRegionId]
  );

  const onEachFeature = useCallback(
    (feature: Feature<Geometry, RegionProperties>, layer: Layer) => {
      const name = feature.properties?.name || "";

      layer.bindTooltip(name, {
        sticky: true,
        className: "region-tooltip",
        direction: "top",
      });

      layer.on({
        mouseover: (e) => {
          const target = e.target as L.Path;
          target.setStyle({
            fillOpacity: 0.4,
            weight: 2.5,
            color: feature.properties.color,
          });
        },
        mouseout: (e) => {
          const target = e.target as L.Path;
          const isSelected = feature.properties.id === selectedRegionId;
          target.setStyle({
            fillOpacity: isSelected ? 0.5 : 0.2,
            weight: isSelected ? 3 : 1,
            color: isSelected ? feature.properties.color : "#8896AA",
          });
        },
        click: () => onRegionSelect(feature.properties.id),
      });
    },
    [onRegionSelect, selectedRegionId]
  );

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--color-surface-200)]">
      <style>{`
        .region-tooltip {
          background: #0A1128;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .region-tooltip::before {
          border-top-color: #0A1128 !important;
        }
        .leaflet-interactive.cursor-pointer {
          cursor: pointer;
        }
      `}</style>
      <MapContainer
        center={[50, 10]}
        zoom={4}
        minZoom={3}
        maxZoom={7}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
        style={{ background: "#E8ECF0" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          pane="tooltipPane"
        />
        <GeoJSON
          key={selectedRegionId || "none"}
          data={geoData}
          style={getStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
