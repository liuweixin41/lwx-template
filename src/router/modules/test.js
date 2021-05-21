/** When your routing test is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const testRouter = {
  path: '/test',
  component: Layout,
  name: 'Test',
  meta: { title: '测试', icon: 'tab' },
  children: [
    {
      path: '/test/interface',
      component: () => import('@/views/tab/interface/index'),
      name: 'interface',
      meta: { title: 'Interface', icon: 'tab' }
    },
    {
      path: '/test/vuePdfSingle',
      component: () => import('@/views/tab/vuePdfSingle'),
      name: 'vuePdfSingle',
      meta: { title: 'vue-pdf单页显示', icon: 'tab' }
    },
    {
      path: '/test/vuePdfAll',
      component: () => import('@/views/tab/vuePdfAll'),
      name: 'vuePdfAll',
      meta: { title: 'vue-pdf全部显示', icon: 'tab' }
    },
    {
      path: '/test/pdfjs',
      component: () => import('@/views/tab/pdfjs-demo'),
      name: 'pdfjs-demo',
      meta: { title: 'pdfjs测试', icon: 'tab' }
    },
    {
      path: '/test/tabtest',
      component: () => import('@/views/tab/tabtest'),
      name: 'Tabtest',
      meta: { title: 'tabtest', icon: 'tab' }
    },
    {
      path: '/test/showMore',
      component: () => import('@/views/tab/showMoreTest'),
      name: 'ShowMore',
      meta: { title: 'showMore', icon: 'tab' }
    },
    {
      path: '/test/tree',
      component: () => import('@/views/tab/tree'),
      name: 'JsonTree',
      meta: { title: 'Tree', icon: 'tab' }
    },
    {
      path: '/test/elTreeStyle',
      component: () => import('@/views/tab/elTreeStyle'),
      name: 'elTreeStyle.',
      meta: { title: 'elTreeStyle.', icon: 'tab' }
    }
  ]
}
export default testRouter
