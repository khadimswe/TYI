import { useNavigate } from "react-router";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";
import {
  UserCircle,
  Trophy,
  Target,
  Zap,
  Award,
  Clock,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Star,
} from "lucide-react";

export function Profile() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const stats = [
    { label: "Total Tags", value: "45", icon: Target, color: "text-yellow-500" },
    { label: "Total XP", value: "890", icon: Zap, color: "text-yellow-500" },
    { label: "Rank", value: "#5", icon: Trophy, color: "text-yellow-500" },
    { label: "Days Active", value: "28", icon: Clock, color: "text-yellow-500" },
  ];

  const achievements = [
    {
      id: 1,
      name: "Quick Tagger",
      description: "Tag 10 people in one day",
      icon: Zap,
      unlocked: true,
    },
    {
      id: 2,
      name: "Campus Explorer",
      description: "Visit all campus locations",
      icon: MapPin,
      unlocked: true,
    },
    {
      id: 3,
      name: "Social Butterfly",
      description: "Connect with 50 students",
      icon: Star,
      unlocked: false,
    },
    {
      id: 4,
      name: "Helping Hand",
      description: "Complete 100 TAG requests",
      icon: Award,
      unlocked: false,
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen pb-24 ${
        theme === "dark" ? "bg-black" : "bg-gradient-to-b from-yellow-50 to-white"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 px-6 pt-12 pb-20">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className="text-gray-900 mb-6 flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex flex-col items-center">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-4 ${
                theme === "dark" ? "bg-black" : "bg-white"
              }`}
            >
              <UserCircle className="w-16 h-16 text-yellow-500" />
            </div>
            <h1 className="font-['Poppins'] text-2xl font-bold text-gray-900 mb-1">
              John Doe
            </h1>
            <p className="text-gray-800 text-sm mb-2">@johndoe</p>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-gray-900" />
              <span className="text-sm text-gray-900">Kennesaw State University</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 -mt-12">
        {/* Stats Grid */}
        <div
          className={`rounded-2xl shadow-lg p-6 mb-6 border ${
            theme === "dark"
              ? "bg-black border-yellow-500/30"
              : "bg-white border-gray-100"
          }`}
        >
          <h2
            className={`font-['Poppins'] text-lg font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Your Stats
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl p-4 text-center border ${
                  theme === "dark"
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-yellow-50 border-yellow-100"
                }`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p
                  className={`text-2xl font-bold mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div
          className={`rounded-2xl shadow-lg p-6 mb-6 border-2 border-yellow-400 relative overflow-hidden ${
            theme === "dark" ? "bg-black" : "bg-white"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-500/5"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`font-['Poppins'] text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Achievements
              </h2>
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    achievement.unlocked
                      ? theme === "dark"
                        ? "bg-yellow-500/20 border border-yellow-500/40"
                        : "bg-yellow-100 border border-yellow-200"
                      : theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <achievement.icon
                      className={`w-5 h-5 ${
                        achievement.unlocked ? "text-white" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-sm mb-1 ${
                        achievement.unlocked
                          ? theme === "dark"
                            ? "text-white"
                            : "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {achievement.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        achievement.unlocked
                          ? theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings & Actions */}
        <div
          className={`rounded-2xl shadow-lg border overflow-hidden mb-6 ${
            theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
          }`}
        >
          <button
            onClick={() => navigate("/settings")}
            className={`w-full flex items-center justify-between p-4 transition-colors group ${
              theme === "dark" ? "hover:bg-yellow-500/10" : "hover:bg-yellow-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark"
                    ? "bg-yellow-500/20 group-hover:bg-yellow-500/30"
                    : "bg-yellow-100 group-hover:bg-yellow-200"
                }`}
              >
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-left">
                <span
                  className={`font-semibold block ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Settings
                </span>
                <span
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Manage preferences
                </span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
          </button>

          <div
            className={`border-t ${
              theme === "dark" ? "border-yellow-500/20" : "border-gray-100"
            }`}
          ></div>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-between p-4 transition-colors group ${
              theme === "dark" ? "hover:bg-red-500/10" : "hover:bg-red-50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark"
                    ? "bg-red-500/20 group-hover:bg-red-500/30"
                    : "bg-red-100 group-hover:bg-red-200"
                }`}
              >
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-left">
                <span className="font-semibold text-red-600 block">Logout</span>
                <span className="text-xs text-red-500">Sign out of your account</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}