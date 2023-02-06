<script lang="ts" setup>
import { computed } from "vue"
import useLogin from "./useLogin"

const { loginSubmitFinish, form } = useLogin({
  userName: "",
  passWord: "",
  remember: false,
})

const disabled = computed(() => {
  return !(form.userName && form.passWord)
})
</script>
<template>
  <div>
    <a-form :model="form" name="login_form" @finish="loginSubmitFinish">
      <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="form.userName">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="form.passWord">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="form.remember">Remember me</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">Forgot password</a>
      </a-form-item>
      <a-form-item>
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button"> Log in </a-button>
        Or
        <a href="">register now!</a>
      </a-form-item>
    </a-form>
  </div>
</template>
