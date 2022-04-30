export interface ApiFlatItem {
  ID: number;
  name: string;
  NAME?: string;
}

export interface ApiChildFlatItem {
  ID: number;
  name: string;
  NAME?: string;
  Parent_Type_ID: number;
}

export interface FlatItem {
  id: number;
  name: string;
}
export interface ChildFlatItem {
  id: number;
  parrentId: number;
  name: string;
}
export enum AccountView {
  PLAN = 'plan',
  CLAIM = 'claim',
}

export const FilterDefaultValue = '0';
