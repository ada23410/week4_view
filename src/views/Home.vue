<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <Navbar></Navbar>
    <div class="container">
        <div class="mt-3">
            <div class="row">
                <div class="col-md-9">
                    <router-view />
                </div>
                <div class="col-md-3">
                    <Sidebar></Sidebar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Posts from '@/views/Posts.vue'
import AddPost from '@/views/AddPost.vue'

export default ({
  components: {
    Navbar,
    // eslint-disable-next-line vue/no-unused-components
    Posts,
    // eslint-disable-next-line vue/no-unused-components
    AddPost,
    Sidebar
  },
  data () {
    return {
      postData: {}
    }
  }
})
</script>
