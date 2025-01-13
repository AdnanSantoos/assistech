export class PublicarDiarioOficialMapper {
  public static toSubmit(form: any) {
    console.log(form);
    const formData = new FormData();
    let value = { ...form };
    formData.append('date', value.date);
    formData.append('description', value.description);

    if (value.files && value.files.length > 0) {
      value.files.forEach((file: File) => {
        formData.append('files[]', file);
      });
    } else {
      console.error('Nenhum arquivo foi selecionado.');
    }
    return formData;
  }

  public static toAttachSubmit(form: any, file: File) {
    const formData = new FormData();

    // Adiciona a data de assinatura se existir
    if (form.signature_date) {
      formData.append('signature_date', form.signature_date);
    }

    // Adiciona o arquivo
    if (file) {
      formData.append('file', file);
    } else {
      console.error('Nenhum arquivo foi selecionado.');
    }

    return formData;
  }
}
