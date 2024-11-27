export class OrgaoMapper {
    public static toSubmit(form: any): { country_register: string } {
      return {
        country_register: form.country_register,
      };
    }
  }
  