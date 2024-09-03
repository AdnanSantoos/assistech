export class PublicarDiarioOficialMapper {
    public static toSubmit(form:any){
        console.log(form)
        let value ={ ...form}
        value.files = [form.files]
        delete value.title
        return value
    }
}
