export const state = () => ({
  cats: [],
})

export const mutations = {
  set_cats(store, data) {
    store.cats = data // 😺
  },
}

export const actions = {
  async getCats({ commit, state, rootState }, data) {
    const { data: catData } = await this.$axios
      .get('/')
      .catch((e) => console.log(e))
    commit('set_cats', catData)
    return catData
  },
}
