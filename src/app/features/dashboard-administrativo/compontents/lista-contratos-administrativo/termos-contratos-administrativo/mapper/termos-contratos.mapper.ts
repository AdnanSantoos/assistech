export class TermosContratosMapper {
    public static toSubmit(form: any, file: File): FormData {
      const formData = new FormData();
  
      // Adiciona os campos do formulário ao FormData
      Object.keys(form).forEach((key) => {
        if (key !== 'file') {
          formData.append(key, form[key]);
        }
      });
  
      // Adiciona o arquivo ao FormData
      if (file) {
        formData.append('file', file, file.name);
      }
  
      return formData;
    }
  }
  