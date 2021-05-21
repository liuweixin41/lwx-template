/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noredirect',
  name: 'System',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'system'
  }
}

export default systemRouter
