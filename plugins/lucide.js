import Vue from 'vue'
import { Menu, X, LayoutDashboard, Users, Settings, Plus, Sun, Moon, Monitor, User, MoreVertical, Maximize2, Check, Trash2, PieChart, Bell, Calendar, MessageSquare, Search, LineChart, Briefcase, Database, Zap, Activity, TrendingUp, BarChart2, Grid, FileText, CheckCircle, Star, Percent, Signal, ChevronDown, ChevronUp, ArrowRight } from "lucide-vue";

const icons = {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Settings,
  Plus,
  Sun,
  Moon,
  Monitor,
  User,
  MoreVertical,
  Maximize2,
  Check,
  Trash2,
  PieChart,
  Bell,
  Calendar,
  MessageSquare,
  Search,
  LineChart,
  Briefcase,
  Database,
  Zap,
  Activity,
  TrendingUp,
  BarChart2,
  Grid,
  FileText,
  CheckCircle,
  Star,
  Percent,
  Signal,
  ChevronDown,
  ChevronUp,
  ArrowRight
};

Object.entries(icons).forEach(([name, component]) => {
  Vue.component(`I${name}`, component)
})
