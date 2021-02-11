<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn v-for="(item, index) in links" :key="index" :to="item.link" text>
        {{item.title}}
      </v-btn>

      <v-spacer/>

      <v-btn
        text
        @click="isLogin=!isLogin"
      >
        <span class="mr-2">Войти</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
      <v-dialog
        v-model="isLogin"
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Авторизация</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field label="Имя пользователя"
                            v-model="loginForm.username"
              />
              <v-text-field label="Пароль"
                            v-model="loginForm.password"
              />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn text>
              <span class="mr-2">Войти</span>
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      isLogin: false,
      links: [
        { link: { name: 'Home' }, title: 'Домой' },
        { link: { name: 'About' }, title: 'О нас' },
        { link: { name: 'Cabinet' }, title: 'Личный кабинет' },
      ],
    };
  },
};
</script>
