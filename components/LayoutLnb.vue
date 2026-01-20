<template>
  <aside id="lnb">
    <nav class="lnb-menu">
      <ul>
        <li>
          <a href="#" class="active">
            <span class="material-symbols-rounded">dashboard</span>
            <span class="menu-text">대시보드</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-rounded">movie</span>
            <span class="menu-text">호러 영상 관리</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-rounded">menu_book</span>
            <span class="menu-text">도서 소개 데이터</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="material-symbols-rounded">keyboard_voice</span>
            <span class="menu-text">AI 보이스 설정</span>
          </a>
        </li>
        <li class="divider" />
        <li>
          <a href="#">
            <span class="material-symbols-rounded">settings</span>
            <span class="menu-text">설정</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'LayoutLnb'
}
</script>

<style scoped>
  @import url('@/assets/css/lnb.css');
</style>