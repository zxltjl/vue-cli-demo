<template>
    <div>
        <div class="btn">
            <a-button type="primary" @click="addUser" class="margin">
                新增用户
            </a-button>
            <!-- <a-form layout="inline">
                <a-form-item>
                    
                </a-form-item>
            </a-form> -->
        </div>
        <PTable 
            is-bordered 
            size="small"
            :columns="columns" 
            :is-reload.sync="isReload"
            :data="loadData" 
            is-number
        >
            <template #action="text">
                <a-popconfirm 
                    title="确认删除这条信息？" 
                    ok-text="确认" 
                    cancel-text="取消"
                    @confirm="del(text.row.id)"
                >
                    <a-button type="danger">删除</a-button>
                </a-popconfirm>
            </template>
        </PTable>
        <a-modal
            title="新增用户"
            :destroy-on-close="true"
            :visible="visible"
            @ok="handleOk"
            @cancel="visible=!visible"
        >
            <a-form :form="form" @submit="handleOk">
                <a-form-item label="用户名" v-bind="layout">
                    <a-input placeholder="请输入用户名" v-decorator="getRule('username')" />
                </a-form-item>
                <a-form-item label="昵称" v-bind="layout">
                    <a-input placeholder="请输入昵称" v-decorator="getRule('nickname')" />
                </a-form-item>
                <a-form-item label="密码" v-bind="layout">
                    <a-input placeholder="请输密码" v-decorator="getRule('password')" />
                </a-form-item>
                <a-form-item label="电话" v-bind="layout">
                    <a-input placeholder="请输电话" v-decorator="getRule('phone')" />
                </a-form-item>
                <a-form-item label="邮箱" v-bind="layout">
                    <a-input placeholder="请输邮箱" v-decorator="getRule('email')" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import {columns} from './columns';
    import {getAccount,putAccount,delAccount} from '@/api/account'
    export default {
        data(){
            return {
                isReload:false,
                columns,
                visible:false,
                layout:{
                    labelCol:{span:5},
                    wrapperCol:{span:12},
                },
                form:this.$form.createForm(this)
            }
        },
        created(){
            this.setRules();
        },
        methods:{
            addUser(){
                this.visible = true;
            },
            loadData(params){
                return new Promise((resolve,reject)=>{
                    getAccount(Object.assign(params,this.params)).then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                }) 
            },
            handleOk(){
                this.form.validateFieldsAndScroll((err,values)=>{
                    if (!err){
                        putAccount(values).then(res=>{
                            this.$message.success('新增成功');
                            this.isReload = true;
                            this.visible = false;
                        })
                            .catch(err=>{
                                if(err){
                                    this.$message.error('新增失败')
                                }
                            })
                    }
                })
                // this.form.setFields({'username':{
                //     value:'',
                //     errors:[new Error('dasdas')]
                // }})
            },
            getRule(type){
                return [type,this.ruleForms[type]]
            },
            setRules(){
                this.ruleForms={
                    username:{
                        initialValue: '',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的用户名!'},
                            {min: 2, message: '不少于2个字符'},
                            {max: 30, message: '不超过30个字符'},
                        ]
                    },
                    phone: {
                        initialValue: '',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的电话!'},
                            {min: 2, message: '不少于2个字符'},
                            {max: 30, message: '不超过30个字符'},
                        ]
                    },
                    nickname: {
                        initialValue: '',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的昵称!'},
                            {min: 2, message: '不少于2个字符'},
                            {max: 30, message: '不超过30个字符'},
                        ]
                    },
                    password: {
                        initialValue: '',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的密码!'},
                            {min: 2, message: '不少于2个字符'},
                            {max: 30, message: '不超过30个字符'},
                        ]
                    },
                    email: {
                        initialValue: '',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的邮箱!'},
                            {min: 2, message: '不少于2个字符'},
                            {max: 30, message: '不超过30个字符'},
                        ]
                    },
                }
            },
            del(id){
                delAccount(id).then(res=>{
                    this.$message.success('删除成功');
                    this.isReload = true;
                })
                    .catch(err=>{
                        if(err){
                            this.$message.error('删除失败')
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .margin{
        margin:0 10px 10px 0;
    }
</style>