<template>
  <div class="sidebar">
    <el-menu
      :collapse-transition = "false"
      :default-active="activeIndex"
      router
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#ffffff"
      text-color="#778CA2"
      active-text-color="#0D70E6"
    >
      <!-- el-menu折叠动画collapse-transition|false|true -->
      <template v-for="(menu, index) in routerList">
        <template v-if="menu.children && menu.children.length">
          <template v-for="item in menu.children">
            <template v-if="item.children && item.children.length">
              <el-submenu :index="item.path + index" :key="item.path+index">
                <template slot="title" v-if="!item.hidden">
                  <i class="iconfont" :class="item.icon"></i>
                  <span class="sider-title">{{ $t(`commons.${item.name}`) }}</span>
                </template>
                <el-menu-item
                  v-for="data in item.children"
                  :index="data.path"
                  :key="data.path"
                >
                  {{ $t(`commons.${data.name}`) }}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item
                class="sider-first-child"
                :index="item.path"
                :key="item.path"
                v-if="!item.hidden"
              >
                <i class="iconfont" :class="item.icon"></i>
                <span slot="title" class="sider-title">
                  {{ $t(`commons.${item.name}`) }}
                  </span>
              </el-menu-item>
            </template>
          </template>
        </template>
        <template v-else>
          <el-menu-item
            v-if="!menu.hidden"
            class="sider-first-child"
            :index="menu.path"
            :key="menu.path"
          >
            <i class="iconfont" :class="menu.icon"></i>
            <span slot="title">
              {{menu.name}}
            </span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { constRouterMap } from '@/router/router.config.js'

export default {
  name: 'Sidebar',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'routerList'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    // 配置菜单跳转路由选中
    activeIndex () {
      const { path } = this.$route
      const arr = path.split('/')
      return '/' + arr[1]
    }
  }
}
</script>

<style scoped lang="less">
  .sidebar {
    background-color: #001529;
    position: fixed;
    left: 0;
    .el-menu--collapse>.el-menu-item.is-active i{
      margin-left: -6px;
    }
    .el-menu {
      padding-top: 24px;
      box-sizing: border-box;
    }
  }
  .el-menu-vertical-demo {
    li:last-child{
      position: absolute;
      bottom: 66px;
      left: 0px;
      width: 100%;
    }
  }
  .el-menu--collapse{
    li:last-child{
      left: 0!important;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
    height: 100%;
  }

  .el-menu-vertical-demo {
    min-height: 100vh;
    height: 100%;
    font-weight:600;
  }

  .el-menu-item.is-active,
  .el-submenu.is-active .el-submenu__title {
    background: #484e5c !important;
  }

  .el-submenu .el-menu-item {
    padding-left: 60px !important;
    min-width: auto;
    height: 120px;
  }
  .el-submenu.is-active .el-menu-item {
    background: #484e5c !important;
  }
  .el-menu-item.is-active  {
    background: #D2DDF1 !important;
    border-left: 8px solid #0D70E6;
  }
  .el-menu-item.is-active i {
    color: #0d70e6!important;
  }
  .el-menu-item:hover {
    background: #D2DDF1 !important;
  }
  .el-menu-item i {
    padding-bottom: 4px;
    font-size: 48px;
    font-weight: 100;
    color: rgb(119, 140, 162);
  }

  .el-submenu__title i {
    padding-bottom: 4px;
    font-size: 40px;
    color: rgb(119, 140, 162);
  }

  .sider-title{
    display: block;
    margin-top: 7px;
  }

  .el-menu--collapse {
    .el-menu-item {
      line-height: 80px;
    }
  }

  @media all and (max-width: 768px) {
    .el-menu--collapse {
      width: 0;
      overflow: hidden;
    }
  }


</style>
<style lang="less">
.sidebar {
  .el-menu-item {
    height: 120px!important;
    padding-top: 26px!important;
  }
}
</style>
