import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      ...en,
      names: {
        username_email: 'Name or Email',
        new_name: 'New Username',
        new_email: 'New Email',
        new_password: 'New Password',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirmation: 'Confirm Password',
      },
      messages: {
        ...en.messages,
        alpha_num: '{field} field may only contain lowercase alpha numeric characters',
      },
    },
    ka: {
      ...ka,
      names: {
        username_email: 'სახელი ან ელ-ფოსტა',
        new_name: 'ახალი სახელი',
        new_email: 'ახალ ელ-ფოსტა',
        new_password: 'ახალი პაროლი',
        name: 'სახელი',
        email: 'ელ-ფოსტა',
        password: 'პაროლი',
        confirmation: 'გაიმეორე პაროლი',
      },
      messages: {
        ...ka.messages,
        alpha_num: '{field} უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის სიმბოლოებს და რიცხვებს',
        confirmed: 'გაიმეორე პაროლი არ ემთხვევა პაროლს',
      },
    },
  }),
})
