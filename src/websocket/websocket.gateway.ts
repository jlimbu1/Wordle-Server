import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  private rooms = new Map<string, Set<Socket>>();

  handleConnection(client: Socket) {
    client.on('joinRoom', (room: string, user: string) => {
      client.join(room);
      if (!this.rooms.has(room)) {
        this.rooms.set(room, new Set());
        console.log(`${room}: ${user} has created a room`);
      } else console.log(`${room}: ${user} has joined the room`);
      this.rooms.get(room).add(client);
    });

    client.on('guess', (room: string, guess: string, user: string) => {
      console.log(`${room}: ${user} has guessed ${guess}`);
      this.server.to(room).emit('guess', { user, guess });
    });
  }
}
