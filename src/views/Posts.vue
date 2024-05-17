<template>
    <div class="func-bar d-flex justify-content-between" ref="posts">
        <div class="col-md-2">
            <select class="form-select" id="country" required="">
                <option value="">請選擇貼文排序</option>
                <option>從新到舊貼文</option>
                <option>從舊到最新</option>
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
    <div class="main mt-3" v-for="item in posts" :key="item._id">
        <div class="card">
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
</template>

<script>
export default ({
  name: 'Posts',
  inject: ['emitter'],
  data () {
    return {
      posts: [],
      tempPost: {},
      newPostData: {}
    }
  },
  methods: {
    getPosts () {
      const api = `${process.env.VUE_APP_API}posts/`
      this.$http.get(api).then((res) => {
        // console.log(res.data.data.posts)
        this.posts = res.data.data.posts
      })
    },
    updatePost (postData) {
      const api = `${process.env.VUE_APP_API}posts/`
      console.log('Updating post with data:', JSON.stringify(postData))
      this.$http.post(api, postData).then((res) => {
        console.log('Post updated successfully:', res.data)
        this.getPosts()
      }).catch((error) => {
        console.error('Error updating post:', error.response ? error.response.data : error.message) // 更詳細的錯誤信息
        console.error('Error details:', error.response)
      })
    }
  },
  created () {
    this.emitter.on('updatePost', (postData) => {
      // console.log(postData)
      this.newPostData = { ...postData }
      this.updatePost(this.newPostData)
    })
    this.getPosts()
  }
})
</script>
