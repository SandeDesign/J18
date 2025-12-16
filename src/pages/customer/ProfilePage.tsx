import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../lib/firebase/services/authService';
import Navigation from '../../components/Navigation';

const CustomerProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await authService.updateUserProfile({ displayName });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setLoading(false);
      return;
    }

    try {
      await authService.updateUserPassword(newPassword);
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/customer/dashboard" className="text-gray-400 hover:text-white">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                {user?.displayName?.charAt(0)?.toUpperCase() || '👤'}
              </div>
              <h3 className="font-bold text-xl mb-1">{user?.displayName || 'Customer'}</h3>
              <p className="text-gray-400 text-sm mb-4">{user?.email}</p>
              <div className="inline-block px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-xs font-semibold">
                Customer Account
              </div>
            </div>
          </div>

          {/* Forms Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Message Display */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-900/30 border border-green-700 text-green-300'
                    : 'bg-red-900/30 border border-red-700 text-red-300'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Profile Information */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 opacity-50 cursor-not-allowed"
                      disabled
                    />
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setDisplayName(user?.displayName || '');
                      }}
                      className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-1">Display Name</div>
                    <div className="font-semibold">{user?.displayName || 'Not set'}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Email</div>
                    <div className="font-semibold">{user?.email}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Change Password */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Change Password</h2>

              <form onSubmit={handleUpdatePassword}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Enter new password"
                    minLength={6}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                    placeholder="Confirm new password"
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !newPassword || !confirmPassword}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Account Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Account Actions</h2>

              <div className="space-y-4">
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
