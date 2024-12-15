export class AdicionarLicitacaoMapper {
    public static toSubmit(form: any): FormData {
      const formData = new FormData();
      let value = { ...form };
  
      // Adicionando os campos obrigatórios com validação
      this.appendField(formData, 'agency_country_register', value.agency_country_register, "O campo 'agency_country_register' é obrigatório.");
      this.appendField(formData, 'document_title', value.document_title, "O campo 'document_title' é obrigatório.");
      this.appendField(formData, 'unit_id', value.unit_id, "O campo 'unit_id' é obrigatório.");
      this.appendField(formData, 'document_type_id', value.document_type_id, "O campo 'document_type_id' é obrigatório.");
      this.appendField(formData, 'call_instrument_id', value.call_instrument_id, "O campo 'call_instrument_id' é obrigatório.");
      this.appendField(formData, 'contracting_modality_id', value.contracting_modality_id, "O campo 'contracting_modality_id' é obrigatório.");
      this.appendField(formData, 'dispute_mode_id', value.dispute_mode_id, "O campo 'dispute_mode_id' é obrigatório.");
      this.appendField(formData, 'legal_basic_id', value.legal_basic_id, "O campo 'legal_basic_id' é obrigatório.");
      this.appendField(formData, 'number', value.number, "O campo 'number' é obrigatório.");
      this.appendField(formData, 'year', value.year?.toString(), "O campo 'year' é obrigatório.");
      this.appendField(formData, 'process_number', value.process_number, "O campo 'process_number' é obrigatório.");
      this.appendField(formData, 'goals', value.goals, "O campo 'goals' é obrigatório.");
      this.appendField(formData, 'contracting_situation_id', value.contracting_situation_id, "O campo 'contracting_situation_id' é obrigatório.");
      this.appendField(formData, 'additional_information', value.additional_information);
      this.appendField(formData, 'opening_date_proposal', value.opening_date_proposal, "O campo 'opening_date_proposal' é obrigatório.");
      this.appendField(formData, 'closing_date_proposal', value.closing_date_proposal, "O campo 'closing_date_proposal' é obrigatório.");
  
      // Tratando os arquivos
      if (value.files && value.files.length > 0) {
        value.files.forEach((file: File) => {
          formData.append('files[]', file);
        });
      } else if (value.file) {
        formData.append('file', value.file);
      } else {
        console.error("O campo 'file' ou 'files' é obrigatório.");
      }
  
      // Tratando os itens (campo obrigatório)
      if (value.items && Array.isArray(value.items) && value.items.length > 0) {
        value.items.forEach((item: any, index: number) => {
          this.appendField(formData, `items[${index}][tenant_slug]`, item.tenant_slug);
          this.appendField(formData, `items[${index}][created_by_id]`, item.created_by_id);
          this.appendField(formData, `items[${index}][procurement_id]`, item.procurement_id);
          this.appendField(formData, `items[${index}][item_type]`, item.item_type);
          this.appendField(formData, `items[${index}][benefit_type_id]`, item.benefit_type_id);
          this.appendField(formData, `items[${index}][basic_productive_incentive]`, item.basic_productive_incentive ? 'true' : 'false');
          this.appendField(formData, `items[${index}][description]`, item.description);
          this.appendField(formData, `items[${index}][quantity]`, item.quantity?.toString());
          this.appendField(formData, `items[${index}][unit_of_measurement]`, item.unit_of_measurement);
          this.appendField(formData, `items[${index}][estimated_unit_value]`, item.estimated_unit_value?.toString());
          this.appendField(formData, `items[${index}][total_value]`, item.total_value?.toString());
          this.appendField(formData, `items[${index}][judging_criteria_id]`, item.judging_criteria_id);
          this.appendField(formData, `items[${index}][confidential_budget]`, item.confidential_budget ? 'true' : 'false');
          this.appendField(formData, `items[${index}][item_category_id]`, item.item_category_id);
          this.appendField(formData, `items[${index}][assets]`, item.assets);
          this.appendField(formData, `items[${index}][real_estate_registry_code]`, item.real_estate_registry_code);
          this.appendField(formData, `items[${index}][source_system_link]`, item.source_system_link);
          this.appendField(formData, `items[${index}][justification_in_person]`, item.justification_in_person);
          this.appendField(formData, `items[${index}][number]`, item.number?.toString());
          this.appendField(formData, `items[${index}][applicability_normal_preference_margin]`, item.applicability_normal_preference_margin ? 'true' : 'false');
          this.appendField(formData, `items[${index}][applicability_additional_preference_margin]`, item.applicability_additional_preference_margin ? 'true' : 'false');
          this.appendField(formData, `items[${index}][normal_preference_margin_percentage]`, item.normal_preference_margin_percentage?.toString());
          this.appendField(formData, `items[${index}][additional_preference_margin_percentage]`, item.additional_preference_margin_percentage?.toString());
          this.appendField(formData, `items[${index}][ncm_nbs_code]`, item.ncm_nbs_code);
          this.appendField(formData, `items[${index}][ncm_nbs_description]`, item.ncm_nbs_description);
        });
      } else {
        console.error("O campo 'items' é obrigatório e deve conter pelo menos um item.");
      }
  
      return formData;
    }
  
    private static appendField(formData: FormData, key: string, value: any, errorMessage?: string): void {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value);
      } else if (errorMessage) {
        console.error(errorMessage);
      }
    }
  }
  