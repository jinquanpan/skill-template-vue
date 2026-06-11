<template>
  <a-card :bordered="false" class="filter-card" bodyStyle="padding: 20px">
    <a-form layout="inline" :model="filterState">
      <a-form-item label="报告名称">
        <a-input
          v-model:value="filterState.reportName"
          placeholder="请输入报告名称"
          style="width: 200px"
        />
      </a-form-item>

      <a-form-item label="报告模板">
        <a-select
          v-model:value="filterState.template"
          placeholder="请选择报告模板"
          style="width: 150px"
          allow-clear
        >
          <a-select-option value="daily">A</a-select-option>
          <a-select-option value="weekly">B</a-select-option>
          <a-select-option value="monthly">C</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="创建日期">
        <a-range-picker v-model:value="filterState.dateRange" :disabled-date="disabledDate" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" @click="handleSearch">查询</a-button>
        <a-button class="reset-btn" @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
  import { reactive, onMounted } from 'vue';
  import {
    Card as ACard,
    Form as AForm,
    FormItem as AFormItem,
    Input as AInput,
    Select as ASelect,
    SelectOption as ASelectOption,
    RangePicker as ARangePicker,
    Button as AButton,
  } from 'ant-design-vue';

  const emit = defineEmits(['search', 'reset']);

  const filterState = reactive({
    reportName: '',
    template: undefined,
    dateRange: null,
  });

  const handleSearch = () => {
    emit('search', filterState);
  };

  const handleReset = () => {
    Object.assign(filterState, {
      reportName: '',
      template: undefined,
      dateRange: null,
    });
    emit('reset', filterState);
  };

  // 禁止选择今天及之后的日期
  const disabledDate = (current) => {
    return current && current > new Date().setHours(0, 0, 0, 0);
  };

  // 首次加载时自动触发 search 事件，传递默认筛选条件
  onMounted(() => {
    handleSearch();
  });

  defineExpose({
    filterState,
    handleReset,
  });
</script>

<style scoped lang="less">
  .filter-card {
    margin-bottom: 16px;

    .reset-btn {
      margin-left: 8px;
    }

    //  这里要覆盖ant-design-vue的默认样式，否则会显示为行内块
    ::v-deep .ant-form {
      .ant-row {
        .ant-col {
          label {
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 11, 54, 0.85);
            &::after {
              content: ' ';
              margin-inline-start: 4px;
            }
          }
          .ant-form-item-control-input-content > input,
          .ant-select-selector,
          .ant-picker {
            border: 1px solid rgba(0, 11, 54, 0.12);
          }
          /* Google Chrome, Safari, Opera, 新版 Edge */
          input::-webkit-input-placeholder {
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 11, 54, 0.25);
            opacity: 1;
          }

          /* Mozilla Firefox 19+ */
          input::-moz-placeholder {
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 11, 54, 0.25);
            opacity: 1;
          }

          /* Internet Explorer 10-11, 旧版 Edge */
          input:-ms-input-placeholder {
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 11, 54, 0.25);
            opacity: 1;
          }

          /* 新版标准语法，务必放在最后 */
          input::placeholder {
            font-weight: 400;
            font-size: 14px;
            color: rgba(0, 11, 54, 0.25);
            opacity: 1;
          }
        }
      }
    }
  }
</style>
