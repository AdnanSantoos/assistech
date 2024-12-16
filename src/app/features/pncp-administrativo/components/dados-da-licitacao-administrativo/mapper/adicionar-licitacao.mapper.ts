export class AdicionarLicitacaoMapper {
  public static toSubmit(form: any) {
    let value = {
      ...form
    }
    const formData = new FormData();

    value.agency = {
      country_register: value.agency.unit.agency.country_register,
      name: value.agency.unit.agency.name
    }
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (value.files && value.files.length > 0) {
      value.files.forEach((file: File) => {
        formData.append('files[]', file);
      });
    } else {
      console.error("Nenhum arquivo foi selecionado.");
    }
    return value
  }
}
