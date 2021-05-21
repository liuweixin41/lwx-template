/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const enterpriseRouter = {
  path: '/enterprise',
  component: Layout,
  redirect: 'noredirect',
  name: 'Enterprise',
  alwaysShow: true,
  meta: {
    title: '单位管理',
    icon: 'enterprise'
  },
  children: [
    {
      path: '/enterprise/account',
      component: () => import('@/views/enterprise/entAccount'),
      name: 'EnterpriseAccount',
      meta: { title: '单位账号', icon: '' }
    }
  ]
}

export default enterpriseRouter
