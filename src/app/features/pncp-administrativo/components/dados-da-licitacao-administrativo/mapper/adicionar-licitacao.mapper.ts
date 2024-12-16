export class AdicionarLicitacaoMapper {
  public static toSubmit(form: any) {
    let value = {
      ...form
    }
    value.agency = {
      country_register: value.agency.unit.agency.country_register,
      name: value.agency.unit.agency.name

    }
    return value
  }
}
