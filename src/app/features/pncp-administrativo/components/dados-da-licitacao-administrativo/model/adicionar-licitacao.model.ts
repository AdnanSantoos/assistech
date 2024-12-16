export interface ProcurementItem {
    tenant_slug: string;
    created_by_id: string;
    procurement_id: string;
    item_type: string;
    benefit_type_id: string;
    basic_productive_incentive: boolean;
    description: string;
    quantity: number;
    unit_of_measurement: string;
    estimated_unit_value: number;
    total_value: number;
    judging_criteria_id: string;
    confidential_budget: boolean;
    item_category_id: number;
    assets: string;
    real_estate_registry_code: string;
    source_system_link: string;
    justification_in_person: string;
    number: number;
    applicability_normal_preference_margin: boolean;
    applicability_additional_preference_margin: boolean;
    normal_preference_margin_percentage: number;
    additional_preference_margin_percentage: number;
    ncm_nbs_code: string;
    ncm_nbs_description: string;
  }
  
  export interface ProcurementModel {
    agency_country_register: string;
    document_title: string;
    unit_id: string;
    document_type_id: string;
    call_instrument_id: string;
    contracting_modality_id: string;
    dispute_mode_id: string;
    legal_basic_id: string;
    file: string;
    number: string;
    year: number;
    process_number: string;
    goals: string;
    srp: boolean;
    items: ProcurementItem[];
    contracting_situation_id: string;
    additional_information: string;
    opening_date_proposal: string; // ISO date string
    closing_date_proposal: string; // ISO date string
  }
  