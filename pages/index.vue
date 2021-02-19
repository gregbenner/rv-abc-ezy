<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center"></div>
      <v-card>
        <h2>Loading...</h2>
        <img
          src="https://media.tenor.com/images/40e2ee288bacb782ecb04170b65b21f7/tenor.gif"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async mounted() {
    await this.$sleep(10)
    this.$router.push('/cats')
  },
}
</script>
