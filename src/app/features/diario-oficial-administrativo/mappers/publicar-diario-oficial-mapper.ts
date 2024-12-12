export class PublicarDiarioOficialMapper {
  public static toSubmit(form: any) {
    console.log(form)
    const formData = new FormData();
    let value = { ...form };
    formData.append('date', value.date);
    formData.append('description', value.description);

    if (value.files && value.files.length > 0) {
      value.files.forEach((file: File) => {
        formData.append('files[]', file);
      });
    } else {
      console.error("Nenhum arquivo foi selecionado.");
    }
    return formData;
  }
}
