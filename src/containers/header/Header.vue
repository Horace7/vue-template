<template>
  <div class="header" :style="'z-index:' + zIndex">
    <!-- logo -->
    <div class="logo" :class="{'is-active':isActive}" :style="isActive ? 'text-indent: 20px;' : ''">
      <img src="@/assets/logo.png" alt="" height="28px">
      {{ $t(`index.title`) }}
    </div>
    <!-- 头部导航 -->
    <div class="navbar">
      <div class="btn" :class="{'is-active':isActive}" @click="handleMenu">
        <span :class="menuBtn"></span>
      </div>
      <div class="nav-time" :style="isActive ? 'left: 120px' : 'left: 270px'">
        <div class="day-time" v-text="date"></div>
        <div class="week-time" v-text="weekDay"></div>
        <el-select class="el-select_dashboard" v-model="dashboardId" placeholder="请选择" v-if="$route.path === '/dashboard/detail'" @change="changeDash">
          <el-option v-for="item in dashboardList" :key="item.id" :label="item.dashboardName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div>
        <div style="display: inline-block" v-show="isPc">
          <!-- 国际化 -->
          <el-dropdown trigger="click" style="float: right;margin-top: 6px;color:inherit;">
            <span class="lang-logo">
              <!-- <img :src="langLogo" class='langAvatar' alt=""> -->
              <i class="iconfont icon-icon_language"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(item, index) in langList">
                <el-dropdown-item v-text="item.lang" :key="index" :class="{ 'lang-selected': currentSelected === index }" @click.native="changeLocale(item.type, index)"></el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 个人中心 -->
          <el-dropdown trigger="click" style="float: right;margin-right: 30px;margin-top:3px;">
            <span class="el-dropdown-link">
              <img class="avatar-img" :src="this.$store.getters.avatar || defaultAvatar" alt="" />
              {{$store.getters.userInfo.nickName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changePass">修改密码 </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出 </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click" style="float:right;margin-right: 40px;color:inherit;line-height: 37px;margin-top:4px;">
             <i class="iconfont icon-icon_calendar" style="font-size: 24px;margin-top: 6px;cursor:pointer;"></i>
            <el-dropdown-menu class="timeBook">
              <el-calendar v-model="calendar"></el-calendar>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- 修改密码 -->
    <change-pass :passVisible="passVisible" @cancel="cancel"></change-pass>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import langLogo from '@/assets/images/lang.png'
import defaultAvatar from '@/assets/images/avatar.jpg'
import localStorage from '@/utils/localStorage'

export default {
  name: 'Header',
  props: {
    isPc: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      weekDay: '',
      date: new Date(),
      menuBtn: 'el-icon-newfont-caidan',
      langLogo: langLogo,
      calendar: new Date(),
      isFullScreen: false,
      passVisible: false,
      zIndex: 10,
      langList: [
        { lang: '中文', type: 'zh_CN' },
        { lang: 'English', type: 'en' }
      ],
      currentSelected: 0,
      defaultAvatar: defaultAvatar
    }
  },
  created () {
    const lang = window.localStorage.getItem('lang')
    if (lang === 'zh') {
      this.currentSelected = 0
    } else {
      this.currentSelected = 1
    }
  },
  computed: {
    // 如果左侧菜单打开，则旋转btn180度
    isActive () {
      return !this.$store.getters.sidebar.opened
    },
    dashboardList () {
      // this.dashboardId = this.$store.getters.dashboardList[0].id
      return this.$store.getters.dashboardList
    },
    dashboardId () {
      return this.$store.getters.dashboardItem.id
    }
  },
  mounted () {
    const _this = this
    this.timer = setInterval(() => {
      _this.weekDay = this.weekDate()
      _this.date = new Date().toLocaleString('chinese', { hour12: false })
    })
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    ...mapMutations({
      bindLogout: 'BIND_LOGOUT'
    }),
    toAdmin () {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      const tenant = localStorage.getItem('tenant') || sessionStorage.getItem('tenant')
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId')
      console.log(process.env.NODE_ENV)
      console.log(process.env.VUE_APP_ADMIN_BASE)
      const url = `${process.env.VUE_APP_ADMIN_BASE}?token=${token}&tenant=${tenant}&userId=${userId}`
      window.open(url)
    },
    cancel () {
      this.passVisible = false
      this.zIndex = 10
    },
    changePass () {
      // this.passVisible = true
      // this.zIndex = 10000
      this.$router.push({ path: '/forgotPass' })
    },
    changeDash (val) {
      console.log(val)
      const item = this.dashboardList.find(temp => temp.id === val)
      this.$store.dispatch('getDashItem', { ...item })
      // this.$router.push({
      //   path: '/dashboard/detail',
      //   query: {
      //     id: item.id,
      //     name: item.dashboardName
      //   }
      // })
    },
    // 切换语言
    changeLocale (type, index) {
      this.currentSelected = index
      localStorage.setItem('lang', type)
      this.$i18n.locale = type
      const iwindow = window.iframe.contentWindow
      const item = {
        lang: type,
        type: 'lang'
      }
      iwindow.postMessage(item, '*')
    },
    weekDate () {
      const date = new Date()
      const day = date.getDay()
      const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return weeks[day]
    },
    handleSwitchScreen () {
      if (this.isFullScreen) {
        this.exitFullscreen()
        this.isFullScreen = false
      } else {
        this.requestFullScreen()
        this.isFullScreen = true
      }
    },
    // 进入全屏
    requestFullScreen () {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen()
      } else if (elem.msRequestFullscreen) {
        document.body.msRequestFullscreen()
      }
    },
    // 退出全屏
    exitFullscreen () {
      const doc = document
      if (doc.exitFullscreen) {
        doc.exitFullscreen()
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen()
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen()
      } else if (doc.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    handleMenu () {
      this.$store.dispatch('ToggleSideBar')
      this.$emit('handleMenu')
    },
    logout () {
      this.$confirm('是否退出账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(res => {
          this.$router.push({
            path: '/login'
          })
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px!important;
  display: flex;
  background: #224268;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .logo {
    width: 200px;
    height: 60px;
    background: #224268;
    color: #fff;
    text-indent: 29px;
    font-size: 14px;
    line-height: 60px;
    font-weight: 600;
    transition: .4s ease;
    &.is-active {
      width: 64px;
      img {
        padding: 0 5px 5px 0;
      }
    }
  }
  .el-full_screen{
    color: #ffffff;
    margin-right: 10px;
  }
  .navbar {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: #fff;
    .nav-time{
      position: absolute;
      left: 270px;
      font-weight: bold;
      .day-time,.week-time{
        display: inline-block;
        font-size:20px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      .week-time{
        margin-left: 10px;
      }
      .el-select_dashboard{
        margin-left: -25px;
      }
    }
    .btn {
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      transition: .4s ease;
      &.is-active {
        transform: rotateY(180deg);
      }
      span {
        font-size: 28px;
        line-height: 50px;
        transition: 0.5s;
        color: #ffffff;
        font-weight: 400;
      }
    }
    .el-dropdown-link {
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }
    .lang-logo{
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      display: inline-block;
      margin-right: 30px;
      cursor: pointer;
      float: right;
      i {
        font-size: 24px;
      }
    }
    .avatar-img{
      width:40px;
      height:40px;
      border-radius:50%;
      margin-right:4px
    }
  }
}
.lang-selected{
  color: #909399;
}
@media all and (max-width: 768px) {
  .header .logo.is-active {
    width: 0;
    overflow: hidden;
  }
}
</style>
<style lang="scss">
.timeBook {
  bottom: 200px;
}
</style>
