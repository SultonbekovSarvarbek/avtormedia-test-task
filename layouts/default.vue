<template>
  <div class="default-layout">
      <app-header/>
      <div class="page-content">
        <Nuxt/>
      </div>
      <app-footer/>
  </div>
</template>

<script>
import AppFooter from '../components/app-footer.vue'
import appHeader from '../components/app-header.vue'
export default {
  components: { appHeader, AppFooter },
}
</script>