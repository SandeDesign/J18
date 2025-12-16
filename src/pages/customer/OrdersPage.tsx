import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { orderService } from '../../lib/firebase/services/orderService';
import { Order } from '../../lib/firebase/types';
import Navigation from '../../components/Navigation';

const CustomerOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing' | 'pending'>('all');

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      try {
        const allOrders = await orderService.getOrdersByCustomer(user.email);
        setOrders(allOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading orders...</div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-400">View and manage your order history</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          {(['all', 'completed', 'processing', 'pending'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 capitalize transition ${
                filter === status
                  ? 'border-b-2 border-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {status}
              <span className="ml-2 text-sm">
                ({status === 'all' ? orders.length : orders.filter((o) => o.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-xl mb-2">No orders found</p>
            <p className="text-gray-400 mb-6">
              {filter === 'all' ? "You haven't placed any orders yet" : `No ${filter} orders`}
            </p>
            <Link
              to="/shop/beats"
              className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition"
            >
              Browse Beats
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-700 p-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg mb-1">{order.orderNumber}</div>
                    <div className="text-sm text-gray-400">
                      Placed on {order.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
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
                    <div className="font-bold">€{order.total.toFixed(2)}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <img
                          src={item.artworkUrl || '/placeholder-beat.png'}
                          alt={item.beatTitle}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{item.beatTitle}</div>
                          <div className="text-sm text-gray-400 capitalize">
                            {item.licenseType} License
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">€{item.price.toFixed(2)}</div>
                          {order.status === 'completed' && order.downloadLinks?.[item.beatId] && (
                            <a
                              href={order.downloadLinks[item.beatId]}
                              className="text-sm text-purple-400 hover:text-purple-300"
                              download
                            >
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  {order.status === 'completed' && (
                    <div className="mt-4 pt-4 border-t border-gray-700 flex gap-4">
                      <Link
                        to="/customer/downloads"
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        View Downloads →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
