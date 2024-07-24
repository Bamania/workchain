// File: src/components/NotificationsPage.js
import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://workchain.onrender.com/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleApprove = async (notificationId) => {
    try {
      const response = await fetch(`https://workchain.onrender.com/api/approve/${notificationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      alert(data.message);
      // Refresh notifications after approval
      setNotifications(notifications.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error('Failed to approve application:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Notifications</h1>
      {notifications.length > 0 ? (
        <div className="w-full max-w-4xl space-y-4">
          {notifications.map((notification) => (
            <div key={notification._id} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">{notification.message}</p>
              {notification.type === 'application' && notification.status !== 'approved' && (
                <button
                  onClick={() => handleApprove(notification._id)}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Approve
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No notifications at the moment.</p>
      )}
    </div>
  );
};

export default NotificationsPage;
