<template>
  <div class="do-page-my-report">
    <h2 class="page-title">我的报告</h2>

    <FilterCard @search="handleSearch" @reset="handleReset" />

    <a-card
      :bordered="false"
      class="table-card"
      headStyle="border: 0;padding: 20px 20px"
      bodyStyle="padding: 0 20px"
    >
      <template #title>
        <a-button type="primary" class="add-btn">新增AI专家报告</a-button>
      </template>
      <a-table
        class="report-table"
        :columns="columns"
        :data-source="dataSource"
        :loading="tableLoading"
        :pagination="paginationConfig"
        :scroll="{ y: 'calc(100vh - 440px)' }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleViewReport(record)">查看报告资料</a-button>
            <a-button type="link" @click="handleDownloadResult(record)">下载结果</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { Card as ACard, Table as ATable, Button as AButton } from 'ant-design-vue';
  import FilterCard from './components/FilterCard.vue';

  // 表格数据
  const tableLoading = ref(false);
  const dataSource = ref([]);

  // 分页配置
  const paginationConfig = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  });

  // 搜索条件（保存当前搜索条件）
  let currentFilterState = null;

  // 处理搜索事件
  const handleSearch = async (filterState) => {
    currentFilterState = filterState;
    paginationConfig.current = 1; // 重置到第一页
    await loadTableData();
  };

  // 处理重置事件
  const handleReset = (filterState) => {
    console.log('重置筛选条件:', filterState);
    handleSearch(filterState); // 重置后重新加载数据
  };

  // 表格变化事件（分页、排序、筛选）
  const handleTableChange = (pagination) => {
    paginationConfig.current = pagination.current;
    paginationConfig.pageSize = pagination.pageSize;
    loadTableData();
  };

  // 表格列定义
  const columns = [
    { title: '报告编号', dataIndex: 'reportNo', width: 120 },
    { title: '报告名称', dataIndex: 'reportName', align: 'center' },
    { title: '报告模板', dataIndex: 'reportTemplate', width: 160 },
    { title: '创建日期', dataIndex: 'createDate', width: 200 },
    { title: '操作', key: 'action', width: 300, align: 'center' },
  ];

  // 加载表格数据
  const loadTableData = async () => {
    tableLoading.value = true;

    try {
      // 模拟接口请求延迟
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 生成模拟数据
      const total = 60; // 假设总共60条数据
      const pageSize = paginationConfig.pageSize;
      const current = paginationConfig.current;

      const mockData = Array.from({ length: pageSize }, (_, i) => {
        const index = (current - 1) * pageSize + i;
        return {
          key: index,
          reportNo: `RPT${String(20260001 + index).padStart(8, '0')}`,
          reportName: `AI旅游分析报告${2026001 + index}`,
          reportTemplate: index % 3 === 0 ? '日报' : index % 3 === 1 ? '周报' : '月报',
          createDate: '2026-04-28',
        };
      });

      dataSource.value = mockData;
      paginationConfig.total = total;

      console.log('加载数据成功:', {
        filter: currentFilterState,
        pagination: {
          current: paginationConfig.current,
          pageSize: paginationConfig.pageSize,
          total: paginationConfig.total,
        },
        dataCount: mockData.length,
      });
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      tableLoading.value = false;
    }
  };

  // 操作方法
  const handleViewReport = (record) => {
    console.log('查看报告资料:', record);
  };

  const handleDownloadResult = (record) => {
    console.log('下载结果:', record);
  };
</script>

<style scoped>
  @import './index.less';
</style>
