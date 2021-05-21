<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import { getIsAdmin } from '@/utils/auth'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    isAdmin() {
      return (getIsAdmin() === 'true')
    }
  },
  created() {
    if (!this.isAdmin) {
      this.currentRole = 'adminDashboard'
    }
  }
}
</script>
