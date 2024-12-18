export class AdicionarArquivoLicitacaoMapper {
  public static toSubmit(form: any, selectedFiles: any): FormData {
    const formData = new FormData();
    const value = { ...form }; // Clona os dados do formulário

    // Itera sobre as chaves do formulário
    Object.keys(value).forEach((key) => {
      const valueForm = value[key];

      // Ignora a chave 'file' pois trataremos isso separadamente
      if (key === 'file') {
        return;
      }

      if (Array.isArray(valueForm)) {
        // Caso seja um array de objetos, serializa corretamente
        valueForm.forEach((item, index) => {
          Object.keys(item).forEach((subKey) => {
            formData.append(`${key}[${index}][${subKey}]`, item[subKey] ?? '');
          });
        });
      } else if (typeof valueForm === 'object') {
        // Serializa objetos individuais para JSON
        formData.append(key, JSON.stringify(valueForm));
      } else {
        // Adiciona valores simples
        formData.append(key, valueForm ?? '');
      }
    });

    // Adiciona arquivos ao FormData
    if (selectedFiles && selectedFiles.file && selectedFiles.file.length > 0) {
      selectedFiles.file.forEach((file: File) => {
        formData.append('file', file, file.name);
      });
    } else {
      console.warn('Nenhum arquivo selecionado para upload.');
    }

    return formData;
  }
}
