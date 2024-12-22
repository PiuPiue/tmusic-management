<template>
    <div>
      <!-- 顶部导航栏 -->
      <div class="top-bar">
        
      </div>
  
      <!-- 主体内容 -->
      <div class="center">
        <!-- 侧边栏 -->
        <div class="home-bar" :class="{ collapsed: isCollapsed }">
          <div class="toggle-btn" @click="toggleSidebar">
            <span v-if="!isCollapsed">⏴</span>
            <span v-else>⏵</span>
          </div>
          
          <div class="person-info" v-if="!isCollapsed">
            <template>
              T-music
            </template>
           
            
          </div>
          <div class="function-list">
            <router-link 
              v-for="(item, index) in menuItems" 
              :key="index" 
              :to="item.path" 
              class="function-item" 
              :class="{ active: $route.path === item.path }">
                  <i class="iconfont" v-if="item.icon.startsWith('')" v-html="item.icon"></i>
              <span v-if="!isCollapsed" style="margin-left: 10px;">{{ item.label }}</span>
            </router-link>
          </div>
        </div>
  
        <!-- 主内容区域 -->
        <div class="main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    
    name: 'homeIndex',
    data() {
      return {
        isCollapsed: false, // 控制侧边栏折叠状态
        menuItems: [
            { path: '/home/tmusic', label: '首页', icon: '&#xe60f;', type: 'font-awesome' },
            { path: '/home/log', label: '服务监控', icon: '&#xe606;', type: 'font-awesome' },
            { path: '/home/playlist', label: '歌单管理', icon: '&#xe703;', type: 'iconfont' },
            { path: '/home/song', label: '歌曲管理', icon: '&#xe613;', type: 'iconfont' },
            { path: '/home/singer', label: '歌手管理', icon: '&#xe74e;', type: 'font-awesome' },
            { path: '/home/user', label: '用户管理', icon: '&#xe604;', type: 'iconfont' },
            { path: '/home/log', label: '查看日志', icon: '&#xe606;', type: 'font-awesome' },
            { path: '/home/log', label: '相关脚本', icon: '&#xe606;', type: 'font-awesome' }
      ],

      };
    },
    methods: {
      toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
      },
    },
  };
  </script>
  
  <style>
  /* 全局样式 */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f9fafb; /* 更清新的浅灰背景 */
}

/* 顶部导航栏 */
.top-bar {
  height: 60px;
  background-color: #5DADE2; 
  /* background-color: #2C3E50; */
  color: #fff;
  line-height: 60px;
  font-size: 24px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 主体布局 */
.center {
  display: flex;
  height: calc(100vh - 60px);
}

/* 侧边栏 */
.home-bar {
  width: 240px;
  background-color: #ecf5ff; /* 柔和的浅蓝背景 */
  display: flex;
  flex-direction: column;
  padding: 10px;
  transition: width 0.3s ease-in-out, background-color 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.home-bar.collapsed {
  width: 60px;
  background-color: #d9eaf7; /* 折叠时稍微加深背景 */
}

/* 侧边栏的切换按钮 */
.toggle-btn {
  height: 40px;
  width: 40px;
  background-color: #5DADE2;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  margin: 10px auto;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-btn:hover {
  background-color: #4DA3D1;
}

/* 用户信息区域 */
.person-info {
  height: 120px;
  background-color: #AED6F1; /* 柔和蓝色 */
  border-radius: 10px;
  line-height: 120px;
  text-align: center;
  color: #2C3E50; /* 深灰色 */
  font-size: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 功能列表 */
.function-list {
  margin-top: 10px;
}

.function-item {
  display: flex;
  align-items: center;
  padding: 12px 10px;
  margin-top: 10px;
  font-size: 14px;
  border-radius: 8px;
  color: #34495E; /* 深灰色 */
  text-decoration: none;
  background-color: #eaf4fc; /* 淡蓝灰背景 */
  transition: all 0.3s ease;
}

.function-item .icon {
  font-size: 18px;
  margin-right: 10px;
  color: #5DADE2; /* 图标颜色 */
}

.function-item.active {
  background-color: #5DADE2; /* 选中时的亮蓝色 */
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.function-item:hover {
  background-color: #D4E6F1; /* 悬停时的浅蓝 */
  color: #34495E;
  transform: translateX(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.home-bar.collapsed .function-item .icon {
  margin-right: 0;
}

.home-bar.collapsed .function-item span {
  display: none;
}

/* 主内容区域 */
.main {
  flex: 1;
  margin: 20px;
  background-color: #ffffff; /* 纯白背景 */
  color: #333333; /* 主文字颜色 */
  padding: 20px;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 按钮颜色 */
.el-button--primary {
  background-color: #5DADE2; /* 主按钮蓝色 */
  border-color: #5DADE2;
  color: white;
}

.el-button--primary:hover {
  background-color: #4DA3D1;
  border-color: #4DA3D1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-bar {
    position: fixed;
    left: -240px;
    top: 60px;
    height: calc(100vh - 60px);
    transition: left 0.3s ease-in-out;
  }

  .home-bar.collapsed {
    left: 0;
    width: 240px;
  }

  .main {
    margin-left: 0;
    padding: 10px;
  }
}

  </style>
  