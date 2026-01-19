<template>
  <div id="wrap">
    <DefaultHeader />
    <Nuxt />
  </div>
</template>

<script>
import DefaultHeader from '~/components/DefaultHeader.vue'

export default {
  components: {
    DefaultHeader
  }
}
</script>
<style scoped>
  #wrap{
    @apply w-full h-full
  }
</style>