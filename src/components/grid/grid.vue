<template>
  <div>
    <div v-if="name">
      <icon :name="name" class="icon"></icon>
    </div>
    <div v-else>
      <slot></slot>
    </div>
    <p>{{desc}}</p>
  </div>
</template>
<script>
  import icon from '../icon/icon'
  export default{
    name: 'grid',
    components: {
      icon
    },
    props:['name', 'desc'],
    data(){
      return {}
    },
  }
</script>
<style scoped>
  .icon{
    font-size: 3.5em;
  }
</style>
