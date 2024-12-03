<template>
<div class="follow" ref="MyLilke">
    <div class="container">
      <div class="row">
        <h5 class="card-title mb-3">我按讚的貼文</h5>
        <div class="col-md-12" v-for="item in likeList" :key="item._id">
            <div class="list mb-2">
            <div class="img-wrap">
                <img :src="item.user.photo" alt="avator">
            </div>
            <div class="user-info">
                <div class="name">{{ item.user.name }}</div>
                <div class="time">{{ item.createdAt }}</div>
            </div>
        </div>
        </div>
        <div v-if="message" class="alert alert-danger">{{ message }}</div>
    </div>
    </div>
</div>
</template>

<script>
export default ({
  name: 'MyLike',
  props: ['userId'],
  data () {
    return {
      message: '',
      likeList: []
    }
  },
  methods: {
    getToken () {
      const value = `; ${document.cookie}`
      const parts = value.split('; uid=')
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },
    getLikeList () {
      const api = `${process.env.VUE_APP_API}users/getLikeList`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以查看按讚列表'
        return
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data)
        this.likeList = res.data.data
      }).catch((error) => {
        console.error('Error fetching like list:', error)
        this.message = '獲取按讚列表時發生錯誤'
      })
    }
  },
  created () {
    const token = this.getToken()
    if (!token) {
      this.message = '請先登入以查看追蹤列表'
    } else {
      this.getLikeList()
    }
  }
})
</script>
