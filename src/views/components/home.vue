<!--首页-->
<template>
    <div>
        {{aa}}
        <input type="button" style="width:20px;height: 10px;background: aquamarine" @click="d">
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
                aa: 100,

            }

        },
        methods:{
            d() {
                this.aa += 20
            },

        },
        watch: {
            aa(value) {
                console.log(value)
                if (value > 200) {
                    console.log(this.$store.state.token)
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">

</style>