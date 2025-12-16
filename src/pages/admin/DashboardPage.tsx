import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useOrderStatistics } from '../../hooks/useOrders';
import { useCollaborationStats } from '../../hooks/useCollaborations';
import { beatService, orderService } from '../../lib/firebase/services';
import { TrendingUp, DollarSign, ShoppingBag, Music, Handshake, Users } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { stats: orderStats } = useOrderStatistics();
  const { stats: collabStats } = useCollaborationStats();
  const [totalBeats, setTotalBeats] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const beats = await beatService.getAllBeats();
      setTotalBeats(beats.data.length);

      const orders = await orderService.getRecentOrders(5);
      setRecentOrders(orders);
    };

    fetchData();
  }, []);

  const stats = [
    {
      name: 'Total Revenue',
      value: `€${orderStats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Total Orders',
      value: orderStats.totalOrders,
      icon: ShoppingBag,
      change: `${orderStats.pendingOrders} pending`,
      changeType: 'neutral',
    },
    {
      name: 'Total Beats',
      value: totalBeats,
      icon: Music,
      change: 'In catalog',
      changeType: 'neutral',
    },
    {
      name: 'Active Collaborations',
      value: collabStats.active,
      icon: Handshake,
      change: `${collabStats.completed} completed`,
      changeType: 'positive',
    },
    {
      name: 'Avg Order Value',
      value: `€${orderStats.averageOrderValue.toFixed(2)}`,
      icon: TrendingUp,
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      name: 'Pending Revenue',
      value: `€${collabStats.pendingRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: 'From collaborations',
      changeType: 'neutral',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.name}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    <p
                      className={`text-sm mt-2 ${
                        stat.changeType === 'positive'
                          ? 'text-green-400'
                          : stat.changeType === 'negative'
                          ? 'text-red-400'
                          : 'text-gray-400'
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl">
                    <Icon size={32} className="text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No orders yet</p>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-gray-400">{order.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">€{order.total.toFixed(2)}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : order.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/beats"
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <Music size={32} className="text-white mb-3" />
            <h3 className="text-white font-semibold">Manage Beats</h3>
            <p className="text-purple-100 text-sm mt-1">Add or edit beats</p>
          </a>

          <a
            href="/admin/orders"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            <ShoppingBag size={32} className="text-white mb-3" />
            <h3 className="text-white font-semibold">View Orders</h3>
            <p className="text-blue-100 text-sm mt-1">Process orders</p>
          </a>

          <a
            href="/admin/content"
            className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all"
          >
            <Users size={32} className="text-white mb-3" />
            <h3 className="text-white font-semibold">Content</h3>
            <p className="text-green-100 text-sm mt-1">Manage content</p>
          </a>

          <a
            href="/admin/collaborations"
            className="bg-gradient-to-r from-orange-600 to-red-600 p-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all"
          >
            <Handshake size={32} className="text-white mb-3" />
            <h3 className="text-white font-semibold">Collaborations</h3>
            <p className="text-orange-100 text-sm mt-1">Manage deals</p>
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
