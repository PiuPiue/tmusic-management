<template>
    <div class="dashboard">
      <!-- 顶部统计数据 -->
      <div class="number-container">
        <div class="number-item">
          <div class="number-item-title">歌曲总数</div>
          <div class="number-item-content">{{ songCount }}</div>
        </div>
  
        <div class="number-item">
          <div class="number-item-title">歌单总数</div>
          <div class="number-item-content">{{ songListCount }}</div>
        </div>
  
        <div class="number-item">
          <div class="number-item-title">网站访问总人数</div>
          <div class="number-item-content">{{ userCount }}</div>
        </div>
  
        <div class="number-item">
          <div class="number-item-title">歌手总数</div>
          <div class="number-item-content">{{ singerCount }}</div>
        </div>
      </div>
  
      <!-- 图表区域 -->
      <div class="charts-container">

        <!-- 右侧饼状图 -->
        <div class="chart-box">
          <div class="chart-title">歌曲类别占比</div>
          <div id="pieChart" class="chart"></div>
        </div>

        <!-- 左侧柱状图 -->
        <div class="chart-box">
          <div class="chart-title">播放量排名前10</div>
          <div id="barChart" class="chart"></div>
        </div>
  
        
      </div>
    </div>
  </template>
  
  <script>
  import * as echarts from "echarts";
  
  export default {
    name: "TmusicIndex",
    data() {
      return {
        songCount: 1200,
        songListCount: 300,
        userCount: 50000,
        singerCount: 80,
      };
    },
    mounted() {
      this.initBarChart();
      this.initPieChart();
    },
    methods: {
      // 播放量排名前10的柱状图
      initBarChart() {
        const chartDom = document.getElementById("barChart");
        const myChart = echarts.init(chartDom);
  
        const option = {
          title: { text: "播放量排名前10", left: "center" },
          tooltip: { trigger: "axis" },
          xAxis: {
            type: "category",
            data: [
              "歌曲1",
              "歌曲2",
              "歌曲3",
              "歌曲4",
              "歌曲5",
              "歌曲6",
              "歌曲7",
              "歌曲8",
              "歌曲9",
              "歌曲10",
            ],
            axisLabel: { color: "#555" },
          },
          yAxis: { type: "value" },
          series: [
            {
              name: "播放量",
              type: "bar",
              data: [1200, 1100, 950, 900, 850, 800, 750, 700, 650, 600],
              itemStyle: { color: "#5DADE2" },
            },
          ],
        };
  
        myChart.setOption(option);
      },
  
      // 歌曲类别占比的饼状图
      initPieChart() {
        const chartDom = document.getElementById("pieChart");
        const myChart = echarts.init(chartDom);
  
        const option = {
          title: { text: "歌曲类别占比", left: "center" },
          tooltip: { trigger: "item" },
          legend: { bottom: "0%", left: "center" },
          series: [
            {
              name: "歌曲类别",
              type: "pie",
              radius: "50%",
              data: [
                { value: 400, name: "流行" },
                { value: 300, name: "摇滚" },
                { value: 200, name: "电子" },
                { value: 150, name: "古典" },
                { value: 100, name: "民谣" },
              ],
              emphasis: {
                itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: "rgba(0, 0, 0, 0.5)" },
              },
            },
          ],
        };
  
        myChart.setOption(option);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 页面整体布局 */
  .dashboard {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: 100vh;
  }
  
  /* 统计数据部分 */
  .number-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .number-item {
  flex: 1;
  background: linear-gradient(to right, #ff9a9e, #fad0c4); /* 粉色渐变 */
  color: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin: 0 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加动画 */
}

.number-item:hover {
  transform: translateY(-5px); /* 悬浮时上移 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 加深阴影 */
}

.number-item:nth-child(2) {
  background: linear-gradient(to right, #a18cd1, #fbc2eb); /* 紫色渐变 */
}

.number-item:nth-child(3) {
  background: linear-gradient(to right, #84fab0, #8fd3f4); /* 青色渐变 */
}

.number-item:nth-child(4) {
  background: linear-gradient(to right, #ffecd2, #fcb69f); /* 橘粉色渐变 */
}

  .number-item-title {
    font-size: 20px;
    font-weight: bold;
  }
  
  .number-item-content {
    margin-top: 10px;
    font-size: 32px;
    font-weight: bold;
  }
  
  /* 图表区域 */
  .charts-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .chart-box {
    flex: 1;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .chart-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }
  
  .chart {
    width: 100%;
    height: 400px;
  }
  </style>
  