<template>
    <div style="color:red;">
        首页
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
            
            };
        },
        created() {
            var url="http://localhost:3000/login"       
            axios.post(url,{username:'superman',password:'123456789'})
                .then(function (response) {
                    console.log(response);       
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
</script>

<style>

</style>