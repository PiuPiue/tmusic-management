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
          >添加歌单</el-button>
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
          placeholder="搜索歌单名称"
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
    <!-- 歌单表格展示区 -->
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
        <!-- 歌单名称列 -->
        <el-table-column
          prop="title"
          label="歌单名称"
          width="200"
        />
        <!-- 标签ID列 -->
        <el-table-column
          prop="tag_id"
          label="标签ID"
          width="150"
        />
        <!-- 作者ID列 -->
        <el-table-column
          prop="artist_id"
          label="作者ID"
          width="150"
        />
        <!-- 歌单封面 -->
        <el-table-column
          label="歌单封面"
          width="150"
        >
          <template #default="scope">
            <el-image
              style="width: 60px; height: 60px; border-radius: 8px;"
              :src="scope.row.cover_url"
              fit="cover"
            />
          </template>
        </el-table-column>
        <!-- 歌单描述列 -->
        <el-table-column
          prop="description"
          label="描述"
          width="200"
        />
        <!-- 类型列 -->
        <el-table-column
          prop="type"
          label="类型"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="getTypeTag(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 创建时间列 -->
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="180"
        />
         <!-- 喜欢人数列 -->
         <el-table-column
          prop="like_count" 
          label="喜欢人数"
          width="100"
        />  
        <!-- 操作列 -->
        <el-table-column
          label="操作"
          width="300"
        >
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            
            <el-button
              size="mini"
              type="edit"
              @click="handleDelete(scope.row)"
            >歌曲变更</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 歌单修改或新增窗口 -->
   <!-- 歌单修改或新增窗口 -->
<div class="modal-wrapper" v-if="modalVisible">
  <div class="modal-form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="歌单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标签ID">
        <el-input v-model="form.tag_id"></el-input>
      </el-form-item>
      <el-form-item label="作者ID">
        <el-input v-model="form.artist_id"></el-input>
      </el-form-item>
      <el-form-item label="歌单封面">
        <el-input v-model="form.cover_url"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="我喜欢" value="1"></el-option>
          <el-option label="创建" value="2"></el-option>
          <el-option label="推荐" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="modalVisible = !modalVisible">取消</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</div>

  </div>
</template>

<script>
export default {
  name: 'PlaylistList',
  data() {
    return {
      isAddForm: true,
      modalVisible: false,
      searchQuery: '',
      tableData: [
        {
          id: 1,
          title: '我最喜欢的歌单',
          cover_url: 'https://via.placeholder.com/60',
          tag_id: '流行',
          artist_id: 101,
          description: '收录了我喜欢的歌曲',
          type: 1,
          create_time: '2024-01-01 12:00:00',
        },
        {
          id: 2,
          title: '经典摇滚合集',
          cover_url: 'https://via.placeholder.com/60',
          tag_id: '摇滚',
          artist_id: 102,
          description: '精选经典摇滚音乐',
          type: 2,
          create_time: '2024-01-02 14:00:00',
        },
        {
          id: 3,
          title: '歌手张三精选集',
          cover_url: 'https://via.placeholder.com/60',
          tag_id: '民谣',
          artist_id: 103,
          description: '歌手张三的最佳歌曲合集',
          type: 3,
          create_time: '2024-01-03 15:30:00',
        },
      ],
      form: {
        name: '',
        tag_id: '',
        artist_id: '',
        cover_url: '',
        description: '',
        type: '',
      },
    };
  },
  computed: {
    filteredData() {
      if (this.searchQuery) {
        return this.tableData.filter(item =>
          item.title.includes(this.searchQuery)
        );
      }
      return this.tableData;
    },
  },
  methods: {
    // 添加歌单
    handleAdd() {
      this.modalVisible = true;
      console.log('添加歌单');
    },
    // 批量删除歌单
    handleBatchDelete() {
      console.log('批量删除歌单');
    },
    // 编辑歌单
    handleEdit(row) {
      this.modalVisible = true;
      console.log('编辑歌单:', row);
    },
    // 删除歌单
    handleDelete(row) {
      console.log('删除歌单:', row);
    },
    // 类型标签颜色映射
    getTypeTag(type) {
      switch (type) {
        case 1:
          return 'success'; // 我喜欢
        case 2:
          return 'primary'; // 创建
        case 3:
          return 'warning'; // 歌手列表
        default:
          return '';
      }
    },
    // 类型文字映射
    getTypeText(type) {
      switch (type) {
        case 1:
          return '我喜欢';
        case 2:
          return '创建';
        case 3:
          return '歌手列表';
        default:
          return '未知';
      }
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
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  z-index: 999; /* 确保显示在最上层 */
}

/* 表单容器样式 */
.modal-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  width: 500px; /* 表单宽度 */
  max-width: 90%; /* 响应式，最大宽度 */
  position: relative;
}

</style>
