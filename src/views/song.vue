<template>
  <div>
    <!-- 页面顶部操作栏 -->
    <div class="list-top">
      <div class="top-bar">
        <div class="list-operate">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="middle"
            @click="handleAdd"
          >添加歌曲</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="middle"
            @click="handleBatchDelete"
          >批量删除</el-button>
        </div>
        <el-input
          v-model="searchQuery"
          placeholder="搜索歌曲名称"
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

    <!-- 歌曲表格展示区 -->
    <div class="list-show">
      <el-table
        :data="filteredData"
        style="width: 100%;"
        border
        highlight-current-row
      >
        <!-- 序号列 -->
        <el-table-column label="序号" type="index" width="60" />
        <!-- 歌单名称列 -->
        <el-table-column prop="title" label="歌曲名称" width="200" />
        <!-- 标签列 -->
        <el-table-column prop="tag_id" label="标签" width="150" />
        <!-- 作者列 -->
        <el-table-column prop="artist_id" label="作者" width="150" />
        <!-- 歌曲封面 -->
        <el-table-column label="歌曲封面" width="150">
          <template #default="scope">
            <el-image
              style="width: 60px; height: 60px; border-radius: 8px;"
              :src="scope.row.cover_url"
              fit="cover"
            />
          </template>
        </el-table-column>
        <!-- 歌曲描述列 -->
        <el-table-column prop="description" label="描述" width="200" />
        <!-- 类型列 -->
        <el-table-column prop="type" label="类型" width="120">
          <template #default="scope">
            <el-tag :type="getTypeTag(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 创建时间列 -->
        <el-table-column prop="create_time" label="创建时间" width="180" />
        <!-- 操作列 -->
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="handleChange(scope.row)">歌曲变更</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
            <el-button @click="modalVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongIndex",
  data() {
    return {
      modalVisible: false,
      searchQuery: "",
      tableData: [
        {
          id: 1,
          title: "我最喜欢的歌曲",
          cover_url: "null",
          tag_id: "null",
          artist_id: 1,
          description: "我喜欢的歌曲",
          type: 1,
          create_time: "2024-01-01 12:00:00",
        },
      ],
      form: {
        name: "",
        tag_id: "",
        artist_id: "",
        cover_url: "",
        description: "",
        type: "",
      },
    };
  },
  computed: {
    filteredData() {
      if (this.searchQuery) {
        return this.tableData.filter((item) =>
          item.title.includes(this.searchQuery)
        );
      }
      return this.tableData;
    },
  },
  methods: {
    handleAdd() {
      this.modalVisible = true;
      console.log("添加歌曲");
    },
    handleBatchDelete() {
      console.log("批量删除歌曲");
    },
    handleEdit(row) {
      this.modalVisible = true;
      console.log("编辑歌曲:", row);
    },
    handleChange(row) {
      console.log("歌曲变更:", row);
    },
    handleDelete(row) {
      console.log("删除歌曲:", row);
    },
    getTypeTag(type) {
      return type === 1 ? "success" : type === 2 ? "primary" : "warning";
    },
    getTypeText(type) {
      return type === 1 ? "我喜欢" : type === 2 ? "创建" : "推荐";
    },
    handleSearch() {
      console.log("搜索:", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.list-top {
  margin-bottom: 20px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-operate {
  display: flex;
  gap: 10px;
}
.list-show {
  margin-top: 15px;
}
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
.modal-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  width: 500px;
  max-width: 90%;
}
</style>
