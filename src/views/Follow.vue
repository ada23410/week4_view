<template>
    <div class="follow">
        <div class="container">
            <div class="row">
                <h5 class="card-title mb-3">追蹤名單</h5>
                <div class="col-md-12">
                    <div class="list mb-2" v-for="item in followList" :key="item._id">
                        <div class="user-info">
                            <div class="img-wrap">
                                <img :src="item.user.photo" alt="">
                            </div>
                            <div class="follow-time">
                                <div class="name">{{ item.user.name }}</div>
                                <div class="time">追蹤時間：{{ item.createdAt }}</div>
                                <div class="already-follow-time">{{ $filters.daysSince(item.createdAt) }}天</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      followList: []
    }
  },
  methods: {
    getToken () {
      const value = `; ${document.cookie}`
      const parts = value.split('; uid=')
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },
    getFollowList () {
      const api = `${process.env.VUE_APP_API}users/following`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以查看追蹤列表'
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data.data)
        this.followList = res.data.data
      })
    }
  },
  created () {
    const token = this.getToken()
    if (!token) {
      this.message = '請先登入以查看追蹤列表'
    } else {
      this.getFollowList()
    }
  }
}
</script>
