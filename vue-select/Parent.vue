<template>
  <div>
    <v-select :select-data="selectData" @selectInfo="getSelectInfo"/>
  </div>
</template>
<script>
  import Select from './Select.vue'
  export default{
    name: 'Parent',
    components: {
      'v-select': Select
    },
    data() {
      return {
        bankLists: [{
          'branchId'  : '48484848448',
          'bankName'  : '招商银行',
          'acNo'      : '6225768639338661',
          'phoneNo'   : '15811251758',
          'bankactype': 'PEBC',
          'bankId'    : '3081000',
          'acseq'     : 11594
        }, {
          'branchId'  : '308100005133',
          'bankName'  : '建设银行',
          'acNo'      : '6225768639338662',
          'phoneNo'   : '15811251758',
          'bankactype': 'PEBC',
          'bankId'    : '3081000',
          'acseq'     : 11594
        }, {
          'branchId'  : '105100001036',
          'bankName'  : '工商银行',
          'acNo'      : '6225768639338663',
          'phoneNo'   : '15811251758',
          'bankactype': 'PEBC',
          'bankId'    : '3081000',
          'acseq'     : 11594
        }]
      }
    },
    computed  : {
      selectData() {
        for (let i of this.bankLists) {
          i.logo = require('./img/' + i.branchId + '.png')
        }
        return this.bankLists
      }
    },
    methods: {
      getSelectInfo(data){
        console.log(`卡号是${data.acNo}`)
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">

</style>
