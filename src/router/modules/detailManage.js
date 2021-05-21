import Layout from '@/views/layout/Layout'

const detailManageRouter = {
  path: '/detailManage',
  component: Layout,
  redirect: 'noredirect',
  name: 'DetailManage',
  meta: {
    title: '明细管理',
    icon: 'clipboard'
  },
  children: [
    {
      path: '/detailManage/credit',
      component: () => import('@/views/detail-manage/credit'),
      name: 'DataManageCredit',
      meta: { title: '页面信用查询明细', icon: '' }
    },
    {
      path: '/detailManage/apiCall',
      component: () => import('@/views/detail-manage/apiCall'),
      name: 'DataManageApiCall',
      meta: { title: '内部API调用明细', icon: '' }
      // children: [
      //   {
      //     path: '/detailManage/apiCall/apiCallDetail',
      //     component: () => import('@/views/detail-manage/components/ApiCallDetail'),
      //     name: 'ApiCallDetail',
      //     hidden: true,
      //     meta: { title: '查看详情', icon: '' }
      //   }
      // ]
    },
    {
      path: '/detailManage/queryFailDetail',
      component: () => import('@/views/detail-manage/queryFailDetail'),
      name: 'FailDetail',
      meta: { title: '外部API调用明细', icon: '' }
    }
    // {
    //   path: '/apimanage/detail',
    //   component: () => import('@/views/api-management/detail'),
    //   name: 'detail',
    //   meta: { title: 'API调用明细', icon: '' }
    // }
  ]
}

export default detailManageRouter
