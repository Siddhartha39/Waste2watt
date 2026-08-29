import React from 'react';
import {
  Cpu,
  Radio,
  Thermometer,
  Gauge,
  Wind,
  Droplets,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
  Info
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const IoTHardwareSection: React.FC = () => {
  const { setCurrentPage, digesters, isSimulationMode, toggleSimulationMode } = useAppStore();
  const d1 = digesters[0];

  const sensors = [
    { name: 'PT100 Temperature Probe', value: `${d1.temperatureC} °C`, icon: <Thermometer className="w-4 h-4 text-rose-400" />, status: 'Optimal' },
    { name: 'Piezoresistive Pressure Sensor', value: `${d1.pressureBar} bar`, icon: <Gauge className="w-4 h-4 text-cyan-400" />, status: 'Safe Nominal' },
    { name: 'Thermal Mass Gas Flow Meter', value: `${d1.gasFlowLpm} L/min`, icon: <Wind className="w-4 h-4 text-amber-400" />, status: 'Surging' },
    { name: 'Capacitive Slurry Moisture Sensor', value: `${d1.moisturePercent} %`, icon: <Droplets className="w-4 h-4 text-blue-400" />, status: 'Homogeneous' },
  ];

  return (
    <section className="py-24 relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-sky-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Architecture Narrative & Mode Toggle */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              Stage 7: IoT Micro-Controller Pipeline
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              Powered by Real-World Data
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Industrial grade ESP32 embedded nodes stream sub-second telemetry from digester cores to our cloud ingestion bus over secure MQTT protocols, enabling automated pressure venting and safety throttling.
            </p>

            {/* Microcontroller Pipeline Diagram */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Embedded Hardware Pipeline:
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="px-2 py-1 rounded-lg bg-dark-850 text-slate-200 border border-white/5">Sensors</span>
                <span className="text-sky-400">→</span>
                <span className="px-2 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30">ESP32 Node</span>
                <span className="text-sky-400">→</span>
                <span className="px-2 py-1 rounded-lg bg-dark-850 text-slate-200 border border-white/5">MQTT / HTTP</span>
                <span className="text-sky-400">→</span>
                <span className="px-2 py-1 rounded-lg bg-eco-500/20 text-eco-300 border border-eco-500/30">Waste2Watt</span>
              </div>
            </div>

            {/* Sim Mode Switcher */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-850 border border-white/5">
              <div className="flex items-center gap-2.5">
                <Radio className={`w-4 h-4 ${isSimulationMode ? 'text-amber-400 animate-pulse' : 'text-eco-400'}`} />
                <div className="text-xs">
                  <div className="font-bold text-white">
                    {isSimulationMode ? 'Simulated Prototype Data Mode' : 'Live Hardware Streaming Active'}
                  </div>
                  <div className="text-[10px] text-slate-400">Deterministic sensor simulation engine</div>
                </div>
              </div>
              <button
                onClick={toggleSimulationMode}
                className="px-3 py-1 rounded-xl bg-dark-900 hover:bg-dark-950 text-xs font-mono font-bold text-sky-400 border border-sky-500/30 transition-colors"
              >
                Toggle Mode
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Labelled as Simulated/Prototype Sensor Data unless physical testbed ESP32 is attached.</span>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('iot')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-dark-950 font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
              >
                <span>Inspect IoT Hardware Telemetry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: ESP32 Circuit & Sensor Visual */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-3xl bg-dark-950 border border-sky-500/30 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>ESP32-WROOM-32U Bio-Digester Interface (ID: ESP32-WW-NODE-01)</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  MQTT ONLINE
                </span>
              </div>

              {/* 4 Sensor Telemetry Readout Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sensors.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-dark-900 border border-white/5 hover:border-sky-500/30 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-dark-850 border border-white/5">{s.icon}</div>
                      <div>
                        <div className="text-[11px] text-slate-400">{s.name.split(' ')[0]}</div>
                        <div className="text-base font-black font-mono text-white mt-0.5">{s.value}</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-dark-850 text-eco-400 border border-white/5">
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live JSON Payload Stream Viewer */}
              <div className="p-3 rounded-2xl bg-dark-900 border border-white/10 font-mono text-[10px] text-slate-300">
                <div className="text-slate-400 mb-1 flex items-center justify-between">
                  <span>Topic: waste2watt/iitg/digester01/telemetry</span>
                  <span className="text-sky-400 font-bold">QoS 1</span>
                </div>
                <div className="text-eco-400 overflow-x-auto">
                  {`{"nodeId":"ESP32-01","tank":"digester-01","tempC":${d1.temperatureC},"pressBar":${d1.pressureBar},"flowLpm":${d1.gasFlowLpm},"status":"${d1.digesterStatus}"}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
