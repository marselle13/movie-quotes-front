<template>
  <MainContainer width="max-w-[62.5rem] md:mx-auto lg:mx-0 w-full">
    <div class="pl-10">
      <BackIcon class="block lg:hidden" @click="router.push({ name: 'news-feed' })" />
      <h2 class="text-white text-2xl hidden lg:block">{{ t('my_profile') }}</h2>
    </div>
    <Form v-slot="{ handleReset }" @submit="onSubmit" id="updateProfile">
      <SuccessfullyUpdateModal :text="updated" @close="updated = ''" v-if="updated" />
      <ConfirmationModal
        :info="t('confirmation_changes')"
        v-if="confirmModal"
        @close-modal="confirmModal = false"
        @confirm="onConfirm(formData.value)"
      />
      <main-card
        class="mt-8 lg:mt-32 py-20 md:pb-32 px-8 lg:px-12 w-full space-y-5"
        profile
        id="main-card"
        v-show="!confirmModal"
      >
        <div class="w-full max-w-[30rem] mx-auto" v-show="checkModalWidth">
          <div class="lg:relative lg:-top-32 space-y-2 flex flex-col items-center">
            <Field name="new_avatar" v-slot="{ field, handleChange }" rules="image">
              <div class="flex justify-center bg-light-gray w-44 h-44 rounded-full overflow-hidden">
                <img
                  :src="avatarHandler.value || `${userStore.userData.avatar}`"
                  alt="avatar"
                  class="object-cover"
                />
              </div>
              <div>
                <input
                  type="file"
                  :id="field.name"
                  class="sr-only"
                  @input="uploadImage($event, handleChange)"
                />
                <label :for="field.name" class="text-white cursor-pointer">{{ t('upload') }}</label>
              </div>
            </Field>
          </div>
          <div class="space-y-14 lg:-mt-10 mt-12">
            <div class="flex items-center gap-9 border-b border-[#ced4da80] md:border-none">
              <base-input
                id="name"
                :label="t('name')"
                class="w-full xl:flex-shrink-0"
                :placeholder="userStore.userData.name"
                v-model="nameHandler.value"
                :value="nameHandler.value"
                :edit="nameHandler.edit"
                disabled
              ></base-input>
              <button class="text-light-silver" type="button" @click="nameHandler.edit = true">
                {{ t('edit') }}
              </button>
            </div>
            <div id="name-container"></div>
            <div v-if="nameHandler.edit">
              <teleport :to="!isDesktop ? '#main-card' : '#name-container'">
                <base-input
                  id="new_name"
                  :label="t('new_name')"
                  class="w-full"
                  v-model="nameHandler.value"
                  :value="nameHandler.value"
                  :error="nameHandler.error"
                  rules="required|min:3|max:15|alpha_num"
                  :placeholder="t('enter_name')"
                  @update-prop="nameHandler.error = ''"
                ></base-input>
              </teleport>
            </div>
            <div class="flex gap-9 border-b border-[#ced4da80] md:border-none">
              <base-input
                id="required|email"
                :label="t('email')"
                class="w-full xl:flex-shrink-0"
                :placeholder="userStore.userData.email"
                v-model="emailHandler.value"
                :value="emailHandler.value"
                :edit="emailHandler.edit"
                disabled
              ></base-input>
              <button
                class="text-light-silver"
                type="button"
                v-if="!google"
                @click="emailHandler.edit = true"
              >
                {{ t('edit') }}
              </button>
            </div>
            <div id="email-container"></div>
            <div v-if="emailHandler.edit">
              <teleport :to="!isDesktop ? '#main-card' : '#email-container'">
                <base-input
                  id="new_email"
                  :label="t('new_email')"
                  class="w-full"
                  v-model="emailHandler.value"
                  :value="emailHandler.value"
                  :error="emailHandler.error"
                  rules="required|email"
                  :placeholder="t('enter_email')"
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
                :label="t('password')"
                class="w-full xl:flex-shrink-0"
                placeholder="••••••••••••"
                disabled
              ></base-input>
              <button class="text-light-silver" type="button" @click="passwordHandler.edit = true">
                {{ t('edit') }}
              </button>
            </div>
            <div id="password-container" class="flex flex-col"></div>
            <div v-if="!google && passwordHandler.edit">
              <teleport :to="!isDesktop ? '#main-card' : '#password-container'">
                <PasswordModal
                  :correct-length="passwordHandler.correctLength"
                  :correct-characters="passwordHandler.correctCharacters"
                />
                <div class="space-y-12">
                  <base-input
                    id="new_password"
                    :label="t('new_password')"
                    :placeholder="t('enter_password')"
                    v-model="passwordHandler.value"
                    :value="passwordHandler.value"
                    :error="passwordHandler.error"
                    type="password"
                    rules="required|min:8|max:15|alpha_num"
                    @input="validPasswordModal"
                    @update-prop="passwordHandler.error = ''"
                  ></base-input>
                  <base-input
                    id="confirm_new"
                    :label="t('confirm_new')"
                    :placeholder="t('confirm_new')"
                    :error="!!passwordHandler.error"
                    type="password"
                    rules="required|confirmed:@new_password"
                    @update-prop="passwordHandler.error = ''"
                  ></base-input>
                </div>
              </teleport>
            </div>
          </div>
        </div>
      </main-card>
      <div
        class="flex justify-between md:flex md:justify-end mt-8 lg:mt-16 gap-4 pb-10 px-8 lg:px-0"
        v-if="
          (nameHandler.edit || emailHandler.edit || avatarHandler.edit || passwordHandler.edit) &&
          !confirmModal
        "
      >
        <base-button mode="transparent" type="button" @click="reset(handleReset)">{{
          t('cancel')
        }}</base-button>
        <base-button class="p-2">{{ isDesktop ? t('save_changes') : t('edit') }}</base-button>
      </div>
    </Form>
  </MainContainer>
</template>
<script setup>
import MainContainer from '@/components/layout/MainContainer.vue'
import BaseInput from '@/components/common/form/BaseInput.vue'
import BaseButton from '@/components/common/form/BaseButton.vue'
import MainCard from '@/components/common/MainCard.vue'
import ConfirmationModal from '@/components/modals/profile/ConfirmationModal.vue'
import PasswordModal from '@/components/modals/profile/PasswordModal.vue'

import { computed, onMounted, reactive, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { useUserService } from '@/services/UserService'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import BackIcon from '@/components/icons/BackIcon.vue'
import SuccessfullyUpdateModal from '@/components/modals/profile/SuccessfullyUpdateModal.vue'

const userStore = useUserStore()
const userService = useUserService()
const { google } = userStore.userData
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isDesktop = ref(true)
const confirmModal = ref(false)
const updated = ref('')
const formData = reactive({})

const avatarHandler = reactive({
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
  error: '',
  correctLength: false,
  correctCharacters: false,
})

const checkModalWidth = computed(() => {
  return !((nameHandler.edit || emailHandler.edit || passwordHandler.edit) && !isDesktop.value)
})

function validPasswordModal() {
  const alphaNum = /^[a-z0-9]+$/
  passwordHandler.correctLength = passwordHandler.value.length >= 8
  passwordHandler.correctCharacters =
    passwordHandler.value.length <= 15 && alphaNum.test(passwordHandler.value)
}

function uploadImage(event, handleChange) {
  const image = event.target.files[0]
  if (image.size > 2000000) return
  avatarHandler.value = URL.createObjectURL(image)
  handleChange(image)
  avatarHandler.edit = true
}

async function onSubmit(values) {
  if (isDesktop.value) {
    await submitChanges(values)
  } else {
    formData.value = { ...values }
    confirmModal.value = true
  }
}

async function onConfirm(values) {
  await submitChanges(values)
  confirmModal.value = false
}

async function submitChanges(values) {
  try {
    const { new_email } = values
    const response = await userService.updateUserData(values)
    await userStore.updateProfile(response.data.user)
    reset()
    updated.value = new_email ? t('email_update') : t('change')
  } catch (err) {
    nameHandler.error = err.response?.data.errors.name?.[0]
    emailHandler.error = err.response?.data.errors.email?.[0]
    passwordHandler.error = err.response?.data.errors.password?.[0]
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

async function updateUserEmail() {
  const { hash, uuid } = route.query
  if (uuid && hash && route.name === 'profile') {
    try {
      await userStore.updateEmail(route.query)
      updated.value = t('change')
      await router.replace({ name: 'profile' })
    } catch (err) {
      await router.replace({ name: 'profile' })
    }
  }
}

onMounted(() => {
  updateUserEmail()
  checkWidth()
  window.addEventListener('resize', checkWidth)
})
</script>
