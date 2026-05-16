/**
 * Smooth-scrolls to the element with the given ID.
 * Uses native scrollIntoView with smooth behavior.
 * Silently no-ops if the element doesn't exist.
 *
 * @param {string} id - The element ID to scroll to (without the '#')
 */
export function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
