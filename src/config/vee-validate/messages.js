import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      ...en,
      names: {
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
