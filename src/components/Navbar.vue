<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <router-link to="/home/posts" class="navbar-brand">MetaWall</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown">
              <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="imageUrl" width="32" height="32" class="rounded-circle me-2">
                <span class="user-name">{{ user.name  }}</span>
              </a>
              <ul class="dropdown-menu">
                <li><router-link :to="user.id ? `/home/myposts/${user.id}` : '/login'" class="dropdown-item">我的貼文牆</router-link></li>
                <li><router-link to="/home/profile" class="dropdown-item">修改個人資料</router-link></li>
                <li><a class="dropdown-item" href="#" @click.prevent="logout">登出</a></li>
              </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      imageUrl: null
    }
  },
  methods: {
    getToken () {
      const value = `; ${document.cookie}`
      const parts = value.split('; uid=')
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },
    getProfile () {
      const api = `${process.env.VUE_APP_API}users/profile`
      const token = this.getToken()
      // console.log(token)
      if (!token) {
        this.message = '請先登入才能檢視個人資訊'
        return
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data)
        this.user = res.data.data
        this.imageUrl = this.user.photo
      })
    },
    clearToken () {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
      }
      if (sessionStorage.getItem('token')) {
        sessionStorage.removeItem('token')
      }
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    },
    logout () {
      this.clearToken()
      alert('已成功登出!')
      this.$router.push('/login')
    }
  },
  created () {
    const token = this.getToken()
    if (!token) {
      alert('請先登入')
      this.$router.push('/login')
    } else {
      this.getProfile()
    }
  }
}
</script>
