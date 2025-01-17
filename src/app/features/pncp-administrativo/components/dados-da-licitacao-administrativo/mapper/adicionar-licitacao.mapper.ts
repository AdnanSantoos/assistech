export class AdicionarLicitacaoMapper {
  public static toSubmit(form: any, selectedFile: any, hasItems: boolean): FormData {
    try {
      // Cria uma cópia do form para não modificar o original
      const value = {
        ...form
      };

      // Converte datas para ISO string
      if (value.opening_date_proposal) {
        value.opening_date_proposal = new Date(value.opening_date_proposal).toISOString();
      }
      if (value.closing_date_proposal) {
        value.closing_date_proposal = new Date(value.closing_date_proposal).toISOString();
      }

      // Trata os itens
      if (!hasItems) {
        value.items = null;
      } else if (value.items?.length > 0) {
        value.items.forEach((item:any,index:number) => {
          item.number = index + 1;
        });
      }

      const formData = new FormData();

      // Função auxiliar para adicionar campos ao FormData
      const appendToFormData = (key: string, value: any) => {
        if (value === null || value === undefined) {
          formData.append(key, '');
          return;
        }

        if (key === 'file') {
          return; // Ignora o campo file pois será tratado separadamente
        }

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'object') {
              Object.entries(item).forEach(([subKey, subValue]) => {
                formData.append(`${key}[${index}][${subKey}]`, subValue?.toString() ?? '');
              });
            } else {
              formData.append(`${key}[${index}]`, item?.toString() ?? '');
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value?.toString() ?? '');
        }
      };

      // Adiciona todos os campos do form
      Object.entries(value).forEach(([key, value]) => {
        appendToFormData(key, value);
      });

      // Trata os arquivos
      if (selectedFile?.file?.length > 0) {
        selectedFile.file.forEach((file: File) => {
          formData.append('file', file);
        });
      } else {
        console.warn("Nenhum arquivo selecionado");
      }

      return formData;

    } catch (error) {
      console.error("Erro ao processar formulário:", error);
      throw new Error("Falha ao processar dados do formulário");
    }
  }
}