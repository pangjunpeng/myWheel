<template>
  <div>
    <i :class="`iconfont icon-${name}`"></i>
  </div>
</template>
<script>
  export default{
    name: 'icon',
    props: ['name'],
  }
</script>
<style scoped>
  .iconfont{
    font-size: 1em;
  }
</style>
