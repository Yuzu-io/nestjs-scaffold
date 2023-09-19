import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ISocket } from './interfaces/socket.interface';
import { Server } from 'ws';

@WebSocketGateway({
  transports: ['websocket'],
  cors: { origin: '*' }
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connection')
  handleConnection(client: ISocket, payload: any) {
    console.log('握手成功');
    client.id = String(Math.floor(Math.random() * 10000 + 1));
    const str = JSON.stringify({ cmd: '', msg: '握手成功:' + client.id });
    client.send(str);

    client.onclose = () => {
      console.log('关闭', client.id);
    };
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    const jsonMsg = JSON.parse(payload);
    this.server.clients.forEach((item: ISocket) => {
        console.log('id:'+jsonMsg.id);
        item.send(JSON.stringify(jsonMsg));
    });
  }
}
