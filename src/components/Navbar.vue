<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="#">MetaWall</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a href="#" class="d-block link-body-emphasis text-decoration-none">
                <img :src="imageUrl" alt="mdo" width="32" height="32" class="rounded-circle me-2">
                <span>{{ user.name }}</span>
            </a>
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
    created () {
      this.getProfile()
    }
  }
}
</script>
