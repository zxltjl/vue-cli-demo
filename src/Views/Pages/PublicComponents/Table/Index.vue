<template>
    <div>
        <search @reset="reset" @search="search">
            <a-form-item label="姓名">
                <a-input v-model="params.name" placeholder="请输入用户名" />
            </a-form-item>
        </search>
        <a-button type="primary" @click="addUser" class="margin">
            新增
        </a-button>
        <a-alert type="info" show-icon class="alert-info"> 
            <span slot="message">
                已选择  <span style="color: red">{{ selectedKeys.length }}</span>  项
            </span>
        </a-alert>
        <PTable 
            is-bordered 
            size="small"
            :columns="columns" 
            :selected-keys.sync="selectedKeys"
            :is-reload.sync="isReload"
            :data="loadData" 
            is-number
        >
            <template #age="{value}">
                <span style="color:red;font-size:24px;">{{ value }}</span>
            </template>
            <template #action="text">
                <a-button type="primary" class="margin" @click="edit(text.row)">编辑</a-button>
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
            destroy-on-close
            :visible="visible"
            @ok="submit"
            @cancel="visible=!visible"
        >
            <a-form :form="form" @submit="submit">
                <a-form-item label="姓名" v-bind="formLayout">
                    <a-input placeholder="请输入姓名" v-decorator="getRules('username')" />
                </a-form-item>
                <a-form-item label="电话" v-bind="formLayout">
                    <a-input placeholder="请输入电话" v-decorator="getRules('phone')" />
                </a-form-item>
                <a-form-item label="地址" v-bind="formLayout">
                    <a-input placeholder="请输入地址" v-decorator="getRules('address')" />
                </a-form-item>
                <a-form-item label="邮箱" v-bind="formLayout">
                    <a-input placeholder="请输入邮箱" v-decorator="getRules('email')" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>    
    import {columns} from './cloumns';
    import {userList,delUser,addUser,updateUser} from '@/api/user';
    export default {
        data() {
            return {    
                columns,
                isReload:false,
                selectedKeys:[],
                params:{
                    name:undefined
                },
                form:this.$form.createForm(this),
                visible:false,
                formLayout:{
                    labelCol:{span:5},
                    wrapperCol:{span:12},
                },
                methodName:undefined,
                edit_id:undefined
            };
        },
        created() {
            this.setRules()
        },
        mounted(){
            
        },
        methods:{
            loadData(params) {
                return new Promise((resolve,reject)=>{
                    userList(Object.assign(params,this.params)).then(res=>{
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                }) 
            },
            del(id){
                delUser(id).then(()=>{
                    this.$message.success('删除成功')
                    this.isReload = true;
                }).catch(err=>{
                    if(err){
                        this.$message.error('删除失败')
                    }
                })
            },
            addUser(){
                this.methodName = 'add';
                this.visible = true;
            },
            setRules(){
                this.ruleForm = {
                    username: {
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
                    address: {
                        initialValue: '',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的地址!'},
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
            getRules(type){
                return [type,this.ruleForm[type]];
            },
            submit(){
                this.form.validateFieldsAndScroll((err,values)=>{
                    if(!err){
                        if(this.methodName==='add'){
                            addUser(values).then(()=>{
                                this.$message.success('新增成功');
                                this.isReload = true;
                                this.visible = false;
                            }).catch(err=>{
                                if(err){
                                    this.$message.error('新增失败')
                                }
                            })
                        }else{
                            updateUser(this.edit_id,values).then(()=>{
                                this.$message.success('编辑成功');
                                this.isReload = true;
                                this.visible = false;
                            }).catch(err=>{
                                if(err){
                                    this.$message.error('编辑失败')
                                }
                            })
                        }
                    }
                })
            },
            edit(val){
                this.methodName = 'edit';
                this.visible = true;
                this.edit_id = val.id;
                setTimeout(() => {
                    this.form.setFieldsValue({
                        username:val.username,
                        phone:val.phone,
                        address:val.address,
                        email:val.email
                    })
                }, 0);
            },
            search(){
                this.isReload = true;
            },
            reset(){
                this.params.name = undefined;
                this.isReload = true;
            },
            
        }
    };
</script>

<style lang="less" scoped>
    .alert-info{
        margin:15px 0;
    }
    .margin{
        margin:0 10px;
    }
</style>