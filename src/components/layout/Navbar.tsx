import React, { useState, useEffect } from 'react';
import {
  Flame,
  Zap,
  MapPin,
  BarChart3,
  Trophy,
  PlusCircle,
  Bell,
  Menu,
  X,
  PlayCircle,
  Cpu,
  Layers,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Truck,
  Leaf,
  Activity,
  Sun,
  Moon
} from 'lucide-react';
import { useAppStore, AppPage } from '../../store/useAppStore';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    currentUser,
    activeRole,
    setActiveRole,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    juryDemoOpen,
    setJuryDemoOpen,
    currentJuryStep,
    isSimulationMode,
    toggleSimulationMode,
    theme,
    toggleTheme
  } = useAppStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.read);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: AppPage; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'landing', icon: <Leaf className="w-4 h-4 text-eco-400" /> },
    { label: 'Report Waste', page: 'report', icon: <PlusCircle className="w-4 h-4 text-eco-400" /> },
    { label: 'Live Map', page: 'live-map', icon: <MapPin className="w-4 h-4 text-cyan-400" /> },
    { label: 'Impact', page: 'impact', icon: <BarChart3 className="w-4 h-4 text-energy-light" /> },
    { label: 'Leaderboard', page: 'leaderboard', icon: <Trophy className="w-4 h-4 text-amber-400" /> },
  ];

  const dashboardLinks: { label: string; page: AppPage; roleDesc: string; icon: React.ReactNode }[] = [
    { label: 'Citizen Dashboard', page: 'citizen', roleDesc: 'Personal impact & reports', icon: <Leaf className="w-4 h-4 text-eco-400" /> },
    { label: 'Collector Dashboard', page: 'collector', roleDesc: 'Active pickups & route dispatch', icon: <Truck className="w-4 h-4 text-cyan-400" /> },
    { label: 'Smart Route Optimizer', page: 'smart-route', roleDesc: 'AI dynamic routing', icon: <MapPin className="w-4 h-4 text-indigo-400" /> },
    { label: 'Collection Verification', page: 'verification', roleDesc: 'Proof & weight logging', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
    { label: 'Waste Segregation Unit', page: 'segregation', roleDesc: 'Conveyor intake & sorting', icon: <Layers className="w-4 h-4 text-teal-400" /> },
    { label: 'Biogas Plant Monitor', page: 'biogas', roleDesc: 'Anaerobic digester telemetry', icon: <Flame className="w-4 h-4 text-energy-glow" /> },
    { label: 'Energy & Microgrid', page: 'energy', roleDesc: 'CHP generation & distribution', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { label: 'Municipality Command', page: 'admin', roleDesc: 'City/Campus master admin', icon: <Activity className="w-4 h-4 text-blue-400" /> },
    { label: 'AI Deep Waste Lab', page: 'ai-scanner', roleDesc: 'Computer vision scanner', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { label: 'AI Predictive Planning', page: 'prediction', roleDesc: '7-day load forecasting', icon: <BarChart3 className="w-4 h-4 text-violet-400" /> },
    { label: 'IoT Hardware Telemetry', page: 'iot', roleDesc: 'ESP32 live sensor feeds', icon: <Cpu className="w-4 h-4 text-sky-400" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-900/85 backdrop-blur-xl border-b border-eco-500/20 py-2.5 shadow-2xl shadow-black/60'
          : 'bg-gradient-to-b from-dark-950/90 via-dark-950/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentPage('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-eco-500 via-emerald-600 to-cyan-600 p-[1.5px] shadow-lg shadow-eco-500/20 group-hover:shadow-eco-500/40 transition-all">
            <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
              <div className="flex items-center justify-center">
                <Leaf className="w-5 h-5 text-eco-400 group-hover:scale-110 transition-transform" />
                <Zap className="w-3.5 h-3.5 text-energy-light -ml-1 animate-pulse" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-eco-400 transition-colors">
                WASTE<span className="text-eco-400">2</span>WATT
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-eco-500/10 text-eco-400 border border-eco-500/30 font-bold">
                BIO-ENERGY GRID
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider hidden sm:block">
              Decentralized Clean Energy Infrastructure
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-dark-850/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-eco-500 text-dark-950 font-semibold shadow-md shadow-eco-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            );
          })}

          {/* Dashboards Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
              onBlur={() => setTimeout(() => setDashboardDropdownOpen(false), 200)}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                dashboardLinks.some((d) => d.page === currentPage)
                  ? 'bg-eco-500/20 text-eco-300 border border-eco-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>All Modules</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${dashboardDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dashboardDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 grid grid-cols-1 gap-1 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5">
                  Decentralized Network Modules
                </div>
                <div className="max-h-80 overflow-y-auto py-1 space-y-0.5">
                  {dashboardLinks.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => {
                        setCurrentPage(item.page);
                        setDashboardDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                        currentPage === item.page
                          ? 'bg-eco-500/20 text-eco-300 font-semibold border border-eco-500/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="p-1.5 rounded-lg bg-dark-800 border border-white/5">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-100 truncate">{item.label}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.roleDesc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions (Jury Demo, Role Switcher, Notifications, Simulation Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simulation Toggle Badge */}
          <button
            onClick={toggleSimulationMode}
            title={isSimulationMode ? 'Running in Simulated Prototype Mode' : 'Hardware Direct Stream Active'}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-dark-850 border border-white/10 text-slate-300 hover:border-eco-500/50 transition-colors"
          >
            <span className={`w-2 h-2 rounded-full ${isSimulationMode ? 'bg-amber-400 animate-pulse' : 'bg-eco-400'}`} />
            <span>{isSimulationMode ? 'SIM MODE' : 'LIVE HW'}</span>
          </button>

          {/* Interactive Live Tour Trigger */}
          <button
            onClick={() => setJuryDemoOpen(!juryDemoOpen)}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-eco-500 to-cyan-500 text-dark-950 shadow-lg shadow-eco-500/25 hover:shadow-eco-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <PlayCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Interactive Tour</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-dark-950/40 text-white rounded-full font-mono">
              Step {currentJuryStep}/24
            </span>
          </button>

          {/* Light/Dark Theme Switcher */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="p-2 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/10 text-slate-300 hover:text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              onBlur={() => setTimeout(() => setNotifDropdownOpen(false), 200)}
              className="relative p-2 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-eco-500 text-[10px] text-dark-950 font-bold flex items-center justify-center animate-bounce">
                  {unreadNotifs.length}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-xs font-semibold text-white">Live Network Broadcasts</span>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[10px] text-slate-400 hover:text-eco-400"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-white/5 py-1">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No new broadcasts
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.link) setCurrentPage(n.link as AppPage);
                          setNotifDropdownOpen(false);
                        }}
                        className={`py-2 px-2 text-xs rounded-lg cursor-pointer transition-colors ${
                          n.read ? 'text-slate-400' : 'bg-eco-500/5 text-slate-200'
                        } hover:bg-white/5`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-eco-400 text-[11px] truncate">
                            {n.title}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              onBlur={() => setTimeout(() => setRoleDropdownOpen(false), 200)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/10 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-eco-500/50"
              />
              <div className="text-left hidden md:block">
                <div className="text-xs font-medium text-slate-200 leading-none truncate max-w-[90px]">
                  {currentUser.name}
                </div>
                <div className="text-[9px] font-mono text-eco-400 leading-none mt-0.5 capitalize">
                  {activeRole}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-white/5">
                  Select System Role View
                </div>
                {(['citizen', 'collector', 'plant_operator', 'admin', 'auditor'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setActiveRole(r);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs capitalize transition-colors ${
                      activeRole === r
                        ? 'bg-eco-500/20 text-eco-300 font-semibold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{r.replace('_', ' ')}</span>
                    {activeRole === r && <span className="w-1.5 h-1.5 rounded-full bg-eco-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-dark-850 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-900/95 backdrop-blur-2xl border-b border-white/10 px-4 py-4 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  setCurrentPage(link.page);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium ${
                  currentPage === link.page
                    ? 'bg-eco-500 text-dark-950 font-bold'
                    : 'bg-dark-850 text-slate-300'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              All 18 System Modules
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-60 overflow-y-auto">
              {dashboardLinks.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-lg text-xs text-left ${
                    currentPage === item.page
                      ? 'bg-eco-500/20 text-eco-300'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
