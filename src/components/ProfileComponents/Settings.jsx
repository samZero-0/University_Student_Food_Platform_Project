
import { useState } from 'react';
import { FaLanguage, FaPalette, FaShieldAlt, FaBell } from 'react-icons/fa';

const Settings = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white  rounded-lg mt-10 mb-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Settings</h1>
      <div className="space-y-6">
        <div className="flex items-center">
          <FaLanguage className="text-2xl text-gray-600 mr-4" />
          <label htmlFor="language" className="flex-1 font-semibold text-gray-700">Language Preference</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
        <div className="flex items-center">
          <FaPalette className="text-2xl text-gray-600 mr-4" />
          <label htmlFor="theme" className="flex-1 font-semibold text-gray-700">Theme</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div className="flex items-center">
          <FaShieldAlt className="text-2xl text-gray-600 mr-4" />
          <label htmlFor="privacy" className="flex-1 font-semibold text-gray-700">Privacy</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyEnabled}
              onChange={(e) => setPrivacyEnabled(e.target.checked)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Enable enhanced privacy features</span>
          </div>
        </div>
        <div className="flex items-center">
          <FaBell className="text-2xl text-gray-600 mr-4" />
          <label htmlFor="notifications" className="flex-1 font-semibold text-gray-700">Receive Notifications</label>
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;

