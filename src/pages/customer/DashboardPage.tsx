import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { orderService } from '../../lib/firebase/services/orderService';
import { Order } from '../../lib/firebase/types';
import Navigation from '../../components/Navigation';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    totalDownloads: 0,
  });

  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      try {
        // Get recent orders (limit to 5)
        const orders = await orderService.getOrdersByCustomer(user.email);
        const recentFive = orders.slice(0, 5);
        setRecentOrders(recentFive);

        // Calculate stats
        const totalSpent = orders
          .filter((o) => o.status === 'completed')
          .reduce((sum, o) => sum + o.total, 0);

        const totalDownloads = orders
          .filter((o) => o.status === 'completed')
          .reduce((sum, o) => sum + o.items.length, 0);

        setStats({
          totalOrders: orders.length,
          totalSpent,
          totalDownloads,
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName || 'Customer'}!</h1>
          <p className="text-gray-400">Manage your orders, downloads, and profile</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Total Orders</div>
            <div className="text-3xl font-bold">{stats.totalOrders}</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Total Spent</div>
            <div className="text-3xl font-bold">€{stats.totalSpent.toFixed(2)}</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Total Downloads</div>
            <div className="text-3xl font-bold">{stats.totalDownloads}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Link
            to="/shop/beats"
            className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">🎵</div>
            <div className="font-semibold">Browse Beats</div>
          </Link>

          <Link
            to="/customer/orders"
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">📦</div>
            <div className="font-semibold">My Orders</div>
          </Link>

          <Link
            to="/customer/downloads"
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">⬇️</div>
            <div className="font-semibold">Downloads</div>
          </Link>

          <Link
            to="/customer/profile"
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-semibold">Profile</div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <Link to="/customer/orders" className="text-purple-400 hover:text-purple-300">
              View All →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-lg mb-4">No orders yet</p>
              <Link
                to="/shop/beats"
                className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold mb-1">{order.orderNumber}</div>
                    <div className="text-sm text-gray-400">
                      {order.items.length} item(s) • €{order.total.toFixed(2)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                        order.status === 'completed'
                          ? 'bg-green-900 text-green-300'
                          : order.status === 'processing'
                          ? 'bg-blue-900 text-blue-300'
                          : order.status === 'pending'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {order.status}
                    </div>
                    <div className="text-sm text-gray-400">
                      {order.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
