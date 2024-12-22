<template>
    <div>
      <!-- 页面顶部操作栏 -->
      <div class="list-top">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="list-operate">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="middle"
              style="border-radius: 5px;"
              @click="handleAdd"
            >添加用户</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="middle"
              style="border-radius: 5px;"
              @click="handleBatchDelete"
            >批量删除</el-button>
          </div>
          <el-input
            v-model="searchQuery"
            placeholder="搜索账号或昵称"
            style="width: 300px;"
            clearable
            @input="handleSearch"
          >
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </div>
      </div>
  
      <!-- 用户表格展示区 -->
      <div class="list-show">
        <el-table
          :data="filteredData"
          style="width: 100%; border-radius: 10px;"
          border
          highlight-current-row
        >
          <!-- 序号列 -->
          <el-table-column
            label="序号"
            type="index"
            width="60"
          />
          <!-- 账号列 -->
          <el-table-column
            prop="account"
            label="账号"
            width="200"
          />
          <!-- 昵称列 -->
          <el-table-column
            prop="nickname"
            label="昵称"
            width="150"
          />
          <!-- 头像列 -->
          <el-table-column
            label="头像"
            width="150"
          >
            <template #default="scope">
              <el-image
                style="width: 60px; height: 60px; border-radius: 8px;"
                :src="scope.row.avatar"
                fit="cover"
              />
            </template>
          </el-table-column>
          <!-- 背景列 -->
          <el-table-column
            prop="background"
            label="背景"
            width="150"
          />
          <!-- 描述列 -->
          <el-table-column
            prop="description"
            label="描述"
            width="200"
          />
          <!-- 创建时间列 -->
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="180"
          />
          <!-- 操作列 -->
          <el-table-column
            label="操作"
            width="200"
          >
            <template #default="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
      <!-- 用户修改或新增窗口 -->
      <div class="modal-wrapper" v-if="modalVisible">
        <div class="modal-form">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
              <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-input v-model="form.avatar"></el-input>
            </el-form-item>
            <el-form-item label="背景">
              <el-input v-model="form.background"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">提交</el-button>
              <el-button @click="modalVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserList',
    data() {
      return {
        modalVisible: false,
        searchQuery: '',
        tableData: [
          {
            id: 1,
            account: 'user001',
            password: '******',
            nickname: '张三',
            avatar: 'https://via.placeholder.com/60',
            background: 'https://via.placeholder.com/150',
            description: '普通用户张三',
            create_time: '2024-01-01 12:00:00',
          },
          {
            id: 2,
            account: 'user002',
            password: '******',
            nickname: '李四',
            avatar: 'https://via.placeholder.com/60',
            background: 'https://via.placeholder.com/150',
            description: '活跃用户李四',
            create_time: '2024-01-02 14:00:00',
          },
        ],
        form: {
          account: '',
          password: '',
          nickname: '',
          avatar: '',
          background: '',
          description: '',
        },
      };
    },
    computed: {
      filteredData() {
        if (this.searchQuery) {
          return this.tableData.filter(item =>
            item.account.includes(this.searchQuery) || item.nickname.includes(this.searchQuery)
          );
        }
        return this.tableData;
      },
    },
    methods: {
      // 添加用户
      handleAdd() {
        this.modalVisible = true;
        this.form = { account: '', password: '', nickname: '', avatar: '', background: '', description: '' };
        console.log('添加用户');
      },
      // 批量删除
      handleBatchDelete() {
        console.log('批量删除用户');
      },
      // 编辑用户
      handleEdit(row) {
        this.modalVisible = true;
        this.form = { ...row };
        console.log('编辑用户:', row);
      },
      // 删除用户
      handleDelete(row) {
        console.log('删除用户:', row);
      },
      // 表单提交
      submitForm() {
        console.log('提交表单:', this.form);
        this.modalVisible = false;
      },
      // 搜索
      handleSearch() {
        console.log('搜索:', this.searchQuery);
      },
    },
  };
  </script>
  
  <style>
  .list-top {
    margin-bottom: 20px;
  }
  .list-operate {
    display: flex;
    gap: 10px;
  }
  .list-show {
    margin-top: 15px;
  }
  /* 遮罩层，覆盖全屏 */
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  /* 表单容器样式 */
  .modal-form {
    background-color: #fff;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    width: 500px;
    max-width: 90%;
    position: relative;
  }
  </style>
  