import { UsuarioData } from "../../../model/usuarios.model";

export class CadastrarUsuariosMapper {
    public static toSubmit(form: UsuarioData, slug: string) {
        let value = { ...form };

        value.tenant_slug = slug;
        return value
    }
    public static toEdit(updated: any, original: any) {
        const changes: any = {};

        for (const key in updated) {
            if (updated[key] !== original[key]) {
                changes[key] = updated[key];
            }
        }

        return changes;
    }

}

