<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">新增動態</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">開始分享跟朋友你的日常吧！</h6>
            <form @submit.prevent="submitPost">
              <div class="mt-3">
                <label for="post-content" class="form-label">貼文內容</label>
                <textarea class="form-control" id="post-content" rows="3" v-model="tempPosts.content"></textarea>
              </div>
              <div class="mt-3">
                <label for="post-image" class="form-label">圖片網址</label>
                <input type="text" class="form-control" id="post-image" v-model="tempPosts.image">
              </div>
              <div class="mt-3">
                <label for="post-tag" class="form-label">標註</label>
                <input type="text" class="form-control" id="post-tag" v-model="tempPosts.tags">
              </div>
              <div class="mt-3">
                <select class="form-select" aria-label="Default select example" v-model="tempPosts.type">
                  <option disabled value="">貼文類型</option>
                  <option value="person">person</option>
                  <option value="group">group</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary mt-3">送出貼文</button>
            </form>
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
      tempPosts: {
        content: '',
        image: '',
        tags: '',
        type: '',
        user: '662f364619039dcf42a511cc'
      }
    }
  },
  methods: {
    submitPost () {
      if (!this.tempPosts.content.trim()) {
        alert('內容不可為空。')
        return
      }
      const postData = { ...this.tempPosts, tags: this.tempPosts.tags.split(',') }
      console.log('Submitting post:', JSON.stringify(postData))
      this.$root.emitter.emit('updatePost', postData)
      this.$router.push('/home/posts')
    }
  }
}
</script>
