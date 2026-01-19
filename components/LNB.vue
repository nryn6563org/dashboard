<template>
  <div id="lnb">
    <div class="lnb-content">
      <div class="lnb-logo">
      </div>
      <div class="lnb-menu">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="lnb-toggle">
      <button>
        <span class="material-symbols-rounded">
          menu
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
#lnb {
  @apply fixed top-[80px] left-0 w-[300px] h-[calc(100%-80px)] flex
}
.lnb-content{
  @apply w-[260px] h-full border-r border-gray-200
}
.lnb-toggle{
  @apply pt-5
}
.lnb-toggle button{
  @apply border-l-0 border-[1px] border-gray-200 flex w-[30px] h-[35px] justify-center items-center rounded-[0_4px_4px_0]
}
</style>