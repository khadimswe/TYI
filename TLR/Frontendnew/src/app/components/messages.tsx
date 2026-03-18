import { ArrowLeft, Search, MoreVertical } from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";
import { useNavigate } from "react-router";

export function Messages() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Mock message data
  const conversations = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "SC",
      },
      lastMessage: "Thanks for helping me find the library! Let's study together sometime 📚",
      timestamp: "10m ago",
      unread: 2,
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        avatar: "MR",
      },
      lastMessage: "Hey! Are you still available to help with that TAG?",
      timestamp: "1h ago",
      unread: 1,
    },
    {
      id: 3,
      user: {
        name: "Emma Watson",
        avatar: "EW",
      },
      lastMessage: "You're the best! Got 50 XP from that tag 🎉",
      timestamp: "3h ago",
      unread: 0,
    },
    {
      id: 4,
      user: {
        name: "James Kim",
        avatar: "JK",
      },
      lastMessage: "Perfect, I'll meet you at the student center in 10!",
      timestamp: "Yesterday",
      unread: 0,
    },
    {
      id: 5,
      user: {
        name: "Olivia Brown",
        avatar: "OB",
      },
      lastMessage: "Do you know where the computer lab is?",
      timestamp: "2 days ago",
      unread: 0,
    },
    {
      id: 6,
      user: {
        name: "Chris Lee",
        avatar: "CL",
      },
      lastMessage: "Awesome! Thanks for the campus tour 😊",
      timestamp: "3 days ago",
      unread: 0,
    },
  ];

  return (
    <div className={`min-h-screen pb-20 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}>
      {/* Header */}
      <div className={`border-b px-6 pt-12 pb-4 sticky top-0 z-10 ${
        theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
      }`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/social")}
              className={`p-2 rounded-full transition-colors ${
                theme === "dark" ? "hover:bg-yellow-500/10" : "hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className={`w-6 h-6 ${theme === "dark" ? "text-yellow-500" : "text-gray-700"}`} />
            </button>
            <h1 className={`font-['Poppins'] text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Messages
            </h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={`w-full rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow text-left ${
                theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{conversation.user.avatar}</span>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{conversation.unread}</span>
                    </div>
                  )}
                </div>

                {/* Message Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold ${
                      conversation.unread > 0 
                        ? theme === "dark" ? 'text-white' : 'text-gray-900' 
                        : theme === "dark" ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {conversation.user.name}
                    </h3>
                    <span className={`text-xs flex-shrink-0 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${
                    conversation.unread > 0 
                      ? theme === "dark" ? 'text-gray-300 font-medium' : 'text-gray-900 font-medium'
                      : theme === "dark" ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}