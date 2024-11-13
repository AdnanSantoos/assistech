import { Noticia } from "../models/cadastrar-noticias.model";

export class NoticiaMapper {
    static fromApiResponse(response: any): Noticia {
      return {
        id: response.id,
        created_by: response.created_by,
        tenant: response.tenant,
        title: response.title,
        content: response.content,
        author: response.author,
        published_at: response.published_at,
        image: response.image,
      };
    }
  
    static toApiRequest(noticia: Noticia): any {
      return {
        created_by: noticia.created_by,
        tenant: noticia.tenant,
        title: noticia.title,
        content: noticia.content,
        author: noticia.author,
        published_at: noticia.published_at,
        image: noticia.image,
      };
    }
  }
  