<template>
  <Navbar></Navbar>
  <div class="container">
    <div class="mt-3">
      <div class="row">
        <div class="col-md-9"></div>
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

export default {
  components: {
    Navbar,
    Sidebar
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
