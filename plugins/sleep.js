export default ({ app }, inject) => {
  inject(
    'sleep',
    async (time) => new Promise((resolve) => setTimeout(resolve, time))
  )
}
