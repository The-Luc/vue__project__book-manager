<template>
  <v-container class="sign-in-page d-flex flex-column">
    <div class="btn-group d-flex flex-column mx-auto my-16 pt-10">
      <div class="font-weight-black text-center text-h4">
        Login
      </div>
      <v-form ref="form" class="d-flex flex-column">
        <div class="d-flex flex-column my-2">
          <label class="title-input">Username</label>
          <v-text-field v-model="userName" outlined :rules="rules.username" />
        </div>
        <div class="d-flex flex-column my-2">
          <label class="title-input">Password</label>
          <v-text-field
            v-model="password"
            outlined
            :rules="rules.password"
            :type="isShowPassword ? 'text' : 'password'"
            :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isShowPassword = !isShowPassword"
          />
        </div>
        <v-btn
          class="submit blue white--text lighten-2 rounded-xl mx-auto my-1 text-center"
          width="180px"
          depressed
          :loading="isWatting"
          @click="submitBtn"
        >
          Login
        </v-btn>
        <v-btn
          class="submit cyan white--text darken-2 rounded-xl mx-auto my-1 text-center"
          width="180px"
          depressed
          @click="signUpBtn"
        >
          Sign Up
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script src="./index.js"></script>

<style scoped lang="scss" src="./index.scss"></style>
