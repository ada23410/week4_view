<template>
    <div class="func-bar d-flex justify-content-between" ref="posts">
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
export default ({
  name: 'Posts',
  data () {
    return {
      posts: [],
      tempPost: {},
      selectAnswer: '',
      searchQuery: '',
      message: ''
    }
  },
  watch: {
    selectAnswer (item) {
      console.log('選擇的排序方式:', item)
      this.sortByDate(item)
    }
  },
  methods: {
    getToken () {
      const value = `; ${document.cookie}`
      const parts = value.split('; uid=')
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },
    getPosts () {
      const api = `${process.env.VUE_APP_API}posts/`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以查看貼文'
        return
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data.data)
        if (res.data.data.posts.length === 0) {
          this.message = res.data.message
          this.posts = []
        } else {
          this.posts = res.data.data.posts.map(post => ({
            ...post,
            user: post.user || { photo: 'path/to/default/image.jpg', name: 'Unknown User' }
          }))
          this.message = ''
        }
      }).catch((error) => {
        console.error('Error details:', error.response)
        this.message = '發生錯誤，請稍後再試。'
      })
    },
    updatePost (postData) {
      const api = `${process.env.VUE_APP_API}posts/`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以更新貼文'
        return
      }
      console.log('Updating post with data:', JSON.stringify(postData))
      this.$http.post(api, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('Post updated successfully:', res.data)
        this.getPosts()
      }).catch((error) => {
        console.error('Error details:', error.response)
        this.message = '發生錯誤，請稍後再試。'
      })
    },
    sortByDate (order) {
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以排序貼文'
        return
      }
      const api = `${process.env.VUE_APP_API}posts/?timeSort=${order}`
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        this.posts = res.data.data.posts
      }).catch((error) => {
        console.error('Error sorting posts:', error)
        this.message = '排序貼文時發生錯誤'
      })
    },
    searchPost () {
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以搜尋貼文'
        return
      }
      const keyword = this.searchQuery
      const api = `${process.env.VUE_APP_API}posts/?q=${keyword}`
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        this.posts = res.data.data.posts
      }).catch((error) => {
        console.error('Error searching posts:', error)
        this.message = '搜尋貼文時發生錯誤'
      })
    }
  },
  created () {
    const token = this.getToken()
    if (!token) {
      this.message = '請先登入以查看貼文'
      // 可能需要重定向到登入頁面
      // this.$router.push('/login');
    } else {
      this.$root.emitter.on('updatePost', (postData) => {
        this.tempPost = { ...postData }
        this.updatePost(this.tempPost)
      })
      this.getPosts()
    }
  }
})
</script>
