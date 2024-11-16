
export const Permissions = {
  VIEW_PRODUCTS_TAB: {
    value: 'VIEW_PRODUCTS_TAB',
    name: 'Просмотр вкладки продукция'
  },
  ADD_AND_CHANGE_QUANTITY_PRODUCTS: {
    value: 'ADD_AND_CHANGE_QUANTITY_PRODUCTS',
    name: 'Внесение и изменение количества продукции'
  },
  CHANGING_NUMBERS_INTRODUCED_DEFECTS: {
    value: 'CHANGING_NUMBERS_INTRODUCED_DEFECTS',
    name: 'Изменение количества внесенных дефектов'
  },
  ACCESS_DEFECTS_TAB_AND_ANALYZE_DEFECTS: {
    value: 'ACCESS_DEFECTS_TAB_AND_ANALYZE_DEFECTS',
    name: 'Доступ к вкладке дефекты и анализ дефектов',
  },
  ACCESS_FILTERS: {
    value: 'ACCESS_FILTERS',
    name: 'Доступ к фильтрам'
  },
  VIEW_AND_CHANGE_USERS: {
    value: 'VIEW_AND_CHANGE_USERS',
    name: 'Просмотр, изменение пользователей',
  },
  ACCESS_TO_EXPORT: {
    value: 'ACCESS_TO_EXPORT',
    name: 'Доступ к экспорту'
  },
  SPRING_CHANGES_TO_SETTINGS_TAB: {
    value: 'MAKING_CHANGES_TO_SETTINGS_TAB',
    name: 'Внесение изменения во вкладку настройки'
  },
  INTRODUCING_DEFECTS: {
	value: 'INTRODUCING_DEFECTS',
	name: 'Внесение дефектов'
  },
}

export type TPermissionItem = typeof Permissions[keyof typeof Permissions]['value'];