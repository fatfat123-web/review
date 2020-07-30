<template>
    <div>
    <div>
        {{aa}}
      <input type="button" style="width:20px;height: 10px;background: aquamarine" @click="d">
    </div>

    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                aa: 100,
            }
        },
        methods: {
            d() {
               this.aa+=20
            }

        },
        mounted() {

        },
        watch:{
         aa(value){
             console.log(value)
             if (value>200){
                 alert('属猪吗')
             }
         }
        }
    }
</script>

<style scoped lang="scss">
.main{

}

</style>