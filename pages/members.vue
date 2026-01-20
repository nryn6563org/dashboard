<template>
  <div class="members-container members-page">
    <div class="members-header">
      <div>
        <h1 class="members-title">멤버 관리</h1>
        <p class="members-subtitle">조직 멤버를 조회하고 관리합니다.</p>
      </div>
      
      <button 
        @click="showForm = true"
        class="btn-register-member"
      >
        <i-plus :size="20" />
        <span>멤버 등록</span>
      </button>
    </div>

    <!-- Member Table -->
    <div class="table-container">
      <table class="members-table">
        <thead>
          <tr class="table-head-row">
            <th class="table-th text-left">ID</th>
            <th class="table-th text-left">이름</th>
            <th class="table-th text-left">이메일</th>
            <th class="table-th text-left">가입일</th>
            <th class="table-th text-right">관리</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
          <tr v-for="member in members" :key="member.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
            <td class="table-td table-td-id">#{{ member.id }}</td>
            <td class="table-td">
              <div class="table-td-name-cell">
                <div class="avatar-placeholder">
                  <i-user :size="16" />
                </div>
                <span class="member-name">{{ member.name }}</span>
              </div>
            </td>
            <td class="table-td table-td-text">{{ member.email }}</td>
            <td class="table-td table-td-text">{{ member.date }}</td>
            <td class="table-td text-right">
              <button class="action-btn">
                <i-more-vertical :size="18" />
              </button>
            </td>
          </tr>
          <tr v-if="members.length === 0">
            <td colspan="5" class="empty-state-td">
              멤버가 없습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Registration Modal -->
    <transition name="modal">
      <div v-if="showForm" class="modal-overlay">
        <div class="modal-backdrop" @click="showForm = false"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">신규 멤버 등록</h2>
            <button @click="showForm = false" class="modal-close-btn">
              <i-x :size="20" />
            </button>
          </div>
          
          <form @submit.prevent="submitForm" class="modal-form">
            <div>
              <label class="input-label">성명</label>
              <input 
                v-model="form.name"
                required
                type="text" 
                placeholder="예: 홍길동"
                class="input-field"
              >
            </div>
            <div>
              <label class="input-label">이메일 주소</label>
              <input 
                v-model="form.email"
                required
                type="email" 
                placeholder="example@email.com"
                class="input-field"
              >
            </div>
            
            <div class="pt-4">
              <button 
                type="submit"
                class="btn-submit"
              >
                지금 등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      form: {
        name: '',
        email: ''
      }
    }
  },
  computed: {
    members() {
      return this.$store.state.members
    }
  },
  methods: {
    submitForm() {
      this.$store.commit('ADD_MEMBER', { ...this.form })
      this.form.name = ''
      this.form.email = ''
      this.showForm = false
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/members.css';

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
</style>
