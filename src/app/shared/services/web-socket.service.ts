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
    // Configuração global para Pusher
    (window as any).Pusher = Pusher;
  }

  initializeWebSocket(token: string, tenant: string): Echo<any> {
    if (this.echo) {
      return this.echo;
    }

    const authorizeUrl = `${environment.apiUrl}/api/${tenant}/broadcasting/auth`;

    const params = {
      broadcaster: 'pusher',
      key: environment.pusherKey,
      wsHost: environment.pusherHost,
      wsPort: environment.pusherPort,
      wssPort: environment.pusherPort,
      cluster: environment.pusherCluster,
      forceTLS: environment.pusherForceTLS,
      authorizer: (channel: any, options: any) => {
        return {
          authorize: (socketId: string, callback: Function) => {
            this.http
              .post(
                authorizeUrl,
                {
                  socket_id: socketId,
                  channel_name: channel.name,
                  token,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .subscribe(
                (response: any) => {
                  callback(false, response);
                },
                (error) => {
                  callback(true, error);
                }
              );
          },
        };
      },
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    };

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
