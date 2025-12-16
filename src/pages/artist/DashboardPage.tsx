import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { collaborationService } from '../../lib/firebase/services/collaborationService';
import { orderService } from '../../lib/firebase/services/orderService';
import { Collaboration, Order } from '../../lib/firebase/types';
import Navigation from '../../components/Navigation';

const ArtistDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeCollaborations: 0,
    completedCollaborations: 0,
    beatsPurchased: 0,
    totalSpent: 0,
  });

  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      try {
        // Get collaborations
        const collabData = await collaborationService.getAll();
        const userCollabs = collabData.filter(
          (c) => c.clientEmail === user.email || c.assignedTo === user.uid
        );
        setCollaborations(userCollabs);

        // Get orders
        const orderData = await orderService.getOrdersByCustomer(user.email);
        setOrders(orderData);

        // Calculate stats
        const activeCollabs = userCollabs.filter(
          (c) => c.status === 'in_progress' || c.status === 'agreed' || c.status === 'signed'
        ).length;

        const completedCollabs = userCollabs.filter((c) => c.status === 'completed').length;

        const beatsPurchased = orderData
          .filter((o) => o.status === 'completed')
          .reduce((sum, o) => sum + o.items.length, 0);

        const totalSpent = orderData
          .filter((o) => o.status === 'completed')
          .reduce((sum, o) => sum + o.total, 0);

        setStats({
          activeCollaborations: activeCollabs,
          completedCollaborations: completedCollabs,
          beatsPurchased,
          totalSpent,
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
          <h1 className="text-3xl font-bold mb-2">Artist Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.displayName || 'Artist'}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Active Collaborations</div>
            <div className="text-3xl font-bold">{stats.activeCollaborations}</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Completed Projects</div>
            <div className="text-3xl font-bold">{stats.completedCollaborations}</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Beats Purchased</div>
            <div className="text-3xl font-bold">{stats.beatsPurchased}</div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Total Spent</div>
            <div className="text-3xl font-bold">€{stats.totalSpent.toFixed(2)}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Link
            to="/artist/collaborations"
            className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">🤝</div>
            <div className="font-semibold">Collaborations</div>
          </Link>

          <Link
            to="/artist/beats"
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">🎵</div>
            <div className="font-semibold">Browse Beats</div>
          </Link>

          <Link
            to="/customer/orders"
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">📦</div>
            <div className="font-semibold">My Purchases</div>
          </Link>

          <Link
            to="/artist/profile"
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-center transition"
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-semibold">Profile</div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Collaborations */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Active Collaborations</h2>
              <Link to="/artist/collaborations" className="text-purple-400 hover:text-purple-300">
                View All →
              </Link>
            </div>

            {collaborations.filter((c) => c.status === 'in_progress' || c.status === 'signed').length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-3xl mb-3">🤝</div>
                <p>No active collaborations</p>
              </div>
            ) : (
              <div className="space-y-3">
                {collaborations
                  .filter((c) => c.status === 'in_progress' || c.status === 'signed')
                  .slice(0, 3)
                  .map((collab) => (
                    <div key={collab.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="font-semibold mb-1">{collab.title}</div>
                      <div className="text-sm text-gray-400 mb-2 capitalize">
                        {collab.type} • {collab.status.replace('_', ' ')}
                      </div>
                      {collab.deadline && (
                        <div className="text-xs text-yellow-400">
                          Deadline: {collab.deadline.toDate?.()?.toLocaleDateString() || 'N/A'}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Recent Purchases */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Purchases</h2>
              <Link to="/customer/orders" className="text-purple-400 hover:text-purple-300">
                View All →
              </Link>
            </div>

            {orders.filter((o) => o.status === 'completed').length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-3xl mb-3">🎵</div>
                <p className="mb-3">No purchases yet</p>
                <Link
                  to="/artist/beats"
                  className="inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm transition"
                >
                  Browse Beats
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders
                  .filter((o) => o.status === 'completed')
                  .slice(0, 3)
                  .map((order) => (
                    <div key={order.id} className="bg-gray-700 rounded-lg p-4">
                      <div className="font-semibold mb-1">{order.orderNumber}</div>
                      <div className="text-sm text-gray-400 mb-2">
                        {order.items.length} beat(s) • €{order.total.toFixed(2)}
                      </div>
                      <div className="text-xs text-green-400">
                        {order.completedAt?.toDate?.()?.toLocaleDateString() || 'Completed'}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-purple-900/30 border border-purple-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🎤</div>
            <div>
              <h3 className="font-bold text-lg mb-2">Collaborate with Jonna Rincon</h3>
              <p className="text-gray-300 mb-4">
                Work together on exclusive tracks, remixes, and productions. Get access to premium beats
                and collaborate on exciting projects.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/artist/collaborations"
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition"
                >
                  View Collaborations
                </Link>
                <Link
                  to="/artist/beats"
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
                >
                  Browse Beats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
