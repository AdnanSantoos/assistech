export class UnidadesMapper {
  public static toSubmit(form: any): { agency: string; agency_country_register: string } {
    return {
      agency: form.agency,
      agency_country_register: form.agency_country_register,
    };
  }
}
