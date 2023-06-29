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
        confirm_new: 'Confirm new password',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirmation: 'Confirm Password',
        quoteEng: 'English Quote',
        quoteGeo: 'Georgian Quote',
        image: 'Image',
        movieId: 'Movie',
        nameEng: 'Movie name',
        nameGeo: 'Movie name',
        genres: 'Genres',
        year: 'year',
        directorEng: 'Director',
        directorGeo: 'Director',
        descriptionEng: 'Description',
        descriptionGeo: 'Description',
      },
      messages: {
        ...en.messages,
        alpha_num: '{field} field may only contain lowercase alpha numeric characters',
        integer: '{field} may only be valid year',
      },
    },
    ka: {
      ...ka,
      names: {
        username_email: 'სახელი ან ელ-ფოსტა',
        new_name: 'ახალი სახელი',
        new_email: 'ახალი ელ-ფოსტა',
        new_password: 'ახალი პაროლი',
        confirm_new: 'გაიმეორე ახალი პაროლი',
        name: 'სახელი',
        email: 'ელ-ფოსტა',
        password: 'პაროლი',
        confirmation: 'გაიმეორე პაროლი',
        quoteEng: 'ინგლისური ციტატა',
        quoteGeo: 'ქართული ციტატა',
        image: 'სურათი',
        movieId: 'ფილმი',
        nameEng: 'ფილმის სახელი',
        nameGeo: 'ფილმის სახელი',
        genres: 'ჟანრი',
        year: 'წელი',
        directorEng: 'რეჟისორი',
        directorGeo: 'რეჟისორი',
        descriptionEng: 'ფილმის აღწერა',
        descriptionGeo: 'ფილმის აღწერა',
      },
      messages: {
        ...ka.messages,
        alpha_num: '{field} უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის სიმბოლოებს და რიცხვებს',
        confirmed: 'გაიმეორე პაროლი არ ემთხვევა პაროლს',
      },
    },
  }),
})
