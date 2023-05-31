import { defineRule } from 'vee-validate'
import { required, min, max, email, confirmed } from '@vee-validate/rules'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('email', email)
defineRule('confirmed', confirmed)

defineRule('alpha_num', (value) => {
  const alphaNum = /^[a-z0-9]*$/
  return alphaNum.test(value)
})
