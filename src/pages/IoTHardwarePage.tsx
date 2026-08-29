import React, { useState } from 'react';
import {
  Cpu,
  Radio,
  Thermometer,
  Gauge,
  Wind,
  Droplets,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const IoTHardwarePage: React.FC = () => {
  const { digesters, isSimulationMode, toggleSimulationMode, pulseTelemetry, updateDigesterTelemetry } = useAppStore();
  const d1 = digesters[0];

  const [spikeInjected, setSpikeInjected] = useState(false);

  const handleInjectPressureSpike = () => {
    setSpikeInjected(true);
    updateDigesterTelemetry('digester-01', { pressureBar: 1.76, gasFlowLpm: 48.2 });
    setTimeout(() => {
      updateDigesterTelemetry('digester-01', { pressureBar: 1.44, gasFlowLpm: 34.6 });
      setSpikeInjected(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[400px] bg-sky-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Embedded Edge Telemetry Node
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              IoT Hardware & Telemetry Monitoring
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              ESP32-WROOM-32U microcontroller streaming real-time sensor packets over secure MQTT protocol.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSimulationMode}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                isSimulationMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-eco-500/20 text-eco-300 border-eco-500/40'
              }`}
            >
              {isSimulationMode ? 'Mode: Simulated Prototype' : 'Mode: Live Hardware Stream'}
            </button>
          </div>
        </div>

        {/* 4 Sensor Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-dark-900 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-rose-400" /> Temperature Probe</span>
              <span className="text-[10px] font-mono text-eco-400 bg-eco-500/10 px-2 py-0.5 rounded-full">PT100</span>
            </div>
            <div className="text-3xl font-black font-mono text-white">{d1.temperatureC} °C</div>
            <div className="text-[10px] text-slate-400 font-mono">Analog GPIO 34 (12-bit ADC)</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Gauge className="w-4 h-4 text-cyan-400" /> Pressure Transducer</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">I2C (0x68)</span>
            </div>
            <div className="text-3xl font-black font-mono text-cyan-400">{d1.pressureBar} bar</div>
            <div className="text-[10px] text-slate-400 font-mono">Piezoresistive Diaphragm</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Wind className="w-4 h-4 text-amber-400" /> Gas Flow Meter</span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Pulse Counter</span>
            </div>
            <div className="text-3xl font-black font-mono text-amber-400">{d1.gasFlowLpm} L/min</div>
            <div className="text-[10px] text-slate-400 font-mono">Hall-Effect Turbine Pulse (GPIO 18)</div>
          </div>

          <div className="p-5 rounded-3xl bg-dark-900 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-blue-400" /> Slurry Moisture</span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Capacitive</span>
            </div>
            <div className="text-3xl font-black font-mono text-blue-400">{d1.moisturePercent} %</div>
            <div className="text-[10px] text-slate-400 font-mono">Corrosion-Resistant Probe (GPIO 35)</div>
          </div>
        </div>

        {/* Live MQTT Packet Inspector & Hardware Simulation Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* MQTT Telemetry Stream */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Radio className="w-4 h-4 text-sky-400 animate-pulse" />
                  Live MQTT Broker Telemetry Feed (QoS 1)
                </span>
                <span className="text-[10px] font-mono text-eco-400 bg-eco-500/10 px-2 py-0.5 rounded-full">
                  Subscribed: 250ms Heartbeat
                </span>
              </div>

              {/* JSON Packet Output */}
              <div className="p-4 rounded-2xl bg-dark-950 border border-white/5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
                <div className="text-slate-500">// Incoming Packet ID #ESP32-94821</div>
                <div className="text-sky-300">{'{'}</div>
                <div className="pl-4 text-emerald-400">"timestamp": "{new Date().toISOString()}",</div>
                <div className="pl-4 text-slate-200">"node_id": "ESP32_IITG_DIGESTER_01",</div>
                <div className="pl-4 text-slate-200">"hardware_chip": "ESP32-D0WD-V3 (Dual Core 240MHz)",</div>
                <div className="pl-4 text-rose-300">"temperature_celsius": {d1.temperatureC},</div>
                <div className="pl-4 text-cyan-300">"pressure_bar": {d1.pressureBar},</div>
                <div className="pl-4 text-amber-300">"gas_flow_lpm": {d1.gasFlowLpm},</div>
                <div className="pl-4 text-blue-300">"moisture_percent": {d1.moisturePercent},</div>
                <div className="pl-4 text-eco-400">"methane_ch4_percent": {d1.methanePercent},</div>
                <div className="pl-4 text-white">"system_status": "{d1.digesterStatus}"</div>
                <div className="text-sky-300">{'}'}</div>
              </div>
            </div>
          </div>

          {/* Anomaly Testing & Hardware Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-dark-900 border border-sky-500/30 shadow-2xl space-y-6">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Simulated Anomaly Testing:
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Test the edge firmware's automatic safety threshold reaction by injecting a simulated pressure spike event into the telemetry stream.
              </p>

              {spikeInjected ? (
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-xs font-bold text-amber-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>SAFETY ALERT: Pressure Spike 1.76 bar Injected!</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-300">
                    Automated solenoid safety relief valve actuated. Throttling gas feed.
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleInjectPressureSpike}
                  className="w-full py-3 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-amber-500/40 text-amber-300 font-bold text-xs shadow-md transition-all active:scale-98"
                >
                  ⚡ Inject Pressure Spike Test (1.76 bar)
                </button>
              )}

              <button
                onClick={pulseTelemetry}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-eco-500 text-dark-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
              >
                Pulse Telemetry Jitter Cycle →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
