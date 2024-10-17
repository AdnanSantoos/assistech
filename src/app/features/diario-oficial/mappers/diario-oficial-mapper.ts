export class DiarioOficialMapper {
  public static toSearch(form: any) {
    let value = { ...form };

    if(value.year)
      value.year = parseInt(value.year.getFullYear())

    
    return value
  }
}
