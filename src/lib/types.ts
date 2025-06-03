export interface Parameter {
  id: string
  name: string
  type: string
  required: boolean
  requiredForProduct: boolean
  requiredIf: any
  displayedIf: any
  unit?: string
  options: Options
  dictionary?: Dictionary[]
  restrictions: Restrictions
}

export interface Options {
  variantsAllowed: boolean
  variantsEqual: boolean
  ambiguousValueId?: string
  dependsOnParameterId?: string
  describesProduct: boolean
  customValuesEnabled: boolean
}

export interface Dictionary {
  id: string
  value: string
  dependsOnValueIds: string[]
}

export interface Restrictions {
  multipleChoices?: boolean
  minLength?: number
  maxLength?: number
  allowedNumberOfValues?: number
  min?: number
  max?: number
  range?: boolean
  precision?: number
}
