import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Max wait for a lazy page (and the page transition) before giving up on a #hash
const HASH_RETRIES = 40
const RETRY_MS = 50

/**
 * On navigation: scrolls to the #hash target if there is one,
 * otherwise to the top of the page.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    // The target may not exist yet (lazy route, exit animation): retry briefly
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let timer
    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
      else if (tries++ < HASH_RETRIES) timer = setTimeout(scrollToTarget, RETRY_MS)
    }
    scrollToTarget()
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}
