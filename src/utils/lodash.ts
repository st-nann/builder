import {
  get,
  map,
  isEqual,
  isEmpty,
  isUndefined,
  toUpper,
  cloneDeep
} from 'lodash'

export const _get = (object: any, path: string, def: any): any => {
  return get(object, path, def)
}

export const _map = (object: any, funn: Function): any[] => {
  return map(object, funn)
}

export const _isEqual = (value: any, other: any): boolean => {
  return isEqual(value, other)
}

export const _isEmpty = (object: any): boolean => {
  return isEmpty(object)
}

export const _isUndefined = (value: any): boolean => {
  return isUndefined(value)
}

export const _toUpper = (value: string): string => {
  return toUpper(value)
}

export const _cloneDeep = (value: any): object => {
  return cloneDeep(value)
}
