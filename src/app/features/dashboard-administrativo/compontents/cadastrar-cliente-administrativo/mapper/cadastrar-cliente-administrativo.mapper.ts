import { ClienteData } from "../../../model/cliente.model";

export class CadastrarClienteMapper {
    public static toSubmit(form: ClienteData) {
        let value = { ...form };

        return value
    }


}

