import {ADDRESS} from '../index';
export const passwordResetEmailTemplate = (confirmId: string) => {
  const confirmUrl = `${ADDRESS}/api/auth/resetPassword/${confirmId}`;
  return `
   <span>
   Для восстановления пароля перейдите по ссылке: ${confirmUrl}
    </span>
  `
}