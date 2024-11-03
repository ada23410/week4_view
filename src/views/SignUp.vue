<template>
    <div class="container mt-5">
        <form class="row justify-content-center" @submit.prevent="signUp">
            <div class="col-md-4">
                <h1 class="h3 mb-4 font-weight-normal text-center">註冊</h1>
                <div class="mb-2">
                  <label for="inputEmail" class="sr-only">name</label>
                  <input
                      type="text"
                      id="inputName"
                      class="form-control"
                      placeholder="Aida"
                      required
                      autofocus
                      v-model="user.name"
                  />
                </div>
                <div class="mb-2">
                  <label for="inputEmail" class="sr-only">Email address</label>
                  <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="example@mail.com"
                      required
                      autofocus
                      v-model="user.email"
                  />
                </div>
                <div class="mb-2">
                  <label for="inputPassword" class="sr-only">Password</label>
                  <input
                      type="password"
                      id="inputPassword"
                      class="form-control"
                      placeholder="Password"
                      required
                      v-model="user.password"
                  />
                </div>
                <div class="mb-2">
                  <label for="inputPassword" class="sr-only">Confirm Password</label>
                  <input
                      type="password"
                      id="inputConfirmPassword"
                      class="form-control"
                      placeholder="Confirm Password"
                      required
                      v-model="user.confirmPassword"
                  />
                </div>
                <div class="text-end mt-4 mb-2">
                  <button class="btn btn-primary btn-block w-100" type="submit">註冊</button>
                </div>
                <div class="mb-2 text-center">
                  <div><router-link to="/login">登入</router-link></div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    signUp () {
      const api = `${process.env.VUE_APP_API}users/sign_up`
      this.$http.post(api, this.user).then((res) => {
        console.log(res.data)
        if (res.data.status === 'success') {
          const token = res.data.user.token
          document.cookie = `uid=${token}; path=/`
          alert('註冊成功！請重新登入了。')
          this.$router.push('/login')
          this.user = {}
        }
      }).catch((error) => {
        console.error(error)
        const errorMsg = error.response.data.message
        alert(errorMsg)
      })
    }
  }
}
</script>
