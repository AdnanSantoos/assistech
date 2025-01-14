import { PhotoForm } from '../model/cadastrar-foto.model';

export class PhotoMapper {
  public static toFormData(file: File): FormData {
    const formData = new FormData();

    // Adiciona o arquivo com o nome 'photo'
    if (file) {
      formData.append('photo', file);
    } else {
      throw new Error('No photo file selected.');
    }

    return formData;
  }
}
