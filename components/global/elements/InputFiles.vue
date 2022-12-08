<template>
  <div>
    <input type="file" @change="onFileChange" />
    <div v-if="uploading">
      <div>Uploading {{ progress }}%</div>
      <progress :value="progress" max="100"></progress>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Upload',
  computed: {
    ...mapState({
      uploading: state => state.uploading,
      progress: state => state.progress
    })
  },
  methods: {
    onFileChange (e) {
      const file = e.target.files[0]
      this.$store.dispatch('updateInputText', 'products', 'current.files', e)
    }
  }
}
</script>