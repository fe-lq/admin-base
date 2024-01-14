import { message } from 'ant-design-vue'
import type { ObjectDirective } from 'vue'

/**
 * 拖拽指令
 * data: 列表数据
 * index: v-for遍历的索引
 */
export const vDrag: ObjectDirective<
  HTMLElement,
  { data: any[]; id: number; enableDrag?: boolean }
> & {
  activeIndex: number | undefined
  activeLevel: string | undefined
} = {
  // 当前拖拽的索引
  activeIndex: undefined,
  activeLevel: undefined,
  // 挂载时触发的函数
  mounted(el, binding) {
    el.addEventListener('dragstart', (event) => {
      el.classList.add('dragStyle')
      event.stopPropagation()
      const index = binding.value.data.findIndex((sub) => sub.id === binding.value.id)
      vDrag.activeIndex = index
      vDrag.activeLevel = el.dataset.level
    })
    el.addEventListener('dragover', (event) => {
      event.preventDefault()
    })
    el.addEventListener('dragenter', () => {
      // 在可拖动元素进入潜在的放置目标时高亮显示该目标
      el.style.opacity = '0'
    })
    el.addEventListener('dragleave', () => {
      // 在可拖动元素进入潜在的放置目标时高亮显示该目标
      el.style.opacity = 'unset'
      el.classList.remove('dragStyle')
    })
    el.addEventListener('drop', (event) => {
      event.stopPropagation()
      el.style.opacity = 'unset'

      // 如果当前有拖拽索引，则将当前拖拽索引的值移动到当前索引位置
      if (typeof vDrag.activeIndex === 'number') {
        if (vDrag.activeLevel === el.dataset.level) {
          const index = binding.value.data.findIndex((sub) => sub.id === binding.value.id)
          binding.value.data.splice(index, 0, binding.value.data.splice(vDrag.activeIndex, 1)[0])
        } else {
          message.error('拖拽层级不一致, 请拖拽同级层')
        }
      }
    })
  },
  beforeUpdate(el, binding) {
    if (binding.value.enableDrag) {
      el.draggable = true
    } else {
      el.draggable = false
    }
  },
}
