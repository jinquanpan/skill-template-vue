<template>
  <div class="do-page-my-report">
    <a-table
      class="report-table"
      :columns="columns"
      :data-source="dataSource"
      :pagination="paginationConfig"
      :scroll="{ y: 'calc(100vh - 440px)' }"
    >
    </a-table>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { Table as ATable } from 'ant-design-vue';

  // 表格数据
  const dataSource = ref([]);

  // 分页配置
  const paginationConfig = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  });

  // 表格列定义
  const columns = [
    { title: '报告编号', dataIndex: 'reportNo', width: 120 },
    { title: '报告名称', dataIndex: 'reportName', align: 'center' },
    { title: '报告模板', dataIndex: 'reportTemplate', width: 160 },
    { title: '创建日期', dataIndex: 'createDate', width: 200 },
    { title: '操作', key: 'action', width: 300, align: 'center' },
  ];
</script>

<style scoped>
  @import './index.less';
</style>
