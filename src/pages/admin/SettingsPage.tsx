import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Store, Globe, Bell, Shield, Database, Save } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shop' | 'general' | 'notifications' | 'security'>('shop');
  const [shopSettings, setShopSettings] = useState({
    storeName: 'Jonna Rincon Beat Store',
    storeDescription: 'Premium beats and music production by Jonna Rincon',
    heroTitle: 'Premium Beats',
    heroSubtitle: 'Explore high-quality beats by Jonna Rincon',
    featuredEnabled: true,
    trendingEnabled: true,
    genres: ['Trap', 'Hip Hop', 'Drill', 'R&B', 'Pop', 'Electronic', 'Afrobeat'],
    currency: 'EUR',
    taxRate: 21,
    enableDownloads: true,
    watermarkPreviews: true,
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveShopSettings = async () => {
    try {
      // TODO: Implement Firebase save logic
      console.log('Saving shop settings:', shopSettings);
      setMessage({ type: 'success', text: 'Shop settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Failed to save shop settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    }
  };

  const tabs = [
    { id: 'shop' as const, name: 'Shop Settings', icon: Store },
    { id: 'general' as const, name: 'General', icon: Globe },
    { id: 'notifications' as const, name: 'Notifications', icon: Bell },
    { id: 'security' as const, name: 'Security', icon: Shield },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">Manage your platform configuration and preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-900/20 border-green-700 text-green-400'
                : 'bg-red-900/20 border-red-700 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Shop Settings Tab */}
        {activeTab === 'shop' && (
          <div className="space-y-6">
            {/* Store Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Store size={24} className="text-purple-400" />
                Store Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={shopSettings.storeName}
                    onChange={(e) =>
                      setShopSettings({ ...shopSettings, storeName: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Store Description
                  </label>
                  <textarea
                    value={shopSettings.storeDescription}
                    onChange={(e) =>
                      setShopSettings({ ...shopSettings, storeDescription: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={shopSettings.heroTitle}
                      onChange={(e) =>
                        setShopSettings({ ...shopSettings, heroTitle: e.target.value })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Hero Subtitle
                    </label>
                    <input
                      type="text"
                      value={shopSettings.heroSubtitle}
                      onChange={(e) =>
                        setShopSettings({ ...shopSettings, heroSubtitle: e.target.value })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Features */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Shop Features</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Featured Beats</p>
                    <p className="text-sm text-gray-400">Show featured badge on selected beats</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shopSettings.featuredEnabled}
                      onChange={(e) =>
                        setShopSettings({ ...shopSettings, featuredEnabled: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Trending Beats</p>
                    <p className="text-sm text-gray-400">Show trending badge on popular beats</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shopSettings.trendingEnabled}
                      onChange={(e) =>
                        setShopSettings({ ...shopSettings, trendingEnabled: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Enable Downloads</p>
                    <p className="text-sm text-gray-400">Allow customers to download purchased beats</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shopSettings.enableDownloads}
                      onChange={(e) =>
                        setShopSettings({ ...shopSettings, enableDownloads: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Watermark Previews</p>
                    <p className="text-sm text-gray-400">Add watermark to preview audio files</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shopSettings.watermarkPreviews}
                      onChange={(e) =>
                        setShopSettings({ ...shopSettings, watermarkPreviews: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Payment Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Currency
                  </label>
                  <select
                    value={shopSettings.currency}
                    onChange={(e) =>
                      setShopSettings({ ...shopSettings, currency: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={shopSettings.taxRate}
                    onChange={(e) =>
                      setShopSettings({ ...shopSettings, taxRate: parseFloat(e.target.value) })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveShopSettings}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg text-white font-medium transition-all"
              >
                <Save size={20} />
                Save Shop Settings
              </button>
            </div>
          </div>
        )}

        {/* Other Tabs (Placeholder) */}
        {activeTab === 'general' && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-center py-12">
              <Globe size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-xl text-white mb-2">General Settings</p>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-center py-12">
              <Bell size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-xl text-white mb-2">Notification Settings</p>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-center py-12">
              <Shield size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-xl text-white mb-2">Security Settings</p>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
