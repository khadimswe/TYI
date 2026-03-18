import { Trophy, Medal, Award, TrendingUp, Crown } from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";

export function Ranks() {
  const { theme } = useTheme();

  // Mock leaderboard data
  const topUsers = [
    { rank: 1, name: "Sarah Chen", university: "Kennesaw State", xp: 2450, avatar: "SC" },
    { rank: 2, name: "Mike Rodriguez", university: "Kennesaw State", xp: 2380, avatar: "MR" },
    { rank: 3, name: "Emma Watson", university: "Kennesaw State", xp: 2290, avatar: "EW" },
    { rank: 4, name: "James Kim", university: "Kennesaw State", xp: 2150, avatar: "JK" },
    { rank: 5, name: "Olivia Brown", university: "Kennesaw State", xp: 2080, avatar: "OB" },
    { rank: 6, name: "Chris Lee", university: "Kennesaw State", xp: 1950, avatar: "CL" },
    { rank: 7, name: "Ava Martinez", university: "Kennesaw State", xp: 1890, avatar: "AM" },
    { rank: 8, name: "Noah Davis", university: "Kennesaw State", xp: 1820, avatar: "ND" },
    { rank: 9, name: "Sophia Taylor", university: "Kennesaw State", xp: 1750, avatar: "ST" },
    { rank: 10, name: "Liam Johnson", university: "Kennesaw State", xp: 1680, avatar: "LJ" },
  ];

  // Current user (for demo)
  const currentUser = {
    rank: 24,
    name: "You",
    xp: 890,
    tagsCompleted: 45,
    tagsCreated: 12,
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-gray-600";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return null;
  };

  return (
    <div className={`min-h-screen pb-20 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 px-6 pt-12 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
              theme === "dark" ? "bg-black" : "bg-white"
            }`}>
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          <h1 className="font-['Poppins'] text-3xl font-bold text-gray-900 text-center mb-2">
            Ranks
          </h1>
          <p className="text-center text-gray-800 text-sm">
            Top players at Kennesaw State
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-6">
        {/* Your Rank Card */}
        <div className={`rounded-xl p-5 mb-6 border-2 ${
          theme === "dark" 
            ? "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500" 
            : "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300"
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <div>
                <h3 className={`font-['Poppins'] font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Your Rank
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Keep tagging to climb!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-['Poppins'] text-3xl font-bold text-yellow-600">
                #{currentUser.rank}
              </div>
            </div>
          </div>
          <div className={`grid grid-cols-3 gap-3 pt-3 border-t ${
            theme === "dark" ? "border-yellow-500/30" : "border-yellow-300"
          }`}>
            <div className="text-center">
              <div className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{currentUser.xp}</div>
              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>XP</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{currentUser.tagsCompleted}</div>
              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Completed</div>
            </div>
            <div className="text-center">
              <div className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{currentUser.tagsCreated}</div>
              <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Created</div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-6">
          <h2 className={`font-['Poppins'] text-xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Top Players
          </h2>
          <div className="flex items-end justify-center gap-2 mb-6">
            {/* 2nd Place */}
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 border-4 ${
                theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"
              }`}>
                <span className={`font-bold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{topUsers[1].avatar}</span>
              </div>
              <Medal className="w-5 h-5 text-gray-400 mb-1" />
              <div className="text-center">
                <div className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{topUsers[1].name.split(' ')[0]}</div>
                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{topUsers[1].xp} XP</div>
              </div>
              <div className={`w-full h-20 mt-2 rounded-t-lg flex items-center justify-center ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}>
                <span className={`font-['Poppins'] text-2xl font-bold ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>2</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 border-4 border-yellow-400 ${
                theme === "dark" ? "bg-yellow-500/20" : "bg-yellow-100"
              }`}>
                <span className="font-bold text-yellow-700">{topUsers[0].avatar}</span>
              </div>
              <Crown className="w-6 h-6 text-yellow-500 mb-1" />
              <div className="text-center">
                <div className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{topUsers[0].name.split(' ')[0]}</div>
                <div className="text-xs text-yellow-600 font-bold">{topUsers[0].xp} XP</div>
              </div>
              <div className="w-full bg-yellow-400 h-28 mt-2 rounded-t-lg flex items-center justify-center">
                <span className="font-['Poppins'] text-3xl font-bold text-gray-900">1</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex-1 flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 border-4 ${
                theme === "dark" ? "bg-amber-500/20 border-amber-500/50" : "bg-amber-100 border-amber-300"
              }`}>
                <span className="font-bold text-amber-700">{topUsers[2].avatar}</span>
              </div>
              <Medal className="w-5 h-5 text-amber-600 mb-1" />
              <div className="text-center">
                <div className={`font-semibold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{topUsers[2].name.split(' ')[0]}</div>
                <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{topUsers[2].xp} XP</div>
              </div>
              <div className={`w-full h-16 mt-2 rounded-t-lg flex items-center justify-center ${
                theme === "dark" ? "bg-amber-500/30" : "bg-amber-200"
              }`}>
                <span className="font-['Poppins'] text-2xl font-bold text-amber-700">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div>
          <h2 className={`font-['Poppins'] text-lg font-bold mb-3 flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <TrendingUp className="w-5 h-5 text-yellow-500" />
            Leaderboard
          </h2>
          <div className="space-y-2">
            {topUsers.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  user.rank <= 3
                    ? theme === "dark"
                      ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30"
                      : "bg-gradient-to-r from-yellow-50 to-white border border-yellow-200"
                    : theme === "dark"
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-gray-50"
                }`}
              >
                <div className={`w-8 flex items-center justify-center font-['Poppins'] font-bold ${getRankColor(user.rank)}`}>
                  {user.rank <= 3 ? getRankIcon(user.rank) : `#${user.rank}`}
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{user.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{user.name}</div>
                  <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{user.university}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{user.xp}</div>
                  <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>XP</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* XP Info */}
        <div className={`rounded-xl p-4 mt-6 ${
          theme === "dark" ? "bg-yellow-500/10 border border-yellow-500/30" : "bg-gray-50"
        }`}>
          <h3 className={`font-['Poppins'] font-bold mb-2 flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <Award className="w-5 h-5 text-yellow-500" />
            Earn XP
          </h3>
          <ul className={`text-sm space-y-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            <li>• Answer a tag: <span className="font-bold text-yellow-600">+50 XP</span></li>
            <li>• Daily login: <span className="font-bold text-yellow-600">+5 XP</span></li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}