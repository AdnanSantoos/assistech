export interface ContractPlanItemModel {
  item_number: number;
  item_category_id: string;
  catalog: string;
  catalog_classification: string;
  superior_classification_code: string;
  superior_classification_name: string;
  pdm_code: string;
  pdm_description: string;
  item_code: string;
  description: string;
  supply_unit: string;
  quantity: number;
  unit_value: number;
  total_value: number;
  budget_value_for_year: number;
  desired_date: string;
  requesting_unit: string;
  contracting_group_code: string;
  contracting_group_name: string;
  contract_renewal: boolean;
}

export interface ContractPlanModel {
  id?: string;  // Response field
  tenant_slug: string;
  agency_country_register: string;
  unit_id: string;
  year: number;
  created_by_id: string;
  items: ContractPlanItemModel[];
  created_at?: string;  // Response field
  updated_at?: string;  // Response field
}
