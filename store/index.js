export const state = () => ({
  isLnbOpen: true,
  activeDrawer: null, // 'widget' | 'settings' | null
  isEditMode: false,
  isLoggedIn: false,
  theme: "light", // 'light' | 'dark' | 'system'
  widgets: [
    { i: "1", x: 0, y: 0, w: 3, h: 1, title: "KOSPI", type: "market-kospi" },
    { i: "2", x: 3, y: 0, w: 3, h: 1, title: "AUM", type: "crm-aum" },
    { i: "3", x: 6, y: 0, w: 3, h: 1, title: "AI 이슈 버블", type: "ai-bubble" }
  ],
  availableWidgets: [
    {
      category: "시장지수",
      subCategories: [
        {
          name: "국내지수",
          items: [
            { type: "market-kospi", title: "KOSPI", w: 3, h: 1, icon: "trending-up" },
            { type: "market-kosdaq", title: "KOSDAQ", w: 3, h: 1, icon: "trending-up" }
          ]
        },
        {
          name: "해외지수",
          items: [
            { type: "market-nasdaq", title: "NASDAQ", w: 3, h: 1, icon: "trending-up" },
            { type: "market-snp", title: "S&P 500", w: 3, h: 1, icon: "trending-up" }
          ]
        }
      ]
    },
    {
      category: "환율/원자재",
      subCategories: [
        {
          name: "주요환율",
          items: [
            { type: "fx-usd", title: "USD/KRW", w: 3, h: 1, icon: "dollar-sign" },
            { type: "fx-jpy", title: "JPY/KRW", w: 3, h: 1, icon: "dollar-sign" }
          ]
        },
        {
          name: "에너지/금속",
          items: [
            { type: "commodity-wti", title: "WTI", w: 3, h: 1, icon: "droplet" },
            { type: "commodity-gold", title: "GOLD", w: 3, h: 1, icon: "coins" }
          ]
        }
      ]
    },
    {
      category: "가상자산",
      subCategories: [
        {
          name: "메이저 코인",
          items: [
            { type: "crypto-btc", title: "BTC", w: 3, h: 1, icon: "bitcoin" },
            { type: "crypto-eth", title: "ETH", w: 3, h: 1, icon: "bitcoin" }
          ]
        }
      ]
    },
    {
      category: "고객/뉴스",
      subCategories: [
        {
          name: "통계",
          items: [
            { type: "crm-count", title: "고객수", w: 3, h: 1, icon: "users" },
            { type: "crm-aum", title: "AUM", w: 3, h: 1, icon: "pie-chart" }
          ]
        },
        {
          name: "정보",
          items: [
            { type: "news-market", title: "시장 뉴스", w: 3, h: 1, icon: "newspaper" },
            { type: "ai-bubble", title: "AI 이슈 버블", w: 3, h: 1, icon: "circle" }
          ]
        }
      ]
    }
  ],
  members: [
    { id: 1, name: "John Doe", email: "john@example.com", date: "2026-01-20" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", date: "2026-01-19" }
  ],
  menuItems: [
    { name: "대시보드", path: "/", icon: "layout-dashboard" },
    { name: "고객관리", path: "/customers", icon: "users" },
    { name: "시장지수", path: "/market-indices", icon: "trending-up" },
    {
      name: "투자정보",
      path: "/investment-info",
      icon: "briefcase",
      children: [
        {
          name: "마켓정보",
          icon: "database",
          children: [
            { name: "오늘의 이슈", path: "/investment-info/market/today-issue", icon: "activity" },
            { name: "시세분석", path: "/investment-info/market/price-analysis", icon: "trending-up" },
            { name: "수급분석", path: "/investment-info/market/supply-analysis", icon: "bar-chart-2" },
            { name: "테마/업종", path: "/investment-info/market/theme-sector", icon: "grid" },
            { name: "리포트 분석", path: "/investment-info/market/report-analysis", icon: "file-text" },
            { name: "공시분석", path: "/investment-info/market/disclosure-analysis", icon: "search" }
          ]
        },
        {
          name: "AI추천종목",
          icon: "zap",
          children: [
            { name: "오늘의종목Pick", path: "/investment-info/ai-picks/today-pick", icon: "check-circle" },
            { name: "오늘의 종목 일별보기", path: "/investment-info/ai-picks/daily-view", icon: "calendar" },
            { name: "추천종목", path: "/investment-info/ai-picks/recommended", icon: "star" },
            { name: "추천종목수익률", path: "/investment-info/ai-picks/returns", icon: "percent" }
          ]
        }
      ]
    },
    { name: "AI매매시그널", path: "/ai-signals", icon: "signal" },
    { name: "AI챗봇", path: "/ai-chatbot", icon: "message-square" }
  ]
});

export const mutations = {
  TOGGLE_LNB(state) {
    state.isLnbOpen = !state.isLnbOpen;
  },
  LOGIN(state) {
    state.isLoggedIn = true;
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
  },
  SET_DRAWER(state, drawer) {
    if (state.activeDrawer === drawer) {
      state.activeDrawer = null;
    } else {
      state.activeDrawer = drawer;
    }
  },
  CLOSE_DRAWER(state) {
    state.activeDrawer = null;
  },
  TOGGLE_EDIT_MODE(state) {
    state.isEditMode = !state.isEditMode;
  },
  SET_EDIT_MODE(state, value) {
    state.isEditMode = value;
  },
  SET_THEME(state, theme) {
    state.theme = theme;
  },
  ADD_WIDGET(state, widget) {
    const exists = state.widgets.find((w) => w.type === widget.type);
    if (!exists) {
      state.widgets.push(widget);
    }
  },
  UPDATE_WIDGETS(state, widgets) {
    state.widgets = widgets;
  },
  UPDATE_WIDGET_TITLE(state, { id, title }) {
    const widget = state.widgets.find((w) => w.i === id);
    if (widget) {
      widget.title = title;
    }
  },
  REMOVE_WIDGET(state, id) {
    state.widgets = state.widgets.filter((w) => w.i !== id);
  },
  ADD_MEMBER(state, member) {
    state.members.push({
      id: state.members.length + 1,
      ...member,
      date: new Date().toISOString().split("T")[0]
    });
  },
  ADD_MENU_ITEM(state, item) {
    state.menuItems.push(item);
  },
  REMOVE_MENU_ITEM(state, path) {
    state.menuItems = state.menuItems.filter((item) => item.path !== path);
  }
};

export const actions = {
  async fetchWidgets({ commit }) {
    try {
      const { data } = await this.$api.get("/widgets");
      if (data && data.length > 0) {
        commit("UPDATE_WIDGETS", data);
      }
    } catch (err) {
      console.error("Failed to fetch widgets:", err);
    }
  },
  async saveWidgets({ state }) {
    try {
      await this.$api.post("/widgets/sync", { widgets: state.widgets });
    } catch (err) {
      console.error("Failed to save widgets:", err);
    }
  }
};

