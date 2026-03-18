import { useNavigate, useLocation } from "react-router";
import { useTheme } from "../contexts/theme-context";
import {
  MapPin,
  Trophy,
  Home as HomeIcon,
  Zap,
  Users,
} from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/tag") return "tag";
    if (location.pathname === "/map") return "map";
    if (location.pathname === "/ranks") return "leaderboard";
    if (location.pathname === "/social") return "social";
    return "home";
  };
  
  const activeTab = getActiveTab();

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t shadow-lg ${
      theme === "dark" 
        ? "bg-black border-yellow-500/30" 
        : "bg-white border-gray-100"
    }`}>
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "home"
                ? "text-yellow-500"
                : theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-all ${
                activeTab === "home" 
                  ? theme === "dark" 
                    ? "bg-yellow-500/20" 
                    : "bg-yellow-100" 
                  : ""
              }`}
            >
              <HomeIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Home</span>
          </button>

          {/* Map */}
          <button
            onClick={() => navigate("/map")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "map"
                ? "text-yellow-500"
                : theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-all ${
                activeTab === "map" 
                  ? theme === "dark" 
                    ? "bg-yellow-500/20" 
                    : "bg-yellow-100" 
                  : ""
              }`}
            >
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Map</span>
          </button>

          {/* Quick Tag - Center Action Button */}
          <button
            onClick={() => navigate("/tag")}
            className="relative -mt-8"
          >
            <div
              className={`w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-lg flex items-center justify-center border-4 hover:scale-105 transition-transform ${
                theme === "dark" ? "border-black" : "border-white"
              } ${
                activeTab === "tag" ? "ring-4 ring-yellow-300 scale-105" : ""
              }`}
            >
              <Zap className="w-8 h-8 text-gray-900" />
            </div>
            <span
              className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap ${
                activeTab === "tag" 
                  ? "text-yellow-500" 
                  : theme === "dark" 
                  ? "text-white" 
                  : "text-gray-900"
              }`}
            >
              TAG
            </span>
          </button>

          {/* Leaderboard */}
          <button
            onClick={() => navigate("/ranks")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "leaderboard"
                ? "text-yellow-500"
                : theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-all relative ${
                activeTab === "leaderboard" 
                  ? theme === "dark" 
                    ? "bg-yellow-500/20" 
                    : "bg-yellow-100" 
                  : ""
              }`}
            >
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Ranks</span>
          </button>

          {/* Social */}
          <button
            onClick={() => navigate("/social")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "social"
                ? "text-yellow-500"
                : theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div
              className={`p-2 rounded-xl transition-all ${
                activeTab === "social" 
                  ? theme === "dark" 
                    ? "bg-yellow-500/20" 
                    : "bg-yellow-100" 
                  : ""
              }`}
            >
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium">Social</span>
          </button>
        </div>
      </div>
    </div>
  );
}