<template>
    <div class="card">
        <div class="list-group list-group-flush">
            <router-link to="/home/addpost" class="list-group-item list-group-item-action p-3">
                <font-awesome-icon class="bars me-2" icon="fas fa-plus"/>
                張貼動態
            </router-link>
            <router-link to="/home/profile" class="list-group-item list-group-item-action p-3">
                <img :src="imageUrl" alt="mdo" width="32" height="32" class="rounded-circle me-2">
                <span>{{ user.name  }}</span>
            </router-link>
            <router-link to="/home/follow" class="list-group-item list-group-item-action p-3">
                <font-awesome-icon class="bars me-2" icon="fas fa-bell"/>
                <span>追蹤名單</span>
            </router-link>
            <a class="list-group-item list-group-item-action p-3">
                <font-awesome-icon class="bars me-2" icon="fas fa-thumbs-up"/>
                <span>我按讚的文章</span>
            </a>
        </div>
    </div>
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
        // console.log(res.data)
        this.user = res.data.data
        this.imageUrl = this.user.photo
      })
    }
  },
  created () {
    this.getProfile()
  }
}
</script>
