<template>
  <div class="container">
    <div class="payway">收款方式：</div>
    <div class="downmenu">
      <div
        class="show"
        @click="show=!show">
        <img :src="selectData[menueIndex].logo">
        {{ selectData[menueIndex].bankName }}
      </div>
      <div
        v-show="show"
        class="showList">
        <ul>
          <li
            v-for="(item, index) in selectData"
            :key="index"
            @click="selectMenu(index)">
            <img :src="item.logo">
            {{ item.bankName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'Select',
    props: {
      selectData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        menueIndex: 0,
        show: false
      }
    },
    methods: {
      selectMenu(index) {
        this.menueIndex = index
        this.show = false
        this.$emit('selectInfo', this.selectData[index])
        console.log(`卡号是${this.selectData[index].acNo}`)
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
  .container {
    display: flex;
    border: 1px solid #ccc;
  }
  .payway {
    flex: 2;
  }
  .downmenu {
    flex: 5;
    border: none;
    position: relative;
    .show {
      height: 30px;
      line-height: 30px;
      cursor: default;
      position: relative;
      padding-right: 10px;
      background: url("img/arrow.png") no-repeat;
      background-size: 15px;
      background-position: right 6px;
    }
    .showList {
      position: absolute;
      top: 30px;
      left: 0;
      width: 100%;
      border: 1px solid #ccc;
      ul > li {
        height: 30px;
        line-height: 30px;
        cursor: default;
        border-bottom: 1px solid #ccc;
        &:hover {
          background-color: #333;
          color: #fff;
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
</style>
