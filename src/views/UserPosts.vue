<template>
    <div class="func-bar d-flex justify-content-between" ref="myposts">
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
export default ({
  name: 'MyPosts',
  props: ['userId'], // 接受路由的參數
  data () {
    return {
      posts: [],
      message: ''
    }
  },
  methods: {
    getMyPosts (userId) {
      const api = `${process.env.VUE_APP_API}posts/user/${userId}`
      console.log(api)
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
  },
  created () {
    const userId = this.$route.params.userId // 從路由參數獲取 userId
    if (userId) {
      console.log('Initial userId from route:', userId)
      this.getMyPosts(userId)
    } else {
      this.message = '無法獲取用戶 ID，請稍後再試'
    }
  }
})
</script>
