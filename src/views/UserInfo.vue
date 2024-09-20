<template>
  <div class="user-info">
    <div class="card">
      <!-- nav options -->
      <ul class="nav nav-pills mb-3 mt-2 shadow-sm" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link"
           :class="{ active: activeTab === 'personal' }"
            @click.prevent="activeTab = 'personal'"
            >個人資訊</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'password' }"
            @click.prevent="activeTab = 'password'"
            >修改密碼</a
          >
        </li>
      </ul>
      <!-- content -->
      <div class="tab-content" id="pills-tabContent p-3">
        <!-- 1st card -->
        <div v-if="activeTab === 'personal'">
            <div
              class="tab-pane show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
            <div class="img-wrap">
                <img
                    :src="imageUrl"
                    class="card-img-top"
                    alt="Profile Image"
                />
            </div>
            <input
                type="file"
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                style="display: none;"
            />
            <div class="row justify-content-center">
                <button @click="triggerFile" class="btn btn-primary upload">選擇圖片</button>
                <button @click="uploadImage" class="btn btn-success upload ml-2">上傳圖片</button>
            </div>
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
                <div class="row justify-content-center mt-5">
                    <button type="button" class="btn btn-primary" @click="changeInfo()">送出更新</button>
                </div>
              </div>
            </div>
        </div>
        <!-- 2nd card -->
        <div v-if="activeTab === 'password'">
            <div
              class="tab-pane show active"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
            <div class="card-body">
                <div class="row g-4 align-items-center mt-1">
                    <div class="col-auto">
                        <label for="new_password" class="col-form-label">輸入新密碼</label>
                    </div>
                    <div class="col-auto">
                        <input type="text" class="form-control" id="new_password" v-model="newPassword"/>
                    </div>
                </div>
                <div class="row g-4 align-items-center mt-1">
                    <div class="col-auto">
                        <label for="confirm_password" class="col-form-label">請再次輸入</label>
                    </div>
                    <div class="col-auto">
                        <input type="text" class="form-control" id="confirm_password" v-model="confirmPassword"/>
                    </div>
                </div>
                <div class="row justify-content-center mt-5">
                    <button type="button" class="btn btn-primary" @click="changePassword">重設密碼</button>
                </div>
            </div>
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
      activeTab: 'personal',
      user: {
        email: '',
        name: '',
        sex: ''
      },
      newPassword: '',
      confirmPassword: '',
      file: null,
      imageUrl: null
    }
  },
  watch: {
    activeTab (newTab, oldTab) {
      console.log(`從${oldTab} 切換到 ${newTab}`)
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
      // console.log(token)
      if (!token) {
        this.message = '請先登入才能檢視個人資訊'
        return
      }
      this.$http.get(api, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        // console.log(res.data)
        this.user = res.data.data
        this.imageUrl = this.user.photo
      })
    },
    changeInfo (imageUrl = null) {
      const api = `${process.env.VUE_APP_API}users/profile`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入才能修改個人資訊'
      }

      const user = {
        name: this.user.name,
        sex: this.user.sex
      }

      if (imageUrl && typeof imageUrl === 'string') {
        user.photo = imageUrl
      }

      this.$http.patch(api, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        // console.log(res)
        console.log('個人資訊更新成功', res)
        this.user = { ...this.user, ...res.data.data }
        if (imageUrl && typeof imageUrl === 'string') {
          this.imageUrl = imageUrl
        }
      })
    },
    changePassword () {
      const api = `${process.env.VUE_APP_API}users/updatePassword`
      const token = this.getToken()
      if (!token) {
        this.message = '請先登入才能修改密碼'
        return
      }
      this.$http.post(api, {
        password: this.newPassword,
        confirmPassword: this.confirmPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        // console.log(res.data)
        console.log('密碼修改成功', res)
        alert('密碼修改成功')
        this.newPassword = ''
        this.confirmPassword = ''
      })
    },
    validateFile (file) {
      const validTypes = ['image/jpeg', 'image/png']
      const maxSize = 2 * 1024 * 1024 // 2MB
      if (!validTypes.includes(file.type)) {
        this.$notify({
          type: 'error',
          title: '檔案類型錯誤',
          message: '只能上傳 JPG 或 PNG 格式的圖片'
        })
        return false
      }
      if (file.size > maxSize) {
        this.$notify({
          type: 'error',
          title: '檔案太大',
          message: '圖片大小不能超過 2MB'
        })
        return false
      }
      return true
    },
    handleFileChange (event) {
      const file = event.target.files[0]
      if (file && this.validateFile(file)) {
        this.file = file
        this.previewImage(file)
      }
    },
    triggerFile () {
      this.$refs.fileInput.click()
    },
    previewImage (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    uploadImage () {
      const formData = new FormData()
      formData.append('file', this.file)

      const api = `${process.env.VUE_APP_API}upload/file`
      const token = this.getToken()
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('Upload response:', res)
        if (res.data && res.data.data && res.data.data.fileUrl) {
          console.log('Calling changeInfo with URL:', res.data.fileUrl)
          this.changeInfo(res.data.data.fileUrl)
        } else {
          console.error('Invalid file URL received:', res.data)
        }
      })
    },
    switchTab (tab) {
      this.activeTab = tab
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
