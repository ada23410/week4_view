<template>
    <div class="container mt-5">
        <form class="row justify-content-center" @submit.prevent="singIn">
            <div class="col-md-4">
                <h1 class="h3 mb-4 font-weight-normal text-center">請先登入</h1>
                <div class="mb-2">
                  <label for="inputEmail" class="sr-only">Email address</label>
                  <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email address"
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
                      autocomplete="current-password"
                  />
                </div>
                <div class="text-end mt-4 mb-2">
                  <button class="btn btn-primary btn-block w-100" type="submit">登入</button>
                </div>
                <div class="mb-2 text-center">
                  <div>還沒有帳號嗎？<router-link to="/signup">註冊</router-link></div>
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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    singIn () {
      const api = `${process.env.VUE_APP_API}users/sign_in`
      this.$http.post(api, this.user).then((res) => {
        console.log(res.data)
        if (res.data.status === 'success') {
          const token = res.data.user.token
          // console.log(token)
          document.cookie = `uid=${token}; path=/`
          this.$router.push('/home/posts')
        } else {
          console.log('Login failed:', res.data.message)
        }
      }).catch((error) => {
        console.error(error.response.data.message)
        const errorMsg = error.response.data.message
        alert(errorMsg)
      })
    }
  }
}
</script>
