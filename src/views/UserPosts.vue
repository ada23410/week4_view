<template>
    <!-- <div class="mb-3">
      <Follow></Follow>
    </div> -->
    <div class="func-bar d-flex justify-content-between" ref="MyPosts">
        <div class="col-md-2">
            <select class="form-select" id="country">
                <option value="">請選擇貼文排序</option>
                <option value="desc">從新到舊貼文</option>
                <option value="asc">從舊到最新</option>
            </select>
        </div>
        <div class="col-md-8">
            <form class="search" role="search">
                <div class="input-group">
                    <input type="search" class="form-control" placeholder="請輸入關鍵字" aria-label="Search">
                    <button type="submit" class="btn btn-secondary">搜尋</button>
                </div>
            </form>
        </div>
    </div>
    <div class="main mt-3">
        <div v-if="message" class="alert alert-light">{{ message }}</div>
        <div v-else>
          <div class="card" v-for="item in posts" :key="item._id">
              <div class="card-body">
                  <div class="card-title d-flex align-items-center">
                      <img :src="item.user.photo" alt="mdo" width="32" height="32" class="rounded-circle me-2">
                      <div class="post-info">
                          <div class="name">{{ item.user.name }}</div>
                          <div class="time">2024/05/07 12:00</div>
                      </div>
                  </div>
                  <p class="card-text">{{ item.content }}</p>
                  <div v-if="item.tags.length">
                      <span class="me-2" v-for="tag in item.tags" :key="tag">#{{ tag }}</span>
                  </div>
              </div>
              <div class="card-img-bottom">
                  <img :src="item.image" alt="...">
              </div>
          </div>
        </div>
    </div>
</template>
<script>
// import Follow from '@/components/Follow.vue'
export default ({
  // components: {
  //   Follow
  // },
  name: 'MyPosts',
  props: ['userId'], // 接受路由的參數
  data () {
    return {
      posts: [],
      message: ''
    }
  },
  methods: {
    getToken () {
      const value = `; ${document.cookie}`
      const parts = value.split('; uid=')
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },
    getMyPosts (userId) {
      const api = `${process.env.VUE_APP_API}posts/user/${userId}`
      this.$http.get(api).then((res) => {
        console.log(res.data)
        if (res.data.data.posts.length === 0) {
          this.message = '目前沒有個人貼文'
          this.posts = []
        } else {
          this.posts = res.data.data.posts
          this.message = ''
        }
      }).catch((error) => {
        console.error('Error fetching posts:', error)
        this.message = '發生錯誤，請稍後再試。'
      })
    }
    // getMyFollowing () {
    //   const api = `${process.env.VUE_APP_API}users/following`
    //   const token = this.getToken()
    //   if (!token) {
    //     this.message = '請先登入才能檢視個人資訊'
    //     return
    //   }
    //   this.$http.get(api, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }).then((res) => {
    //     console.log(res.data)
    //   })
    // }
  },
  created () {
    const token = this.getToken()
    const userId = this.$route.params.userId

    if (!token) {
      alert('請先登入')
      this.$router.push('/login')
    } else if (!userId) {
      this.message = '無法獲取用戶 ID，請稍後再試'
    } else {
      // 如果已登入且有 userId，執行必要操作
      console.log('Initial userId from route:', userId)
      // this.getMyFollowing()
      this.getMyPosts(userId) // 獲取貼文
    }
  }
})
</script>
