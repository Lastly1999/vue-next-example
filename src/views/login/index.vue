<script lang="ts" setup>
import { computed } from "vue"
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue"
import useLogin from "./business/useLogin"

const { loginSubmitFinish, form, loadingStatus } = useLogin({
  userName: "",
  passWord: "",
  remember: false,
})

const disabled = computed(() => {
  return !(form.userName && form.passWord)
})

const layout = {
  labelCol: { span: 4 },
}
</script>
<template>
  <div flex justify-end h-full>
    <div w-80 self-center m-20>
      <h1 text-center>Welcome Admin</h1>
      <a-form :model="form" name="login_form" labelAlign="left" @finish="loginSubmitFinish" :label-col="layout.labelCol">
        <a-form-item name="userName" :rules="[{ required: true, message: '' }]">
          <a-input v-model:value="form.userName" placeholder="请输入账号">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="passWord" :rules="[{ required: true, message: '' }]">
          <a-input-password v-model:value="form.passWord" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
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
          <a-button :disabled="disabled" :loading="loadingStatus" type="primary" html-type="submit" class="login-form-button"> Log in </a-button>
          Or
          <a href="">register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
