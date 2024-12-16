export class AdicionarLicitacaoMapper {
  public static toSubmit(form: any,selectedFile:any,itens:boolean) {
    let value = {
      ...form
    }

    value.opening_date_proposal = new Date(value.opening_date_proposal).toISOString();
    value.closing_date_proposal = new Date(value.closing_date_proposal).toISOString();
    
    if(!itens){
      value.items = null
    }  
    else{
      value.items = [value.items]
      value.items[0].number = 1
    }

    const formData = new FormData();
    Object.keys(value).forEach((key) => {
      const valueForm = value[key];
    
      if (key=='file') {
       return
      }
      else if (Array.isArray(valueForm)) {
        valueForm.forEach((item, index) => {
          Object.keys(item).forEach((subKey) => {
            formData.append(`${key}[${index}][${subKey}]`, item[subKey] ?? '');
          });
        });
      } else if (typeof valueForm === 'object') {
        formData.append(key, JSON.stringify(valueForm));
      } 
      
      else if (Array.isArray(valueForm) || typeof valueForm === 'object') {
        // Serializa arrays ou objetos para JSON
        formData.append(key, JSON.stringify(valueForm));
      } else {
        // Adiciona valores simples
        formData.append(key, valueForm);
      }
    });

    if (selectedFile.file && selectedFile.file.length > 0) {
      selectedFile.file.forEach((file: File) => {
        formData.append('file', file);
      });
    } else {
      console.error("Nenhum arquivo foi selecionado.");
    }
    return formData
  }
}
