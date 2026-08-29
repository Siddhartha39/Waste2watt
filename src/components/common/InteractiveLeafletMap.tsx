import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { COMMUNITY_LOCATIONS } from '../../data/mockLocations';
import { WasteReport } from '../../types';

interface InteractiveLeafletMapProps {
  reports?: WasteReport[];
  center?: [number, number];
  zoom?: number;
  showRoute?: boolean;
  activeReportId?: string;
  onSelectReport?: (reportId: string) => void;
  className?: string;
  height?: string;
}

export const InteractiveLeafletMap: React.FC<InteractiveLeafletMapProps> = ({
  reports,
  center = [26.1878, 91.6916], // IIT Guwahati Campus Coordinates
  zoom = 15,
  showRoute = false,
  activeReportId,
  onSelectReport,
  className = '',
  height = '440px',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if container re-renders
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map Instance
    const map = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom,
      zoomControl: true,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Add 100% Free & Open OpenStreetMap Tile Layer (No API Key Required)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Custom Biogas Plant Central Hub Marker
    const plantIcon = L.divIcon({
      className: 'custom-plant-pin',
      html: `
        <div style="
          background: #0b132b;
          border: 2px solid #f59e0b;
          color: #f59e0b;
          padding: 4px 8px;
          border-radius: 12px;
          font-family: monospace;
          font-size: 11px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
          white-space: nowrap;
        ">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
          Biogas Digester #1
        </div>
      `,
      iconSize: [140, 30],
      iconAnchor: [70, 15],
    });

    L.marker([26.1895, 91.693], { icon: plantIcon })
      .addTo(map)
      .bindPopup(`
        <div style="padding: 4px; font-family: sans-serif;">
          <h4 style="font-weight: bold; margin: 0 0 4px 0; color: #0f172a;">Central Biogas Digester Plant #1</h4>
          <p style="margin: 0; font-size: 11px; color: #475569;">Capacity: 500 kg/day organic intake</p>
          <span style="display: inline-block; margin-top: 4px; padding: 2px 6px; background: #ecfdf5; color: #059669; border-radius: 4px; font-size: 10px; font-weight: bold;">Active • Generating 45 kW</span>
        </div>
      `);

    // Add Waste Points Markers
    const routeLatLngs: [number, number][] = [[26.1895, 91.693]];

    if (reports && reports.length > 0) {
      reports.forEach((rep) => {
        const lat = rep.location?.lat || 26.1878;
        const lng = rep.location?.lng || 91.6916;
        routeLatLngs.push([lat, lng]);

        const isOrganic = rep.classification?.primaryCategory === 'organic';
        const isUrgent = rep.priority === 'urgent';
        const color = isUrgent ? '#ef4444' : isOrganic ? '#10b981' : '#06b6d4';

        const wasteIcon = L.divIcon({
          className: 'custom-waste-pin',
          html: `
            <div style="
              background: ${color};
              width: 22px;
              height: 22px;
              border-radius: 50%;
              border: 3px solid #ffffff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></span>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const marker = L.marker([lat, lng], { icon: wasteIcon }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 4px; font-family: sans-serif; min-width: 160px;">
            <div style="font-size: 10px; font-weight: bold; color: ${color}; text-transform: uppercase;">
              ${isUrgent ? 'Urgent Pickup' : isOrganic ? 'Organic Bio-Feedstock' : 'Recyclable Stream'}
            </div>
            <h4 style="font-weight: bold; margin: 2px 0 4px 0; color: #0f172a; font-size: 12px;">
              ${rep.location?.address || 'Waste Node'}
            </h4>
            <div style="font-size: 11px; color: #64748b;">
              Weight: <b>${rep.quantityKg} kg</b> • ${rep.status}
            </div>
          </div>
        `);

        marker.on('click', () => {
          if (onSelectReport) {
            onSelectReport(rep.id);
          }
        });
      });
    } else {
      COMMUNITY_LOCATIONS.forEach((loc, idx) => {
        const lat = loc.lat;
        const lng = loc.lng;
        routeLatLngs.push([lat, lng]);

        const isOrganic = loc.type === 'mess' || loc.type === 'household';
        const isUrgent = idx === 0;
        const color = isUrgent ? '#ef4444' : isOrganic ? '#10b981' : '#06b6d4';

        const wasteIcon = L.divIcon({
          className: 'custom-waste-pin',
          html: `
            <div style="
              background: ${color};
              width: 22px;
              height: 22px;
              border-radius: 50%;
              border: 3px solid #ffffff;
              box-shadow: 0 2px 8px rgba(0,0,0,0.35);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></span>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        const marker = L.marker([lat, lng], { icon: wasteIcon }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 4px; font-family: sans-serif; min-width: 160px;">
            <div style="font-size: 10px; font-weight: bold; color: ${color}; text-transform: uppercase;">
              ${isUrgent ? 'Urgent Collection' : isOrganic ? 'Organic Biomass' : 'Recyclable Node'}
            </div>
            <h4 style="font-weight: bold; margin: 2px 0 4px 0; color: #0f172a; font-size: 12px;">
              ${loc.name}
            </h4>
            <div style="font-size: 11px; color: #64748b;">
              Estimated: <b>${loc.estimatedDailyOrganicKg} kg/day</b>
            </div>
          </div>
        `);

        marker.on('click', () => {
          if (onSelectReport) {
            onSelectReport(loc.id);
          }
        });
      });
    }

    // Draw EV Collection Truck Route Polyline if enabled
    if (showRoute && routeLatLngs.length > 1) {
      L.polyline(routeLatLngs, {
        color: '#10b981',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);
    }

    // Force tile recalculation on load
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [reports, center, zoom, showRoute, activeReportId]);

  return (
    <div
      ref={mapContainerRef}
      className={`w-full rounded-2xl overflow-hidden relative shadow-xl border border-slate-200/80 ${className}`}
      style={{ height, minHeight: height, zIndex: 10 }}
    />
  );
};
