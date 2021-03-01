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

      <v-btn to="Cabinet" text v-if="$store.state.login.token">
        Личный кабинет
      </v-btn>
      <v-btn
        text
        @click="onLoginClick"
      >
        <span class="mr-2" v-if="$store.state.login.token">Выйти</span>
        <span class="mr-2" v-else>Войти</span>

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
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            @click:append="show1 = !show1"
              ></v-text-field>
              <label v-if="isUnAuth" style="color: red">
                Не верный логин или пароль
              </label>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="onRegistrationClick">
              <span class="mr-2">Регистрация</span>
            </v-btn>
            <v-spacer/>
            <v-btn text @click="auth()">
              <span class="mr-2">Войти</span>
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="isRegistration"
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Регистрация</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="registrationForm.firstName"
                    label="Фимилия"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="registrationForm.middleName"
                    label="Имя"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="registrationForm.lastName"
                    label="Отчество"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="registrationForm.username"
                    label="Логин"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="registrationForm.password"
                    label="Пароль"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="registrationForm.email"
                    label="Email"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="День рождения"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Закрыть
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        Выбрать
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <label style="color: blue" v-if="isRegistrationSuccessful">Регистрация прошла успешно!</label>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              text
              @click="isRegistration = false"
            >
              Отмена
            </v-btn>
            <v-spacer/>
            <v-btn
              color="blue darken-1"
              text
              @click="registration"
            >
              Зарегистрироваться
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
      registrationForm: {
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        birthday: '',
      },
      loginForm: {
        username: '',
        password: '',
      },
      isRegistration: false,
      isLogin: false,
      isUnAuth: false,
      links: [
        { link: { name: 'Home' }, title: 'Главная' },
        { link: { name: 'About' }, title: 'О нас' },
      ],
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      isRegistrationSuccessful: false
    };
  },
  methods: {
    async auth() {
      await this.$store.dispatch('login/auth', this.loginForm);

      if (this.$store.state.login.token) {
        this.isLogin = false;
        this.isUnAuth = false;
      } else {
        this.isUnAuth = true;
      }
    },
    onLoginClick() {
      if (this.$store.state.login.token) {
        this.$store.commit('login/removeToken');
      } else {
        this.isLogin = true;
      }
    },
    onRegistrationClick() {
      this.isLogin = false;
      this.isRegistration = true;
    },
    async registration(){
      this.registrationForm.birthday = this.date.toString()
      await this.$store.dispatch('user/registration', this.registrationForm);

      this.isRegistrationSuccessful = true;
      setTimeout(()=>{
        this.isRegistrationSuccessful = false;
        this.isRegistration = false;
        this.isLogin = true;
      }, 2000)
    },
  },
  created() {
    this.$store.commit('login/setToken', localStorage.getItem('token'));
  },
};
</script>
