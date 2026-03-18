import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/theme-context";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { BottomNav } from "./bottom-nav";
import {
  UserCircle,
  Trophy,
  Play,
  Clock,
  Target,
  Bell,
  Megaphone,
  Calendar,
  MessageSquare,
} from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [userName] = useState("John"); // This would come from auth context in a real app

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
    navigate("/login");
  };

  const stats = [
    { label: "Tags", value: "12", icon: Target },
    { label: "Rank", value: "#5", icon: Trophy },
    { label: "Active", value: "2d", icon: Clock },
  ];

  const announcements = [
    {
      id: 1,
      type: "news",
      icon: Megaphone,
      title: "Spring Career Fair - Next Week",
      message: "Connect with top employers on campus. Register now for early access!",
      time: "3 hours ago",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      type: "event",
      icon: Calendar,
      title: "Library Extended Hours During Finals",
      message: "The library will be open 24/7 starting Dec 5th through Dec 15th",
      time: "1 day ago",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      type: "message",
      icon: MessageSquare,
      title: "Campus Parking Lot B Closed for Maintenance",
      message: "Please use alternative parking lots. Expected to reopen Monday",
      time: "2 days ago",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className={`min-h-screen pb-24 ${
      theme === "dark" ? "bg-black" : "bg-gradient-to-b from-yellow-50 to-white"
    }`}>
      {/* Header */}
      <header className={theme === "dark" ? "bg-black border-b border-yellow-500/30" : "bg-white"}>
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-gray-900" />
            </div>
            <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{userName}</span>
          </button>
          <div className="absolute left-1/2 -translate-x-[45%] scale-75">
            <Logo />
          </div>
          <button 
            onClick={() => navigate("/notifications")}
            className="relative hover:opacity-80 transition-opacity"
          >
            <Bell className={`w-6 h-6 ${theme === "dark" ? "text-yellow-500" : "text-gray-700"}`} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className={`rounded-2xl shadow-md p-6 border ${
          theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
        }`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <UserCircle className="w-10 h-10 text-gray-900" />
            </div>
            <div>
              <h2 className={`text-2xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Welcome back, {userName}!
              </h2>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Ready to play?</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl p-3 text-center border ${
                  theme === "dark" 
                    ? "bg-yellow-500/10 border-yellow-500/30" 
                    : "bg-yellow-50 border-yellow-100"
                }`}
              >
                <stat.icon className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                <p className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className={`rounded-2xl shadow-md p-6 border-2 border-yellow-400 hover:border-yellow-500 hover:shadow-xl transition-all relative overflow-hidden ${
            theme === "dark" ? "bg-black" : "bg-white"
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-500/5"></div>
            <div className="relative">
              <Trophy className="w-8 h-8 text-yellow-500 mb-3" />
              <h3 className={`font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Achievements</h3>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Track progress</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/tag")}
            className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-md p-6 border border-yellow-300 hover:shadow-lg transition-all"
          >
            <Play className="w-8 h-8 text-gray-900 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Start TAG</h3>
            <p className="text-xs text-gray-900/80">Create request</p>
          </button>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-2xl shadow-md p-6 border ${
          theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className={`flex items-center gap-3 pb-3 border-b ${
              theme === "dark" ? "border-yellow-500/20" : "border-gray-100"
            }`}>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  You tagged Sarah M.
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>2 hours ago</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 pb-3 border-b ${
              theme === "dark" ? "border-yellow-500/20" : "border-gray-100"
            }`}>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Mike R. tagged you
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Achievement unlocked: Quick Tagger
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className={`rounded-2xl shadow-md p-6 border ${
          theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-['Poppins'] text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Notice Board
            </h3>
            <Megaphone className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`flex items-start gap-3 p-3 rounded-xl ${
                  theme === "dark" 
                    ? "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10" 
                    : announcement.bgColor
                } ${
                  index !== announcements.length - 1 ? "mb-2" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  theme === "dark" ? "bg-yellow-500/20" : announcement.bgColor
                }`}>
                  <announcement.icon className={`w-5 h-5 ${
                    theme === "dark" ? "text-yellow-500" : announcement.iconColor
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {announcement.title}
                  </p>
                  <p className={`text-xs mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
                    {announcement.message}
                  </p>
                  <p className="text-xs text-gray-500">{announcement.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Creative Bottom Dashboard */}
      <BottomNav />
    </div>
  );
}