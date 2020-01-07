<template>
    <div>
        <PTable :columns="columns" is-bordered :data="data" size="small">
            <template #age="{value}">
                <span style="color:red;font-size:24px;">{{ value }}</span>
            </template>
        </PTable>
    </div>
</template>

<script>    
    import {columns} from './cloumns'
    export default {
        data(){
            return {    
                columns,
                data:{
                    meta:{
                        total:33,
                    },
                    data:[]
                }
            }
        },
        created(){
            for(let i =0;i<33;i++){
                let obj = {id:i+1,name:'张三'+(i+1),age:11,six:'男'};
                this.data.data.push(obj)
            }
        }
    }
</script>

<style>

</style>