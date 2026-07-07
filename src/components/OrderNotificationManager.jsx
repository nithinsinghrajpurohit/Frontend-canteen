import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://canteen-backend-7xui.onrender.com";
const API = `${BACKEND_URL}/api`;

const OrderNotificationManager = ({ user }) => {
  // We keep track of the known statuses of orders so we only alert when it CHANGES to ready
  const knownOrdersRef = useRef({});

  useEffect(() => {
    if (!user?.user_id) return;

    const checkOrders = async () => {
      try {
        const response = await axios.get(`${API}/orders/user/${user.user_id}`);
        const currentOrders = response.data;
        
        currentOrders.forEach(order => {
          const prevStatus = knownOrdersRef.current[order.order_id];
          
          // If we knew about this order before, and it WASN'T ready before, but now it IS ready
          if (prevStatus && prevStatus !== 'ready' && order.status === 'ready') {
            toast.success(`🎉 Your Order #${order.order_id.slice(-4)} is Ready for Pickup!`, {
              duration: 10000, // Keep it on screen for 10 seconds
            });
            
            // Optional: Play a sound
            try {
              const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
              audio.play();
            } catch (e) {
              console.log("Audio play failed");
            }
          }
          
          // Update our known status
          knownOrdersRef.current[order.order_id] = order.status;
        });
      } catch (error) {
        console.error("Failed to check order notifications");
      }
    };

    // Check immediately, then every 10 seconds
    checkOrders();
    const intervalId = setInterval(checkOrders, 10000);

    return () => clearInterval(intervalId);
  }, [user]);

  return null; // This component doesn't render anything visually
};

export default OrderNotificationManager;
