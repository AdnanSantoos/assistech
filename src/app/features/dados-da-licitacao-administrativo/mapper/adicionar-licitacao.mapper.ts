export class AdicionarLicitacaoMapper {
    public static toSubmit(form: any): FormData {
      const formData = new FormData();
      let value = { ...form };
  
      // Adicionando os campos básicos
      formData.append('agency_country_register', value.agency_country_register);
      formData.append('document_title', value.document_title);
      formData.append('unit_id', value.unit_id);
      formData.append('document_type_id', value.document_type_id);
      formData.append('call_instrument_id', value.call_instrument_id);
      formData.append('contracting_modality_id', value.contracting_modality_id);
      formData.append('dispute_mode_id', value.dispute_mode_id);
      formData.append('legal_basic_id', value.legal_basic_id);
      formData.append('number', value.number);
      formData.append('year', value.year.toString());
      formData.append('process_number', value.process_number);
      formData.append('goals', value.goals);
      formData.append('srp', value.srp ? 'true' : 'false');
      formData.append('contracting_situation_id', value.contracting_situation_id);
      formData.append('additional_information', value.additional_information);
      formData.append('opening_date_proposal', value.opening_date_proposal);
      formData.append('closing_date_proposal', value.closing_date_proposal);
  
      // Adicionando os arquivos
      if (value.files && value.files.length > 0) {
        value.files.forEach((file: File) => {
          formData.append('files[]', file); // Adiciona múltiplos arquivos
        });
      } else if (value.file) {
        formData.append('file', value.file); // Caso seja apenas um arquivo
      } else {
        console.error("Nenhum arquivo foi selecionado.");
      }
  
      // Adicionando os itens da licitação
      if (value.items && Array.isArray(value.items)) {
        value.items.forEach((item: any, index: number) => {
          formData.append(`items[${index}][tenant_slug]`, item.tenant_slug);
          formData.append(`items[${index}][created_by_id]`, item.created_by_id);
          formData.append(`items[${index}][procurement_id]`, item.procurement_id);
          formData.append(`items[${index}][item_type]`, item.item_type);
          formData.append(`items[${index}][benefit_type_id]`, item.benefit_type_id);
          formData.append(`items[${index}][basic_productive_incentive]`, item.basic_productive_incentive ? 'true' : 'false');
          formData.append(`items[${index}][description]`, item.description);
          formData.append(`items[${index}][quantity]`, item.quantity.toString());
          formData.append(`items[${index}][unit_of_measurement]`, item.unit_of_measurement);
          formData.append(`items[${index}][estimated_unit_value]`, item.estimated_unit_value.toString());
          formData.append(`items[${index}][total_value]`, item.total_value.toString());
          formData.append(`items[${index}][judging_criteria_id]`, item.judging_criteria_id);
          formData.append(`items[${index}][confidential_budget]`, item.confidential_budget ? 'true' : 'false');
          formData.append(`items[${index}][item_category_id]`, item.item_category_id);
          formData.append(`items[${index}][assets]`, item.assets);
          formData.append(`items[${index}][real_estate_registry_code]`, item.real_estate_registry_code);
          formData.append(`items[${index}][source_system_link]`, item.source_system_link);
          formData.append(`items[${index}][justification_in_person]`, item.justification_in_person);
          formData.append(`items[${index}][number]`, item.number.toString());
          formData.append(`items[${index}][applicability_normal_preference_margin]`, item.applicability_normal_preference_margin ? 'true' : 'false');
          formData.append(`items[${index}][applicability_additional_preference_margin]`, item.applicability_additional_preference_margin ? 'true' : 'false');
          formData.append(`items[${index}][normal_preference_margin_percentage]`, item.normal_preference_margin_percentage.toString());
          formData.append(`items[${index}][additional_preference_margin_percentage]`, item.additional_preference_margin_percentage.toString());
          formData.append(`items[${index}][ncm_nbs_code]`, item.ncm_nbs_code);
          formData.append(`items[${index}][ncm_nbs_description]`, item.ncm_nbs_description);
        });
      }
  
      return formData;
    }
  }
  