
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        ...savedPosition,
        behavior: to.meta.scrollBehavior === 'smooth' ? 'smooth' : 'auto',
      }
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: to.meta.scrollBehavior === 'smooth' ? 'smooth' : 'auto',
      }
    }

    return {
      top: 0,
      left: 0,
      behavior: to.meta.scrollBehavior === 'smooth' ? 'smooth' : 'auto',
    }
  }
}