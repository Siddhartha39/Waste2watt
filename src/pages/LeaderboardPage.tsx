import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Zap,
  Leaf,
  Flame,
  Star,
  Gift
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const LeaderboardPage: React.FC = () => {
  const { allUsers, currentUser, rewards, redeemReward, setCurrentPage } = useAppStore();

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-950 text-slate-100 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              Community Rewards & Impact Champions
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
              Eco-Points & Community Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Earn Eco-Points on verified organic waste segregation and redeem for sustainable vouchers and bio-compost.
            </p>
          </div>

          {/* User Points Badge */}
          <div className="p-3.5 rounded-2xl bg-dark-900 border border-amber-500/30 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">My Wallet Balance</div>
              <div className="text-xl font-black font-mono text-amber-400">{currentUser.ecoPoints} Points</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table & Reward Marketplace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Top Citizen Leaderboard */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Sector A & Campus Champions</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Season #4</span>
            </div>

            <div className="space-y-2.5">
              {allUsers.map((usr, rank) => (
                <div
                  key={usr.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    rank === 0
                      ? 'bg-amber-500/15 border-amber-500/40 text-white'
                      : rank === 1
                      ? 'bg-slate-800/40 border-slate-700/40 text-slate-200'
                      : rank === 2
                      ? 'bg-orange-950/30 border-orange-800/30 text-slate-200'
                      : 'bg-dark-900 border-white/5 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-6 text-center font-mono font-black text-base">
                      {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
                    </span>
                    <img
                      src={usr.avatar}
                      alt={usr.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <div className="text-xs font-bold truncate max-w-[150px] sm:max-w-xs">{usr.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{usr.sector}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black font-mono text-amber-400">{usr.ecoPoints} pts</div>
                    <div className="text-[10px] font-mono text-eco-400">{usr.wasteDivertedKg} kg bio-waste</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Eco-Rewards Redemption Store */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-eco-400" />
                <span>Redeem Sustainability Rewards</span>
              </h2>
              <span className="text-xs text-eco-400 font-mono">Instant Voucher Issue</span>
            </div>

            <div className="space-y-3">
              {rewards.map((rwd) => {
                const canAfford = currentUser.ecoPoints >= rwd.pointsCost;
                return (
                  <div
                    key={rwd.id}
                    className="p-4 rounded-2xl bg-dark-900 border border-white/10 hover:border-eco-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={rwd.image}
                        alt={rwd.title}
                        className="w-14 h-14 rounded-xl object-cover ring-1 ring-white/10 shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{rwd.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{rwd.partner}</div>
                        <div className="text-[10px] font-mono text-amber-400 font-bold mt-1">
                          Cost: {rwd.pointsCost} Eco-Points ({rwd.availableCount} remaining)
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={!canAfford || rwd.availableCount === 0}
                      onClick={() => redeemReward(rwd.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        canAfford && rwd.availableCount > 0
                          ? 'bg-eco-500 hover:bg-eco-400 text-dark-950 shadow-md active:scale-95'
                          : 'bg-dark-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem Voucher →' : 'Need More Points'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
