<template>
  <TheHeader @open-navigation="navigationHandler" />
  <MainContainer
    width="max-w-[1000px] md:mx-auto lg:mx-0 w-full"
    :navigation="navigation"
    @close-navigation="navigationHandler"
  >
    <h2 class="text-white text-2xl hidden lg:block">My profile</h2>
    <Form @submit="onSubmit" id="updateProfile">
      <main-card
        class="mt-8 lg:mt-32 py-20 md:pb-32 px-8 lg:px-12 w-full space-y-4"
        profile
        id="main-card"
      >
        <div class="w-full max-w-[530px] mx-auto" v-show="checkModalWidth">
          <div class="lg:relative lg:-top-32 space-y-2 flex flex-col items-center">
            <Field name="new_avatar" v-slot="{ field, handleChange }">
              <div class="flex justify-center bg-[#D9D9D9] w-44 h-44 rounded-full overflow-hidden">
                <img
                  :src="avatarHandler.value || `${userStore.userData.avatar}`"
                  alt="avatar"
                  class="object-contain"
                />
              </div>
              <div>
                <input
                  type="file"
                  :id="field.name"
                  class="sr-only"
                  @input="uploadImage($event, handleChange)"
                />
                <label for="new_avatar" class="text-white cursor-pointer">Upload new photo</label>
              </div>
            </Field>
          </div>
          <div class="space-y-12 lg:-mt-10 mt-12">
            <div class="flex items-center gap-9 border-b border-[#ced4da80] md:border-none">
              <base-input
                id="name"
                label="name"
                class="w-full"
                :placeholder="userStore.userData.name"
                v-model="nameHandler.value"
                :value="nameHandler.value"
                :edit="nameHandler.edit"
                disabled
              ></base-input>
              <button
                class="text-[#CED4DA] mt-4 md:mt-7"
                type="button"
                @click="nameHandler.edit = true"
              >
                Edit
              </button>
            </div>
            <div v-if="nameHandler.edit">
              <teleport to="#main-card" :disabled="isDesktop">
                <base-input
                  id="new_name"
                  label="New Name"
                  class="w-full"
                  v-model="nameHandler.value"
                  :value="nameHandler.value"
                  :error="nameHandler.error"
                  rules="required|min:3|max:15|alpha_num"
                  placeholder="Enter new username"
                  @update-prop="nameHandler.error = ''"
                ></base-input>
              </teleport>
            </div>
            <div class="flex gap-9 border-b border-[#ced4da80] md:border-none">
              <base-input
                id="email"
                label="Email"
                class="w-full"
                :placeholder="userStore.userData.email"
                v-model="emailHandler.value"
                :value="emailHandler.value"
                :edit="emailHandler.edit"
                disabled
              ></base-input>
              <button
                class="text-[#CED4DA] mt-4 md:mt-7"
                type="button"
                v-if="!google"
                @click="emailHandler.edit = true"
              >
                Edit
              </button>
            </div>
            <div v-if="emailHandler.edit">
              <teleport to="#main-card" :disabled="isDesktop">
                <base-input
                  id="new_email"
                  label="New Email"
                  class="w-full"
                  v-model="emailHandler.value"
                  :value="emailHandler.value"
                  :error="emailHandler.error"
                  rules="required|email"
                  placeholder="Enter new Email"
                  @update-prop="emailHandler.error = ''"
                ></base-input>
              </teleport>
            </div>
            <div
              class="flex items-center gap-9 border-b border-[#ced4da80] md:border-none"
              v-if="!google"
            >
              <base-input
                id="password"
                label="password"
                class="w-full"
                placeholder="••••••••••••"
                disabled
              ></base-input>
              <button
                class="text-[#CED4DA] mt-4 md:mt-7"
                type="button"
                @click="passwordHandler.edit = true"
              >
                Edit
              </button>
            </div>
            <div v-if="!google && passwordHandler.edit">
              <teleport to="#main-card" :disabled="isDesktop">
                <div class="block rounded border border-[#ced4da33] p-6 my-9">
                  <p class="text-white">Passwords should contain:</p>
                  <ul class="text-white list-disc px-4">
                    <li
                      class="text-sm"
                      :class="!passwordHandler.correctLength ? 'text-[#9C9A9A]' : 'text-green-500'"
                    >
                      <span
                        :class="!passwordHandler.correctLength ? 'text-[#9C9A9A]' : 'text-white'"
                        >8 or more characters</span
                      >
                    </li>
                    <li
                      class="text-sm"
                      :class="
                        passwordHandler.correctLength && passwordHandler.correctCharacters
                          ? 'text-green-500'
                          : 'text-[#9C9A9A]'
                      "
                    >
                      <span
                        :class="
                          passwordHandler.correctLength && passwordHandler.correctCharacters
                            ? 'text-white'
                            : 'text-[#9C9A9A]'
                        "
                      >
                        15 lowercase character</span
                      >
                    </li>
                  </ul>
                </div>
              </teleport>
            </div>
            <div v-if="!google && passwordHandler.edit" class="block space-y-12">
              <teleport to="#main-card" :disabled="isDesktop">
                <base-input
                  id="new_password"
                  label="New password"
                  class="w-full"
                  placeholder="Enter new password"
                  v-model="passwordHandler.value"
                  :value="passwordHandler.value"
                  type="password"
                  rules="required|min:8|max:15|alpha_num"
                  @input="updateModal"
                ></base-input>
                <base-input
                  id="confirm_new"
                  label="Confirm new password"
                  class="w-full"
                  placeholder="Confirm new password"
                  type="password"
                  rules="required|confirmed:@new_password"
                ></base-input>
              </teleport>
            </div>
          </div>
        </div>
      </main-card>
      <div
        class="flex justify-between md:flex md:justify-end mt-8 lg:mt-16 gap-4 pb-10 px-8 lg:px-0"
        v-if="nameHandler.edit || emailHandler.edit || avatarHandler.edit || passwordHandler.edit"
      >
        <base-button mode="transparent" type="button" @click="reset">Cancel</base-button>
        <base-button class="p-2">{{ isDesktop ? 'Save Changes' : 'Edit' }}</base-button>
      </div>
    </Form>
  </MainContainer>
</template>
<script setup>
import MainContainer from '@/components/layout/MainContainer.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { Field, Form } from 'vee-validate'
import MainCard from '@/components/ui/MainCard.vue'
import { useUserStore } from '@/stores/userStore'
import BaseInput from '@/components/ui/form/BaseInput.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import { useUserService } from '@/services/UserService'
import { useI18n } from 'vue-i18n'

const navigation = ref(false)
const userStore = useUserStore()
const userService = useUserService()
const { google } = userStore.userData
const { locale } = useI18n()

const isDesktop = ref(true)

const avatarHandler = reactive({
  oldValue: '',
  value: '',
  edit: false,
})

const nameHandler = reactive({
  value: '',
  edit: false,
  error: '',
})

const emailHandler = reactive({
  value: '',
  edit: false,
  error: '',
})

const passwordHandler = reactive({
  value: '',
  edit: false,
  correctLength: false,
  correctCharacters: false,
})

const checkModalWidth = computed(() => {
  return !((nameHandler.edit || emailHandler.edit || passwordHandler.edit) && !isDesktop.value)
})

function navigationHandler(value) {
  navigation.value = value
}

function updateModal() {
  const alphaNum = /^[a-z0-9]+$/
  passwordHandler.correctLength = passwordHandler.value.length >= 8
  passwordHandler.correctCharacters =
    passwordHandler.value.length <= 15 && alphaNum.test(passwordHandler.value)
}

function uploadImage(event, handleChange) {
  const image = event.target.files[0]
  avatarHandler.value = URL.createObjectURL(image)
  handleChange(image)
  avatarHandler.edit = true
}

async function onSubmit(values) {
  try {
    await userService.updateUserData(values)
    userStore.updateProfile(values)
    reset()
  } catch (err) {
    nameHandler.error = err.response.data.errors.name?.[0][locale.value]
    emailHandler.error = err.response.data.errors.email?.[0][locale.value]
  }
}

function reset() {
  resetValues(nameHandler)
  resetValues(emailHandler)
  resetValues(avatarHandler)
  resetValues(passwordHandler)
  passwordHandler.correctLength = false
  passwordHandler.correctCharacters = false

  const form = document.querySelector('#updateProfile')
  form.reset()
}

function resetValues(handler) {
  handler.edit = false
  handler.value = ''
}

function checkWidth() {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>
