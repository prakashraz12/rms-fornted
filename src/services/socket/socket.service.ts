import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  connect(restaurantId?: number) {
    // Connect to the orders namespace
    this.socket = io('http://localhost:3000/orders', {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
      
      // Join restaurant-specific room if restaurantId is provided
      if (restaurantId) {
        this.socket && this.socket.emit('joinRoom', `restaurant_${restaurantId}`);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return this.socket;
  }

  // Listen for new orders
  onNewOrder(callback: (order: any) => void) {
    if (!this.socket) {
      throw new Error('Socket connection not established. Call connect() first.');
    }
    this.socket.on('newOrder', callback);
  }

  // Listen for order updates
  onOrderUpdated(callback: (order: any) => void) {
    if (!this.socket) {
      throw new Error('Socket connection not established. Call connect() first.');
    }
    this.socket.on('orderUpdated', callback);
  }

  // Listen for order status changes
  onOrderStatusChanged(callback: (order: any) => void) {
    if (!this.socket) {
      throw new Error('Socket connection not established. Call connect() first.');
    }
    this.socket.on('orderStatusChanged', callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();