import { UsuarioData } from "../../../model/usuarios.model";

export class CadastrarUsuariosMapper {
    public static toSubmit(form: UsuarioData, slug: string) {
        let value = { ...form };

        value.tenant_slug = slug;
        console.log('console no mapper',value)
        return value
    }
}
