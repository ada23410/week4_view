<template>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
      <div class="main mt-3" v-if="post">
        <div>
          <div class="card">
              <div class="card-body">
                  <div class="card-title d-flex align-items-center">
                      <img :src="post.user.photo" alt="mdo" width="32" height="32" class="rounded-circle me-2">
                      <div class="post-info">
                          <div class="name">{{ post.user.name }}</div>
                          <div class="time">{{ new Date(post.createdAt).toLocaleString() }}</div>
                      </div>
                  </div>
                  <p class="card-text">{{ post.content }}</p>
                  <div>
                      <span class="me-2"  v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
                  </div>
              </div>
              <div class="card-img-bottom">
                  <img :src="post.image" alt="...">
              </div>
              <div class="card-body">
                <div class="like">
                  <a class="list-group-item list-group-item-action">
                    <font-awesome-icon class="bars me-2" icon="fas fa-thumbs-up"/>
                    <span>1</span>
                  </a>
                </div>
                <div class="comment">
                  <div class="img-wrap">
                    <img :src="post.user.photo" alt="mdo">
                  </div>
                  <div class="comment-input">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="請輸入留言" for="comment">
                      <button class="btn btn-outline-secondary" type="button" id="comment">留言</button>
                    </div>
                  </div>
                </div>
                <div class="comment-display" v-for="comment in post.commentsV" :key="comment._id">
                  <div class="img-wrap">
                    <img :src="comment.user.photo || 'path/to/default/image.jpg'" alt="mdo">
                  </div>
                  <div class="user-info">
                    <div class="name">{{ comment.user.name }}</div>
                    <div class="time">{{ new Date(comment.createdAt).toLocaleString() }}</div>
                    <div class="content">{{ comment.comment }}</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    postId: String
  },
  data () {
    return {
      post: null,
      isLoading: true,
      error: ''
    }
  },
  methods: {
    getToken () {
      const value = `; ${document.cookie}`
      const parts = value.split('; uid=')
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },
    fetchPost () {
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入以查看按讚貼文'
        return
      }
      const api = `${process.env.VUE_APP_API}posts/${this.postId}`
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data.data)
        this.post = res.data.data
        this.isLoading = false
      }).catch(error => {
        console.error('Error fetching post:', error)
        this.error = 'Failed to load post.'
        this.isLoading = false
      })
    }
  },
  created () {
    this.fetchPost()
  }
}
</script>
