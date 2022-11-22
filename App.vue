<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </router-view>
</template>


<style lang="scss">
  @import "scss/home";
  @import "vue-next-select/dist/index.min.css";
</style>
