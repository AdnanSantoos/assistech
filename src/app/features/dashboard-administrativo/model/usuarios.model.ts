export interface UsuarioData {
  id?: string;
  name: string;
  email: string;
  username: string;
  country_register?: string;
  phone?: string;
  is_active?: boolean;
  password: string;
  password_confirmation: string;
  tenant_slug?: string;
  role: string;
  permissions: {
    diario_oficial: {
      add: boolean;
    };
    pncp: {
      add: boolean;
      edit_own: boolean;
      edit_others: boolean;
    };
    transparencia: {
      add: boolean;
      edit_own: boolean;
      edit_others: boolean;
    };
  };
  tenant: {
    slug: string;
    name: string;
  };
}