import { ArrowLeft, Bell, Zap, Trophy, Heart, MessageCircle, UserPlus, Target, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";
import { useState } from "react";

export function Notifications() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [filter, setFilter] = useState<"all" | "tags" | "social">("all");

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "tag_completed",
      user: { name: "Sarah Chen", avatar: "SC" },
      message: "completed your TAG request",
      tagTitle: "Help finding the library",
      time: "5m ago",
      xp: 50,
      unread: true,
      category: "tags",
    },
    {
      id: 2,
      type: "tag_accepted",
      user: { name: "Mike Rodriguez", avatar: "MR" },
      message: "accepted your TAG",
      tagTitle: "Campus tour needed",
      time: "15m ago",
      unread: true,
      category: "tags",
    },
    {
      id: 3,
      type: "achievement",
      message: "You unlocked a new achievement!",
      achievement: "First Helper",
      time: "1h ago",
      unread: true,
      category: "tags",
    },
    {
      id: 4,
      type: "like",
      user: { name: "Emma Watson", avatar: "EW" },
      message: "liked your post",
      time: "2h ago",
      unread: false,
      category: "social",
    },
    {
      id: 5,
      type: "comment",
      user: { name: "James Kim", avatar: "JK" },
      message: "commented on your post",
      comment: "Great job helping out!",
      time: "3h ago",
      unread: false,
      category: "social",
    },
    {
      id: 6,
      type: "follow",
      user: { name: "Olivia Brown", avatar: "OB" },
      message: "started following you",
      time: "5h ago",
      unread: false,
      category: "social",
    },
    {
      id: 7,
      type: "xp_milestone",
      message: "You reached 1,000 XP!",
      time: "Yesterday",
      unread: false,
      category: "tags",
    },
    {
      id: 8,
      type: "tag_request",
      user: { name: "Chris Lee", avatar: "CL" },
      message: "sent you a TAG request",
      tagTitle: "Need directions to parking",
      time: "Yesterday",
      unread: false,
      category: "tags",
    },
  ];

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "all") return true;
    return notif.category === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "tag_completed":
      case "tag_accepted":
      case "tag_request":
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case "achievement":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "xp_milestone":
        return <Target className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className={`min-h-screen pb-20 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}>
      {/* Header */}
      <div className={`border-b px-6 pt-12 pb-4 sticky top-0 z-10 ${
        theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
      }`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/")}
              className={`p-2 rounded-full transition-colors ${
                theme === "dark" ? "hover:bg-yellow-500/10" : "hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className={`w-6 h-6 ${theme === "dark" ? "text-yellow-500" : "text-gray-700"}`} />
            </button>
            <h1 className={`font-['Poppins'] text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Notifications
            </h1>
            <button className={`p-2 rounded-full transition-colors ${
              theme === "dark" ? "hover:bg-yellow-500/10" : "hover:bg-gray-100"
            }`}>
              <CheckCheck className={`w-6 h-6 ${theme === "dark" ? "text-yellow-500" : "text-gray-700"}`} />
            </button>
          </div>

          {/* Unread Badge */}
          {unreadCount > 0 && (
            <div className={`mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
              theme === "dark" ? "bg-yellow-500/20" : "bg-yellow-100"
            }`}>
              <Bell className="w-4 h-4 text-yellow-600" />
              <span className={`text-sm font-medium ${theme === "dark" ? "text-yellow-500" : "text-yellow-700"}`}>
                {unreadCount} new notification{unreadCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-yellow-500 text-white"
                  : theme === "dark"
                  ? "bg-yellow-500/10 text-gray-400 hover:bg-yellow-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("tags")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "tags"
                  ? "bg-yellow-500 text-white"
                  : theme === "dark"
                  ? "bg-yellow-500/10 text-gray-400 hover:bg-yellow-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              TAGs
            </button>
            <button
              onClick={() => setFilter("social")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "social"
                  ? "bg-yellow-500 text-white"
                  : theme === "dark"
                  ? "bg-yellow-500/10 text-gray-400 hover:bg-yellow-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Social
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl p-4 border transition-all cursor-pointer ${
                notification.unread
                  ? theme === "dark"
                    ? "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20"
                    : "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                  : theme === "dark"
                  ? "bg-black border-yellow-500/20 hover:bg-yellow-500/5"
                  : "bg-white border-gray-100 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar or Icon */}
                {notification.user ? (
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{notification.user.avatar}</span>
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    theme === "dark" ? "bg-yellow-500/20" : "bg-yellow-100"
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                      {notification.user && (
                        <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {notification.user.name}{" "}
                        </span>
                      )}
                      {notification.message}
                    </p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>

                  {/* Tag Title */}
                  {notification.tagTitle && (
                    <div className={`text-sm font-medium mb-2 ${theme === "dark" ? "text-yellow-500" : "text-yellow-700"}`}>
                      "{notification.tagTitle}"
                    </div>
                  )}

                  {/* Achievement */}
                  {notification.achievement && (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                      theme === "dark" ? "bg-yellow-500/20 text-yellow-500" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      <Trophy className="w-3 h-3" />
                      {notification.achievement}
                    </div>
                  )}

                  {/* Comment */}
                  {notification.comment && (
                    <p className={`text-sm italic mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      "{notification.comment}"
                    </p>
                  )}

                  {/* Time and XP */}
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                      {notification.time}
                    </span>
                    {notification.xp && (
                      <span className="text-xs font-semibold text-yellow-600 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        +{notification.xp} XP
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              theme === "dark" ? "bg-yellow-500/10" : "bg-gray-100"
            }`}>
              <Bell className={`w-10 h-10 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
            </div>
            <p className={`font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              No notifications yet
            </p>
            <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              We'll notify you when something happens
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
