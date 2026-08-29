import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  ArrowRight,
  Zap,
  Leaf,
  Flame,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const GamificationSection: React.FC = () => {
  const { setCurrentPage, allUsers, currentUser } = useAppStore();

  const pointActivities = [
    { title: 'Report Bio-Waste', points: '+20 pts', desc: 'Geotagged image submission' },
    { title: 'Pure Segregation', points: '+30 pts', desc: 'Zero plastic contamination' },
    { title: 'Verified Collection', points: '+10 pts', desc: 'Scale confirmation' },
    { title: 'Campus Champion', points: '+50 pts', desc: 'Weekly top sector bonus' },
  ];

  return (
    <section className="py-24 relative bg-dark-900 border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5" />
            Stage 9: Social Incentives & Gamification
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight mb-4">
            Make Sustainability a Community Habit
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Gamified micro-incentives transform daily waste segregation into a community sport.
            Earn redeemable Eco-Points, unlock green achievements, and power your neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left: How to Earn Points Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Earn Eco-Points on Every Action:
            </div>
            <div className="grid grid-cols-2 gap-3">
              {pointActivities.map((act, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-dark-850 border border-white/5 hover:border-amber-500/30 transition-colors"
                >
                  <div className="text-base font-black font-mono text-amber-400 mb-1">{act.points}</div>
                  <div className="text-xs font-bold text-white">{act.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{act.desc}</div>
                </div>
              ))}
            </div>

            {/* Current User Impact Preview Badge */}
            <div className="p-4 rounded-2xl bg-dark-950 border border-eco-500/30 flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-eco-500"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                <div className="text-[10px] text-eco-400 font-mono font-semibold">{currentUser.level}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Balance: <span className="text-amber-400 font-bold font-mono">{currentUser.ecoPoints} pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Top Community Leaderboard Podium */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-3xl bg-dark-950 border border-amber-500/30 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  Campus & Sector Top Contributors
                </span>
                <span className="text-[10px] font-mono text-slate-400">Weekly Cycle #34</span>
              </div>

              {/* Leaderboard List */}
              <div className="space-y-2">
                {allUsers.map((u, rank) => (
                  <div
                    key={u.id}
                    className={`p-3 rounded-2xl flex items-center justify-between transition-all ${
                      rank === 0
                        ? 'bg-amber-500/15 border border-amber-500/40 text-white'
                        : rank === 1
                        ? 'bg-slate-800/40 border border-slate-700/40 text-slate-200'
                        : rank === 2
                        ? 'bg-orange-950/30 border border-orange-800/30 text-slate-200'
                        : 'bg-dark-900 border border-white/5 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-mono font-black text-sm">
                        {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
                      </span>
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
                      />
                      <div>
                        <div className="text-xs font-bold truncate max-w-[150px] sm:max-w-[200px]">
                          {u.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{u.sector}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-black font-mono text-amber-400">
                        {u.ecoPoints} pts
                      </div>
                      <div className="text-[9px] font-mono text-eco-400">
                        {u.wasteDivertedKg} kg bio-waste
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('leaderboard')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs shadow-md transition-colors"
                >
                  Explore Full Leaderboard & Reward Catalog →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
