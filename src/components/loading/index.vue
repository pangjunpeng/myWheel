<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
  export default{
    name: 'loading',
    data(){
      return {}
    },
  }
</script>
<style scoped type="text/less" lang="less">
  .loading{
    width: 10px;
    height: 10px;
    font-size: 0;
    transform: rotate(45deg);
    span{
      display: inline-block;
      width: 50%;
      height: 50%;
      background: #888;
      transform-origin: center center;
      &:first-child{
        animation: top 1.2s infinite linear;
      }
      &:nth-of-type(2){
        animation: right 1.2s infinite linear;
      }
      &:nth-of-type(3) {
        animation: left 1.2s infinite linear;
      }
      &:nth-of-type(4) {
        animation: bottom 1.2s infinite linear;
      }
    }
  }
  @keyframes top {
    0%{
      transform: translateY(0) rotate(0deg);
    }
    50%{
      transform: translate(-60%, -60%) rotate(90deg);
    }
    100%{
      transform: translateY(0) rotate(180deg);
    }
  }

  @keyframes bottom {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translate(60%, 60%) rotate(90deg);
    }
    100% {
      transform: translateY(0) rotate(180deg);
    }
  }

  @keyframes left {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translate(-60%, 60%) rotate(90deg);
    }
    100% {
      transform: translateY(0) rotate(180deg);
    }
  }

  @keyframes right {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translate(60%, -60%) rotate(90deg);
    }
    100% {
      transform: translateY(0) rotate(180deg);
    }
  }
</style>
