<template>
  <el-container>
    <el-header>
      <Header @handleMenu="handleMenu" :isPc="isPc"></Header>
    </el-header>
    <el-container>
      <Siderbar></Siderbar>
      <el-container>
        <el-main id="mainScroll">
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from './header/Header'
import Siderbar from './sidebar/Sidebar'

export default {
  name: 'Full',
  components: {
    Header,
    Siderbar
  },
  data () {
    return {
      screenWidth: document.body.clientWidth,
      isCollapse: this.$store.getters.sidebar.opened,
      showBackBtn: false,
      isPc: true
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    const $this = this
    window.addEventListener('resize', function () {
      $this.screenWidth = document.body.offsetWidth
    })
    this.settingStyle()
    document.getElementById('mainScroll').addEventListener('scroll', this.bindScroll)
  },
  watch: {
    $route () {
      if (this.screenWidth > 768 && this.screenWidth <= 992) {
        this.settingLeft(64)
      } else if (this.screenWidth <= 768) {
        this.settingLeft(0)
        this.isPc = true
      } else {
        if (this.$store.getters.sidebar.opened) {
          this.settingLeft(200)
        } else {
          this.settingLeft(64)
        }
      }
    },
    screenWidth (val) {
      // console.log(val)
      this.$store.dispatch('SET_SCREEN_WIDTH', val)
      this.settingStyle()
    }
  },
  destroyed () {
    document.getElementById('mainScroll').removeEventListener('scroll', this.bindScroll)
  },
  methods: {
    handleMenu () {
      this.isCollapse = this.$store.getters.sidebar.opened
      if (this.screenWidth > 768 && this.screenWidth <= 992) {
        if (this.isCollapse) {
          this.settingLeft(200)
        } else {
          this.settingLeft(64)
        }
      } else if (this.screenWidth <= 768) {
        if (this.isCollapse) {
          this.settingLeft(200)
          this.isPc = false
        } else {
          this.settingLeft(0)
          this.isPc = true
        }
      } else {
        if (this.isCollapse) {
          this.settingLeft(200)
        } else {
          this.settingLeft(64)
        }
      }
    },
    settingStyle () {
      if (this.screenWidth > 768 && this.screenWidth <= 992) {
        this.settingLeft(64)
      } else if (this.screenWidth <= 768) {
        this.settingLeft(0)
      } else {
        this.isPc = true
        if (this.$store.getters.sidebar.opened) {
          this.settingLeft(200)
        } else {
          this.settingLeft(64)
        }
      }
    },
    settingLeft (left) {
      document.getElementById('mainScroll').style.left = left + 'px'
    },
    bindScroll (scroll) {
      const elMainScroll = document.getElementById('mainScroll')
      if (scroll) {
        const contentHeight = Math.round(elMainScroll.offsetHeight + elMainScroll.scrollTop)
        contentHeight === elMainScroll.scrollHeight ? this.showBackBtn = true : this.showBackBtn = false
      } else {
        this.showBackBtn = false
      }
    },
    backToTop () {
      document.getElementById('mainScroll').scrollTop = 0
    }
  }
}
</script>

<style scoped lang="scss">
  @media (max-width: 920px) {
    .el-main {
      padding: 0;
    }
  }

  .el-header, .el-footer {
    color: #333;
    height: 60px !important;
    padding: 0;
  }

  .el-header {
    position: relative;
    width: 100%;
  }

  .el-main {
    background-color: #F8F9FB;
    color: #333;
    position: absolute;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    // padding: 14px 24px 0 24px;
    padding: 24px 24px 0 24px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .el-aside {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
  }
  @media all and (max-width: 768px) {
    .el-main {
      left: 0;
    }
  }
</style>
