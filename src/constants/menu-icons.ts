import {
  GoldOutlined,
  FolderOutlined,
  FileSearchOutlined,
  DatabaseOutlined,
  LikeOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShoppingOutlined,
  HomeOutlined,
} from '@ant-design/icons-vue'
import type { FunctionalComponent } from 'vue'

interface IconOption {
  value: string
  label: string
  icon: FunctionalComponent
}

export const iconOptions: IconOption[] = [
  {
    value: 'gold',
    label: '金币',
    icon: GoldOutlined,
  },
  {
    value: 'like',
    label: '点赞',
    icon: LikeOutlined,
  },
  {
    value: 'profile',
    label: '个人中心',
    icon: ProfileOutlined,
  },
  {
    value: 'folder',
    label: '文件夹',
    icon: FolderOutlined,
  },
  {
    value: 'database',
    label: '数据库',
    icon: DatabaseOutlined,
  },
  {
    value: 'file-search',
    label: '文件搜索',
    icon: FileSearchOutlined,
  },
  {
    value: 'setting',
    label: '设置',
    icon: SettingOutlined,
  },
  {
    value: 'shopping',
    label: '购物车',
    icon: ShoppingOutlined,
  },
  {
    value: 'home',
    label: '首页',
    icon: HomeOutlined,
  },
]
