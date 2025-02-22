import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private echo: Echo<any> | null = null;

  constructor(private http: HttpClient) {
    (window as any).Pusher = Pusher;
  }

  initializeWebSocket(token: string, tenant: string): Echo<any> {
    if (this.echo) {
      return this.echo;
    }

    const authorizeUrl = `${environment.AUTHORIZE_URL}/api/tenants/${tenant}/broadcasting/auth`;

    const isLocalDevelopment = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

    const params = {
      broadcaster: 'reverb',
      key: environment.PUSHER_KEY,
      wsHost: environment.PUSHER_HOST,
      wsPort: environment.PUSHER_PORT,
      wssPort: environment.PUSHER_PORT,
      cluster: environment.PUSHER_CLUSTER,
      forceTLS: isLocalDevelopment ? false : environment.PUSHER_FORCE_TLS,
      enabledTransports: ['ws', 'wss'],
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: string, callback: Function) => {
            this.http
              .post(
                authorizeUrl,
                {
                  socket_id: socketId,
                  channel_name: channel.name,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .subscribe({
                next: (response: any) => {
                  console.log('logou no websocket');
                  callback(false, response);
                },
                error: (error) => {
                  console.error('Erro na autorização do WebSocket:', error);
                  callback(true, error);
                },
              });
          },
        };
      },
    };

    console.log({ params });
    this.echo = new Echo<any>(params);
    return this.echo;
  }

  disconnect(): void {
    if (this.echo) {
      this.echo.disconnect();
      this.echo = null;
    }
  }
}
