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

    const authorizeUrl = `${environment.AUTHORIZE_URL}/api/${tenant}/broadcasting/auth`;

    const params = {
      broadcaster: 'pusher',
      key: environment.PUSHER_KEY,
      wsHost: environment.PUSHER_HOST,
      wsPort: environment.PUSHER_PORT,
      wssPort: environment.PUSHER_PORT,
      cluster: environment.PUSHER_CLUSTER,
      forceTLS: environment.PUSHER_FORCE_TLS,
      // Define o authorizer para autenticação personalizada
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
                    Authorization: `Bearer ${token}`, // Passa o token no header
                  },
                }
              )
              .subscribe(
                (response: any) => {
                  callback(false, response); // Autorização bem-sucedida
                },
                (error) => {
                  console.error('Erro na autorização do WebSocket:', error);
                  callback(true, error); // Erro na autorização
                }
              );
          },
        };
      },
    };

    // Inicializa o Echo com os parâmetros configurados
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
