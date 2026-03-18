import { MapPin, Navigation, Target } from "lucide-react";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";

export function Map() {
  const { theme } = useTheme();

  // Mock TAG locations around KSU campus
  const tagLocations = [
    {
      id: 1,
      title: "Need help finding Carmichael Student Center",
      user: "Sarah Chen",
      xp: 50,
      category: "Campus Tour",
      distance: "0.2 mi",
    },
    {
      id: 2,
      title: "Looking for study buddy at Library",
      user: "Mike Rodriguez",
      xp: 50,
      category: "Study Help",
      distance: "0.4 mi",
    },
    {
      id: 3,
      title: "Need directions to the Science Building",
      user: "Emma Watson",
      xp: 50,
      category: "Directions",
      distance: "0.6 mi",
    },
    {
      id: 4,
      title: "Help with campus parking",
      user: "James Kim",
      xp: 50,
      category: "Campus Help",
      distance: "0.8 mi",
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
            <h1 className={`font-['Poppins'] text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              TAG <span className="text-yellow-500">Map</span>
            </h1>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-2 rounded-full transition-colors">
              <Target className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="max-w-md mx-auto px-6 py-4">
        <div className={`rounded-2xl p-8 mb-6 border-2 ${
          theme === "dark" 
            ? "bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500" 
            : "bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-200"
        }`}>
          <div className="text-center">
            <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
            <h2 className={`font-['Poppins'] text-lg font-bold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Kennesaw State University
            </h2>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Showing nearby TAGs on campus
            </p>
          </div>
        </div>

        {/* Nearby TAGs */}
        <div className="mb-4">
          <h3 className={`font-['Poppins'] font-semibold mb-3 flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            <Navigation className="w-5 h-5 text-yellow-500" />
            Nearby TAGs
          </h3>
        </div>

        <div className="space-y-3">
          {tagLocations.map((tag) => (
            <div
              key={tag.id}
              className={`rounded-xl p-4 shadow-sm border ${
                theme === "dark" ? "bg-black border-yellow-500/30" : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
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
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-3 text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}>
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {tag.distance}
                      </span>
                      <span>+{tag.xp} XP</span>
                    </div>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}