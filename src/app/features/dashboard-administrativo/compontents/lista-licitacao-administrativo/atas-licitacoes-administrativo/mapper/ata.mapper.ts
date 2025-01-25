export class AtaLicitacaoMapper {
  public static toSubmit(form: any, selectedFiles: any): FormData {
    const formData = new FormData();
    const value = form || {};

    Object.keys(value).forEach((key) => {
      const valueForm = value[key];

      if (!valueForm || key === 'file') return;

      if (Array.isArray(valueForm)) {
        valueForm.forEach((item, index) => {
          if (!item) return;
          Object.keys(item).forEach((subKey) => {
            if (item[subKey] !== null && item[subKey] !== undefined) {
              formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
            }
          });
        });
      } else if (valueForm && typeof valueForm === 'object') {
        formData.append(key, JSON.stringify(valueForm));
      } else {
        formData.append(key, String(valueForm));
      }
    });

    if (selectedFiles?.file?.length > 0 && selectedFiles.file[0]) {
      const file = selectedFiles.file[0];
      formData.append('file', file, file.name);
    }

    return formData;
  }
}

export class ArquivoUploadMapper {
  public static toSubmit(form: any, file: File): FormData {
    const formData = new FormData();

    // Adiciona os campos do formulário ao FormData
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== undefined && key !== 'file') {
        formData.append(key, form[key]);
      }
    });

    // Adiciona o arquivo em formato binary ao FormData
    if (file) {
      formData.append('file', file, file.name);
    } else {
      console.warn('Nenhum arquivo selecionado para upload.');
    }

    return formData;
  }
}
