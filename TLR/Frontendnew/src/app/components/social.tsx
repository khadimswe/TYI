import { MessageCircle, Heart, MessageSquare, Share2, MoreHorizontal, Zap } from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";
import { useNavigate } from "react-router";

export function Social() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Mock posts data
  const posts = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "SC",
        timeAgo: "2h ago",
      },
      content: "Just completed my first TAG! Helped someone find the library study rooms. Made a new friend and earned 50 XP! 🎉",
      likes: 24,
      comments: 5,
      tagCompleted: true,
    },
    {
      id: 2,
      user: {
        name: "Mike Rodriguez",
        avatar: "MR",
        timeAgo: "4h ago",
      },
      content: "Looking for someone to show me the best coffee spots on campus! Created a TAG - anyone interested? ☕",
      likes: 18,
      comments: 12,
      tagCreated: true,
    },
    {
      id: 3,
      user: {
        name: "Emma Watson",
        avatar: "EW",
        timeAgo: "6h ago",
      },
      content: "Shoutout to @JamesKim for helping me find the computer lab! This app is amazing for making connections 💛",
      likes: 42,
      comments: 8,
      tagCompleted: true,
    },
    {
      id: 4,
      user: {
        name: "James Kim",
        avatar: "JK",
        timeAgo: "8h ago",
      },
      content: "Pro tip: Answer TAGs in the morning for easy XP! People are usually looking for breakfast spots or parking tips 🚗",
      likes: 67,
      comments: 15,
      tagCreated: false,
    },
    {
      id: 5,
      user: {
        name: "Olivia Brown",
        avatar: "OB",
        timeAgo: "10h ago",
      },
      content: "Just hit 2000 XP! Thanks to everyone who's answered my TAGs. Love this community! 🏆",
      likes: 89,
      comments: 23,
      tagCompleted: false,
    },
  ];

  return (
    <div className={`min-h-screen pb-20 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`}>
      {/* Header */}
      <div className={`border-b px-6 pt-12 pb-4 sticky top-0 z-10 ${
        theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
      }`}>
        <div className="max-w-md mx-auto">
          <h1 className={`font-['Poppins'] text-2xl font-bold text-center mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Social
          </h1>
          
          {/* Filter Tabs with Messages */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/messages")}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
                theme === "dark" 
                  ? "bg-yellow-500/20 hover:bg-yellow-500/30" 
                  : "bg-yellow-100 hover:bg-yellow-200"
              }`}
            >
              <span className={`text-sm font-medium ${theme === "dark" ? "text-yellow-500" : "text-yellow-700"}`}>Messages</span>
              <MessageCircle className={`w-4 h-4 ${theme === "dark" ? "text-yellow-500" : "text-yellow-700"}`} />
              <span className="bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium">
              Postifications
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className={`rounded-xl p-4 shadow-sm border ${
              theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
            }`}>
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{post.user.avatar}</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{post.user.name}</h3>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{post.user.timeAgo}</p>
                  </div>
                </div>
                <button className={theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-600"}>
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Content */}
              <p className={`mb-3 leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>{post.content}</p>

              {/* Tag Badge */}
              {post.tagCompleted && (
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  theme === "dark" ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"
                }`}>
                  <Zap className="w-3 h-3" />
                  TAG Completed
                </div>
              )}
              {post.tagCreated && (
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  theme === "dark" ? "bg-yellow-500/20 text-yellow-500" : "bg-yellow-100 text-yellow-700"
                }`}>
                  <Zap className="w-3 h-3" />
                  TAG Created
                </div>
              )}

              {/* Post Actions */}
              <div className={`flex items-center gap-6 pt-3 border-t ${
                theme === "dark" ? "border-yellow-500/20" : "border-gray-100"
              }`}>
                <button className={`flex items-center gap-2 transition-colors ${
                  theme === "dark" ? "text-gray-400 hover:text-yellow-500" : "text-gray-500 hover:text-yellow-500"
                }`}>
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className={`flex items-center gap-2 transition-colors ${
                  theme === "dark" ? "text-gray-400 hover:text-yellow-500" : "text-gray-500 hover:text-yellow-500"
                }`}>
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button className={`flex items-center gap-2 transition-colors ml-auto ${
                  theme === "dark" ? "text-gray-400 hover:text-yellow-500" : "text-gray-500 hover:text-yellow-500"
                }`}>
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* End of Feed Message */}
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">You're all caught up! 🎉</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}