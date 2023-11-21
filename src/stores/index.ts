import { defineStore } from 'pinia'

interface StoreState {
  count: number
  isMounted: boolean
}
export const useBaseStore = defineStore('baseStore', {
  state: (): StoreState => ({
    count: 0,
    isMounted: false,
  }),
  actions: {
    setIsMounted(isMounted: boolean) {
      this.isMounted = isMounted
    },
  },
})
