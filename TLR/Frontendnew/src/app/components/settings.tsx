import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/theme-context";
import { BottomNav } from "./bottom-nav";
import {
  ChevronRight,
  ChevronLeft,
  Bell,
  Lock,
  Eye,
  MapPin,
  Download,
  Mail,
  Smartphone,
  Moon,
  Globe,
  HelpCircle,
  FileText,
  Shield,
} from "lucide-react";

export function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);

  const settingsSections = [
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          id: "notifications",
          label: "Enable Notifications",
          description: "Receive TAG alerts and messages",
          type: "toggle",
          value: notifications,
          onChange: setNotifications,
        },
        {
          id: "push",
          label: "Push Notifications",
          description: "Get instant updates on your device",
          type: "toggle",
          value: pushNotifications,
          onChange: setPushNotifications,
        },
        {
          id: "email",
          label: "Email Notifications",
          description: "Receive weekly summaries via email",
          type: "toggle",
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
      ],
    },
    {
      title: "Updates & App",
      icon: Download,
      items: [
        {
          id: "auto-updates",
          label: "Automatic Updates",
          description: "Download updates automatically",
          type: "toggle",
          value: autoUpdates,
          onChange: setAutoUpdates,
        },
        {
          id: "app-version",
          label: "App Version",
          description: "v2.4.1 (Latest)",
          type: "info",
        },
        {
          id: "check-updates",
          label: "Check for Updates",
          description: "Manually check for new versions",
          type: "button",
        },
      ],
    },
    {
      title: "Privacy & Location",
      icon: Lock,
      items: [
        {
          id: "location",
          label: "Location Sharing",
          description: "Share your location with nearby players",
          type: "toggle",
          value: locationSharing,
          onChange: setLocationSharing,
        },
        {
          id: "visibility",
          label: "Profile Visibility",
          description: "Control who can see your profile",
          type: "link",
        },
        {
          id: "privacy-policy",
          label: "Privacy Policy",
          description: "Read our privacy terms",
          type: "link",
        },
      ],
    },
    {
      title: "Appearance",
      icon: Moon,
      items: [
        {
          id: "dark-mode",
          label: "Dark Mode",
          description: "Switch to dark theme",
          type: "toggle",
          value: theme === "dark",
          onChange: toggleTheme,
          disabled: false,
        },
        {
          id: "language",
          label: "Language",
          description: "English (US)",
          type: "link",
        },
      ],
    },
    {
      title: "Support & Legal",
      icon: HelpCircle,
      items: [
        {
          id: "help",
          label: "Help Center",
          description: "Get help with using the app",
          type: "link",
        },
        {
          id: "terms",
          label: "Terms of Service",
          description: "View our terms and conditions",
          type: "link",
        },
        {
          id: "about",
          label: "About Tag You're It",
          description: "Learn more about our app",
          type: "link",
        },
      ],
    },
  ];

  return (
    <div
      className={`min-h-screen pb-24 transition-colors ${
        theme === "dark"
          ? "bg-black"
          : "bg-gradient-to-b from-yellow-50 to-white"
      }`}
    >
      {/* Header */}
      <div
        className={`px-6 pt-12 pb-8 ${
          theme === "dark"
            ? "bg-gradient-to-br from-yellow-500 to-yellow-600"
            : "bg-gradient-to-br from-yellow-400 to-yellow-500"
        }`}
      >
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate("/profile")}
            className="text-gray-900 mb-6 flex items-center gap-2 hover:gap-3 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                theme === "dark" ? "bg-black" : "bg-white"
              }`}
            >
              <Shield className="w-7 h-7 text-yellow-500" />
            </div>
            <div>
              <h1 className="font-['Poppins'] text-2xl font-bold text-gray-900">
                Settings
              </h1>
              <p className="text-sm text-gray-800">Manage your preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {settingsSections.map((section, index) => (
          <div
            key={section.title}
            className={`rounded-2xl shadow-md border overflow-hidden ${
              theme === "dark"
                ? "bg-black border-yellow-500/30"
                : "bg-white border-gray-100"
            }`}
          >
            <div
              className={`p-4 border-b ${
                theme === "dark"
                  ? "border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <section.icon className="w-5 h-5 text-yellow-500" />
                <h2
                  className={`font-['Poppins'] font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {section.title}
                </h2>
              </div>
            </div>
            <div
              className={`divide-y ${
                theme === "dark" ? "divide-yellow-500/20" : "divide-gray-100"
              }`}
            >
              {section.items.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3
                        className={`font-semibold text-sm mb-1 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.label}
                      </h3>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    {item.type === "toggle" && (
                      <button
                        onClick={() =>
                          !item.disabled && item.onChange?.(!item.value)
                        }
                        disabled={item.disabled}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value && !item.disabled
                            ? theme === "dark"
                              ? "bg-yellow-500"
                              : "bg-yellow-400"
                            : theme === "dark"
                            ? "bg-gray-700"
                            : "bg-gray-300"
                        } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                            theme === "dark" && item.value ? "bg-black" : "bg-white"
                          } ${
                            item.value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    )}
                    {item.type === "link" && (
                      <ChevronRight
                        className={`w-5 h-5 ${
                          theme === "dark" ? "text-yellow-500" : "text-gray-400"
                        }`}
                      />
                    )}
                    {item.type === "button" && (
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                            : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                        }`}
                      >
                        Check
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div
          className={`rounded-2xl shadow-md border-2 overflow-hidden ${
            theme === "dark"
              ? "bg-black border-red-500/50"
              : "bg-white border-red-200"
          }`}
        >
          <div
            className={`p-4 border-b ${
              theme === "dark"
                ? "border-red-500/50 bg-gradient-to-r from-red-500/20 to-red-600/20"
                : "border-red-100 bg-red-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-red-500" />
              <h2
                className={`font-['Poppins'] font-bold ${
                  theme === "dark" ? "text-red-400" : "text-red-900"
                }`}
              >
                Danger Zone
              </h2>
            </div>
          </div>
          <div className="p-4">
            <button
              className={`w-full font-semibold py-3 px-4 rounded-xl transition-colors border ${
                theme === "dark"
                  ? "bg-red-950 hover:bg-red-900 text-red-400 border-red-500/50"
                  : "bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
              }`}
            >
              Delete Account
            </button>
            <p
              className={`text-xs text-center mt-2 ${
                theme === "dark" ? "text-gray-500" : "text-gray-500"
              }`}
            >
              This action cannot be undone
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}