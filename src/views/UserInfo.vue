<template>
  <div class="main">
    <div class="card">
      <!-- nav options -->
      <ul class="nav nav-pills mb-3 mt-2 shadow-sm" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            >個人資訊</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            >修改密碼</a
          >
        </li>
      </ul>
      <!-- content -->
      <div class="tab-content" id="pills-tabContent p-3">
        <!-- 1st card -->
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div class="img-wrap">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="card-img-top"
              alt="..."
            />
        </div>
        <a href="#" class="btn btn-primary upload">上傳</a>
        <div class="card-body">
            <div class="row g-4 align-items-center mt-1">
                <div class="col-auto">
                    <label for="inputPassword6" class="col-form-label">暱稱</label>
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control" v-model="user.name"/>
                </div>
            </div>
            <div class="row g-4 align-items-center mt-1">
              <div class="col-auto">
                <label for="inputPassword6" class="col-form-label">性別</label>
              </div>
              <div class="col-auto">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="user.sex"
                    id="sexFemale"
                    value="female"
                  />
                  <label class="form-check-label" for="sexFemale">
                    女
                  </label>
                </div>
              </div>
              <div class="col-auto">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="user.sex"
                    id="sexMale"
                    value="male"
                  />
                  <label class="form-check-label" for="sexMale">
                    男
                  </label>
                </div>
              </div>
              <div class="col-auto">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    v-model="user.sex"
                    id="sexOther"
                    value="other"
                  />
                  <label class="form-check-label" for="sexOther">
                    其他
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 2nd card -->
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div class="form-group addinfo">
            <label for="exampleFormControlTextarea1">Write additional info.</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
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
      user: {
        email: '',
        name: '',
        sex: ''
      }
    }
  },
  methods: {
    getToken () {
      const value = `; ${document.cookie}`
      const parts = value.split('; uid=')
      if (parts.length === 2) return parts.pop().split(';').shift()
      return null
    },
    getProfile () {
      const api = `${process.env.VUE_APP_API}users/profile`
      const token = this.getToken()
      console.log(token)
      if (!token) {
        this.message = '請先登入以查看貼文'
        return
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        // console.log(res.data.data)
        this.user = res.data.data
      })
    }
  },
  created () {
    const token = this.getToken()
    if (token) {
      this.getProfile()
    } else {
      console.log('No token found')
    }
  }
}
</script>
