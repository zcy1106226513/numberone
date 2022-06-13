<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#001529" text-color="#fff" active-text-color="#ffd04b" :router="true">
    <template v-for="item in menusList">
      <!-- 包含子节点菜单 -->
      <el-submenu :index="item.indexPath" :key="item.indexPath" v-if="item.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="subItem.indexPath" v-for="subItem in item.children" :key="subItem.indexPath">
          <i :class="subItem.icon"></i>
          <span slot="title">{{subItem.title}}</span>
        </el-menu-item>
      </el-submenu>
      <!-- 一级菜单 -->
      <el-menu-item :index="item.indexPath" :key="item.indexPath" v-else>
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>

</template>

<script>

export default {
  name: 'Menu',

  props: {
    menusList: {
      type: Array,
      required: true,
      default () {
        return []
      }

    }
  },
  data () {
    return {}
  }

}
</script>

<style>
</style>
