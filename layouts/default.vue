<template>
  <div id="dashboard-wrapper" :class="{ 'lnb-closed': !isLnbOpen }">
    <LayoutHeader :is-edit-mode="isEditMode" @toggle-lnb="isLnbOpen = !isLnbOpen"
      @toggle-edit="isEditMode = !isEditMode" />

    <div id="container">
      <LayoutLnb />
      <main id="main-content">
        <DashBoardGrid :is-edit-mode="isEditMode" />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLnbOpen: true,
      isEditMode: false
    }
  }
}
</script>