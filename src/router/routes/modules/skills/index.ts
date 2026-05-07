import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const skills: AppRouteModule = {
  path: '/skills',
  name: 'Skills',
  component: LAYOUT,
  redirect: '/skills/index',
  meta: {
    orderNo: 15,
    icon: 'ion:key-outline',
    title: '组件管理',
  },
  children: [
    {
      path: 'table',
      name: '表格',
      component: () => import('@/views/skills/table/index.vue'),
      meta: {
        title: '表格',
        icon: 'simple-icons:aboutdotme',
      },
    },
  ],
};

export default skills;
