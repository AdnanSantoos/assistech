import { Noticia } from "../models/cadastrar-noticias.model";

export class NoticiaMapper {
  static toFormData(noticiaFormValue: any): FormData {
    const formData = new FormData();

    formData.append('tenant', noticiaFormValue.tenant);
    formData.append('title', noticiaFormValue.title);
    formData.append('content', noticiaFormValue.content);
    formData.append('author', noticiaFormValue.author);
    formData.append('published_at', noticiaFormValue.published_at);

    if (noticiaFormValue.image) {
      formData.append('image', noticiaFormValue.image);
    } else {
      console.error("Nenhuma URL de imagem foi fornecida.");
    }

    return formData;
  }
}
