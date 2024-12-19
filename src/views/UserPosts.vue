<template>
    <div class="mb-3">
      <swiper
        :slides-per-view="6"
        :space-between="10"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide class="follow-card" v-for="item in unFollowed" :key="item.id">
          <div class="img-wrap">
              <img :src="item.photo" alt="photo">
          </div>
          <div class="user-info">
              <div class="name">{{ item.name }}</div>
              <!-- <div class="follow-num">{{ item.followers}}追蹤</div> -->
          </div>
          <div>
              <button type="submit" class="btn btn-primary mt-3 btn-sm" @click="follow(item.id)">追蹤</button>
          </div>
        </SwiperSlide>
      </swiper>
    </div>
    <div class="func-bar d-flex justify-content-between" ref="MyPosts">
        <div class="col-md-2">
            <select class="form-select" id="country" v-model="selectAnswer">
                <option value="">請選擇貼文排序</option>
                <option value="desc">從新到舊貼文</option>
                <option value="asc">從舊到最新</option>
            </select>
        </div>
        <div class="col-md-8">
            <form class="search" role="search" @submit.prevent="searchPost">
                <div class="input-group">
                    <input type="search" class="form-control" placeholder="請輸入關鍵字" aria-label="Search" v-model="searchQuery">
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

export default ({
  components: {
    Swiper,
    SwiperSlide
  },
  name: 'MyPosts',
  props: ['userId'], // 接受路由的參數
  data () {
    return {
      posts: [],
      selectAnswer: '',
      searchQuery: '',
      message: '',
      unFollowed: []
    }
  },
  watch: {
    selectAnswer (item) {
      console.log('選擇的排序方式:', item)
      const userId = this.$route.params.userId
      this.sortByDate(item, userId)
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
    },
    getMyFollowing (userId) {
      const api = `${process.env.VUE_APP_API}users/profile/${userId}`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入才能檢視他人公開資料'
        return
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data)
        this.posts = res.data.data.posts
      })
    },
    getMyunfollowed () {
      const api = `${process.env.VUE_APP_API}users/unfollowed`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入才能檢視未追蹤資料'
        return
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data.data)
        this.unFollowed = res.data.data
      })
    },
    sortByDate (order, userId) {
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以排序貼文'
      }
      const api = `${process.env.VUE_APP_API}posts/user/${userId}/?timeSort=${order}`
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.data.posts.length === 0) {
          this.message = '目前沒有貼文'
          this.posts = []
        } else {
          this.posts = res.data.data.posts
          this.message = ''
        }
      }).catch((error) => {
        console.error('Error sorting posts:', error)
        this.message = '排序貼文時發生錯誤'
      })
    },
    searchPost () {
      const token = this.getToken()
      const userId = this.$route.params.userId
      if (!token) {
        this.message = '請先登入以搜尋貼文'
        return
      }
      const keyword = this.searchQuery
      const api = `${process.env.VUE_APP_API}posts/user/${userId}/?q=${keyword}`
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res.data.data.posts.length === 0) {
          this.message = '搜尋結果為空'
          this.posts = []
        } else {
          this.posts = res.data.data.posts
          this.message = ''
        }
      }).catch((error) => {
        console.error('Error searching posts:', error)
        // 從錯誤回應中提取訊息
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message
        } else {
          this.message = '搜尋貼文時發生未知錯誤'
        }
        this.posts = [] // 清空舊的貼文資料
      })
    },
    follow (userId) {
      console.log(userId)
      const api = `${process.env.VUE_APP_API}users/${userId}/follow`
      console.log(api)
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以查看為追蹤名單'
        return
      }
      this.$http.post(api, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data)
        this.getMyunfollowed()
      })
    }
  },
  setup () {
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange
    }
  },
  created () {
    const token = this.getToken()
    const userId = this.$route.params.userId

    if (!token) {
      alert('請先登入')
      this.$router.push('/login')
      return
    }

    if (!userId) {
      this.message = '無法獲取用戶 ID，請稍後再試'
      return
    }

    console.log('User ID:', userId)
    // this.getMyFollowing(userId) // 獲取他人資料
    this.getMyPosts(userId) // 獲取貼文
    this.sortByDate('desc', userId) // 預設載入排序
    this.getMyunfollowed()
  }
})
</script>
