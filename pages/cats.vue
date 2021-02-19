<template>
  <div>
    <h1>Cats</h1>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="cats"
      @click:row="catHandler"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:item.avatar="{ item }">
        <div v-if="item.url">
          <div
            class="cat-avatar"
            :style="`background-image: url(${item.url})`"
          ></div>
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cat Profile</span>
        </v-card-title>
        <v-card-text>
          <div v-if="cat.url" class="text-center">
            <a :href="cat.url" download title="click for a purrfect view"
              ><img width="150" height="auto" :src="cat.url"
            /></a>
            <h4>{{ cat.id }}</h4>
          </div>
          <div v-if="catBreed"><strong>Breed:</strong> {{ catBreed }}</div>
          <div v-if="catDescription">
            <strong>Description:</strong> {{ catDescription }}
          </div>
          <div v-if="catReadMore">
            <a :href="catReadMore" target="_blank">Read more on Wikipedia</a>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  data() {
    return {
      cats: [],
      cat: {},
      dialog: false,
    }
  },
  computed: {
    headers() {
      return [
        { text: '', value: 'avatar' },
        { text: 'id', value: 'id' },
      ]
    },
    catBreed() {
      return _.get(this.cat, 'breeds[0].name', false) // todo check existence of one breed then rather loop through all breeds in template.
    },
    catDescription() {
      return _.get(this.cat, 'breeds[0].description', false)
    },
    catReadMore() {
      return _.get(this.cat, 'breeds[0].wikipedia', false)
    },
  },
  async beforeMount() {
    this.cats = _.get(this, '$store.state.cats.cats', []) // cached cats or empty array
    this.cats = await this.$store.dispatch('cats/getCats') // fresh cats coming up
  },
  methods: {
    catHandler(cat) {
      this.cat = cat
      this.dialog = true
    },
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.rounded-full {
  border-radius: 100%;
  overflow: hidden;
}
.cat-avatar {
  width: 50px;
  height: 50px;
  background: none center center no-repeat;
  background-size: cover;
  border-radius: 100%;
  overflow: hidden;
}
</style>
