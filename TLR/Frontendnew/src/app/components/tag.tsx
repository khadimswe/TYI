import { Zap, Users, Target, Award, Plus, MapPin, Clock } from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";

export function Tag() {
  const { theme } = useTheme();

  const activeTags = [
    {
      id: 1,
      title: "Need help finding Carmichael Student Center",
      user: "Sarah Chen",
      avatar: "SC",
      category: "Campus Tour",
      xp: 50,
      distance: "0.2 mi",
      time: "5 min ago",
    },
    {
      id: 2,
      title: "Looking for study buddy at Library",
      user: "Mike Rodriguez",
      avatar: "MR",
      category: "Study Help",
      xp: 75,
      distance: "0.4 mi",
      time: "12 min ago",
    },
    {
      id: 3,
      title: "Need directions to Science Building",
      user: "Emma Watson",
      avatar: "EW",
      category: "Directions",
      xp: 50,
      distance: "0.6 mi",
      time: "25 min ago",
    },
  ];

  return (
    <div className={`min-h-screen pb-20 ${
      theme === "dark" ? "bg-black" : "bg-gradient-to-b from-yellow-50 to-white"
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 px-6 pt-12 pb-12">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
              theme === "dark" ? "bg-black" : "bg-white"
            }`}>
              <Zap className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
          <h1 className="font-['Poppins'] text-3xl font-bold text-gray-900 text-center mb-2">
            TAG Center
          </h1>
          <p className="text-center text-gray-800 text-sm">
            Create requests or help others earn XP
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Create TAG Button */}
        <button className={`w-full font-bold py-6 px-6 rounded-2xl shadow-xl mb-6 transition-all hover:shadow-2xl border-2 border-yellow-400 group ${
          theme === "dark" ? "bg-black hover:bg-yellow-500/10" : "bg-white hover:bg-gray-50"
        }`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <span className={`font-['Poppins'] text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Create a TAG</span>
          </div>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Post a request and wait for someone to help
          </p>
        </button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className={`rounded-xl p-4 text-center shadow-sm border ${
            theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
          }`}>
            <Target className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
            <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>12</div>
            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Nearby</div>
          </div>
          <div className={`rounded-xl p-4 text-center shadow-sm border ${
            theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
          }`}>
            <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
            <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>45</div>
            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Your Tags</div>
          </div>
          <div className={`rounded-xl p-4 text-center shadow-sm border ${
            theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
          }`}>
            <Award className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
            <div className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>890</div>
            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>XP Points</div>
          </div>
        </div>

        {/* Active Tags */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-['Poppins'] text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Active TAGs
            </h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              theme === "dark" ? "bg-yellow-500/20 text-yellow-500" : "bg-yellow-100 text-yellow-800"
            }`}>
              {activeTags.length} nearby
            </span>
          </div>

          <div className="space-y-3">
            {activeTags.map((tag) => (
              <div
                key={tag.id}
                className={`rounded-xl p-4 shadow-sm border hover:border-yellow-400 hover:shadow-md transition-all ${
                  theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {tag.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <span className={`inline-block text-xs px-2 py-1 rounded-full mb-2 ${
                          theme === "dark" ? "bg-yellow-500/20 text-yellow-500" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {tag.category}
                        </span>
                        <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {tag.title}
                        </h3>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>by {tag.user}</p>
                      </div>
                    </div>
                    <div className={`flex items-center justify-between pt-2 border-t ${
                      theme === "dark" ? "border-yellow-500/20" : "border-gray-100"
                    }`}>
                      <div className={`flex items-center gap-3 text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {tag.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {tag.time}
                        </span>
                        <span className="font-semibold text-yellow-600">
                          +{tag.xp} XP
                        </span>
                      </div>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Play */}
        <div className={`rounded-xl p-5 shadow-sm border ${
          theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
        }`}>
          <h3 className={`font-['Poppins'] font-bold mb-3 flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <Zap className="w-5 h-5 text-yellow-500" />
            How It Works
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                theme === "dark" ? "bg-yellow-500/20" : "bg-yellow-100"
              }`}>
                <span className="text-yellow-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  Create a TAG
                </h4>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Post what you need help with and set XP rewards
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                theme === "dark" ? "bg-yellow-500/20" : "bg-yellow-100"
              }`}>
                <span className="text-yellow-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  Accept TAGs
                </h4>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Browse nearby requests and help other students
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                theme === "dark" ? "bg-yellow-500/20" : "bg-yellow-100"
              }`}>
                <span className="text-yellow-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  Earn XP & Rank Up
                </h4>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Complete TAGs to earn points and climb the leaderboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}