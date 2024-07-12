import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io('http://localhost:8800');

const Notification = ({ setNotification }) => {
  const user = useSelector((state) => state.authReducer.authData?.user);

  useEffect(() => {
    if (user && user._id) {
      // Add user to socket server
      socket.emit('new-user-add', user._id);

      socket.on('get-users', (users) => {
        console.log('Active users:', users);
      });

      // Listen for love notifications
      socket.on('receive-love-notification', (data) => {
        console.log('Love notification received:', data);
        setNotification((prev) => [...prev, data]);
      });

      // Listen for comment notifications
      socket.on('receive-comment-notification', (data) => {
        console.log('Comment notification received:', data);
        setNotification((prev) => [...prev, data]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user, setNotification]);

  return null;
};

export default Notification;
