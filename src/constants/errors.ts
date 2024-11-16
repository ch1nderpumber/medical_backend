export const errors = {
  EMAIL_INVALID: {
    name: 'EMAIL_EMPTY',
    description: 'Неверная почта.',
    code: 400
  },
  VALUE_MUST_BE_INT: {
    name: 'VALUE_MUST_BE_INT',
    description: 'Значение должно быть целым числом.',
    code: 400
  },
  INVALID_ID: {
    name: 'INVALID_ID',
    description: 'Неверный идентификатор',
    code: 400
  },
  SIZE_INVALID: {
    name: 'SIZE_INVALID',
    description: 'Неверный значение размера',
    code: 400
  },
  ACTIVE_INVALID: {
	name: 'ACTIVE_INVALID',
	description: 'Статус должен иметь тип  BOOLEAN',
	code: 400
  },
  SHIFT_INVALID: {
    name: 'SHIFT_INVALID',
    description: 'Неверный значение смены',
    code: 400
  },
  ROUND_INVALID: {
    name: 'SHIFT_INVALID',
    description: 'Неверный значение круга',
    code: 400
  },
  STYLE_INVALID: {
    name: 'STYLE_INVALID',
    description: 'Неверный значение стиля',
    code: 400
  },
  SIZE_ALREADY_EXISTS: {
    name: 'SIZE_ALREADY_EXISTS',
    description: 'Размер с таким наименованием уже существует',
    code: 400
  },
  SHIFT_ALREADY_EXISTS: {
    name: 'SHIFT_ALREADY_EXISTS',
    description: 'Смена с таким наименованием уже существует',
    code: 400
  },
  ROUND_ALREADY_EXISTS: {
    name: 'SHIFT_ALREADY_EXISTS',
    description: 'Круг с таким наименованием уже существует',
    code: 400
  },
  REJECT_INVALID: {
    name: 'REJECT_INVALID',
    description: 'Неверный значение типа дефакта (отклонения)',
    code: 400
  },
  REJECT_ALIAS_INVALID: {
	name: 'REJECT_ALIAS_INVALID',
	description: 'Неверный значение псевдонима дефакта (отклонения)',
	code: 400
  },
  SIDE_INVALID: {
    name: 'SIDE_INVALID',
    description: 'Неверный значение стороны',
    code: 400
  },
  REJECT_ALREADY_EXISTS: {
    name: 'REJECT_ALREADY_EXISTS',
    description: 'типа дефакта (отклонение) с таким наименованием уже существует',
    code: 400
  },
  REJECT_ALIAS_ALREADY_EXISTS: {
	name: 'REJECT_ALIAS_ALREADY_EXISTS',
	description: 'типа дефакта (отклонение) с таким псевдонимом уже существует',
	code: 400
  },
  STYLE_ALREADY_EXISTS: {
    name: 'STYLE_ALREADY_EXISTS',
    description: 'Стиль с таким наименованием уже существует',
    code: 400
  },
  EMAIL_NOT_FOUND: {
    name: 'EMAIL_NOT_FOUND',
    description: 'Этот email не зарегистрирован',
    code: 400
  },
  HASH_INVALID: {
    name: 'HASH_INVALID',
    description: 'Некорректный хеш.',
    code: 400
  },
  INVALID_REFRESH_TOKEN: {
    name: 'INVALID_REFRESH_TOKEN',
    description: '',
    code: 401
  },
  INVALID_ACCESS_TOKEN: {
    name: 'INVALID_ACCESS_TOKEN',
    description: '',
    code: 401
  },
  USER_NOT_FOUND: {
    name: 'USER_NOT_FOUND',
    description: 'Пользователь не найден',
    code: 400
  },
  PERMISSION_NOT_FOUND: {
    name: 'PERMISSION_NOT_FOUND',
    description: 'Разрешение не найдено',
    code: 400
  },
  STYLE_NOT_FOUND: {
    name: 'STYLE_NOT_FOUND',
    description: 'Стиль не найден',
    code: 400
  },
  PRODUCT_NOT_FOUND: {
	name: 'PRODUCT_NOT_FOUND',
	description: 'Продукт не найден',
	code: 400
  },
  DEFECT_NOT_FOUND: {
	name: 'DEFECT_NOT_FOUND',
	description: 'Дефект не найден',
	code: 400
  },
  INVALID_NUMBER: {
	name: 'INVALID_NUMBER',
	description: 'Неверное значение!',
	code: 400
  },
  SIZE_NOT_FOUND: {
    name: 'SIZE_NOT_FOUND',
    description: 'Размер не найден',
    code: 400
  },
  SHIFT_NOT_FOUND: {
    name: 'SHIFT_NOT_FOUND',
    description: 'Смена не найдена',
    code: 400
  },
  ROUND_NOT_FOUND: {
    name: 'ROUND_NOT_FOUND',
    description: 'Круг не найдена',
    code: 400
  },
  INVALID_ROUND: {
    name: 'INVALID_ROUND',
    description: 'Неверый номер круга',
    code: 400
  },
  PERMISSION_ALREADY_ADDED: {
    name: 'PERMISSION_ALREADY_ADDED',
    description: 'Пользователь уже имеет это разрешение',
    code: 400
  },
  PASSWORD_LENGTH_INVALID: {
    name: 'PASSWORD_EMPTY',
    description: 'Пароль должен содержать от 8 до 100 симоволов.',
    code: 400
  },
  USER_ALREADY_EXIST: {
    name: 'USER_ALREADY_EXIST',
    description: 'Пользователь с такой почтой уже существует.',
    code: 400
  },
  SIGN_IN_FAILED: {
    name: 'SIGN_IN_FAILED',
    description: 'Ошибка авторизации. Адрес электронной почты или пароль неверны.',
    code: 400
  },
  REGISTRATION_ALREADY_CONFIRM: {
    name: 'REGISTRATION_ALREADY_CONFIRM',
    description: 'Регистрация была подверждена ранее.',
    code: 400
  },
  CONFIRM_ERROR: {
    name: 'CONFIRM_ERROR',
    description: 'Ссылка несуществует',
    code: 400
  },
  NAME_INVALID: {
    name: 'NAME_INVALID',
    description: 'Имя, фамили и отчество может содержать только буквы, пробелы и дефис.',
    code: 400
  },
  NAME_LENGTH_INVALID: {
    name: 'NAME_LENGTH_INVALID',
    description: 'Имя должен содержать от 1 до 100 симоволов.',
    code: 400
  },
  INVALID_REGISTRATION_UUID: {
    name: 'INVALID_REGISTRATION_UUID',
    description: 'Неверный ID.',
    code: 400
  },
  SIGN_UP_FAILED: {
    name: 'SIGN_UP_FAILED',
    description: 'Ошибка регистрации.',
    code: 400
  },
  INVALID_VALUE: {
    name: 'INVALID_VALUE',
    description: 'Неверное значение.',
    code: 400
  },
  PERMISSION_DENIED: {
    name: 'PERMISSION_DENIED',
    description: 'У вас нет прав для выполнения этого действия.',
    code: 403
  },
  NOT_AUTH: {
    name: 'NOT_AUTH',
    description: 'Не авторизован.',
    code: 401
  },
  INVALID_MOVE_KEYS: {
    name: 'INVALID_MOVE_KEYS',
    description: 'Неверное положение ключей для перемещения',
    code: 400
  },
  LIMIT_REJECT_ACTIVE_ELEMENTS: {
	name: 'LIMIT_REJECT_ACTIVE_ELEMENTS',
	description: 'Достигнут лимит активных дефектов. Вы не можете активировать больще 12 дефектов.',
	code: 400
  }
}


export type ERROR_KEYS = keyof typeof errors;
export type ERRORS = typeof errors[ERROR_KEYS];