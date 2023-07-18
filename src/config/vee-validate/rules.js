import { defineRule } from 'vee-validate'
import { required, min, max, email, confirmed, image, alpha_dash } from '@vee-validate/rules'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('email', email)
defineRule('confirmed', confirmed)
defineRule('image', image)

defineRule('alpha_num', (value) => {
  const alphaNum = /^[a-z0-9]*$/
  return alphaNum.test(value)
})

defineRule('valid_year', (value) => {
  const date = new Date()
  return value <= date.getFullYear()
})

defineRule('eng_chars', (value) => {
  const englishRegex = /^[\w\p{P}\s]+$/u
  return englishRegex.test(value)
})

defineRule('geo_chars', (value) => {
  const georgianRegex = /^[\u10D0-\u10F1\d,.?!;:'"(){}<>«»\s\\-]+$/
  return georgianRegex.test(value)
})
