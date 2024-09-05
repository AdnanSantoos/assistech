export class PublicarDiarioOficialMapper {
    public static toSubmit(form: any) {
        const formData = new FormData();
        let value = { ...form }
        formData.append('date', value.date);
        formData.append('files[]', value.files); // Aqui você anexa o arquivo binário
        formData.append('description', value.description);
        return formData
    }
}
