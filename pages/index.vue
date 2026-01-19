<template>
  <div id="container">
    <!-- lnb -->
     <LNB />
     <!-- content -->
  </div>
</template>
<script>
import LNB from '@/components/LNB'

export default {
  components: {
    LNB
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
  #container{
    @apply w-full h-full
  }
</style>