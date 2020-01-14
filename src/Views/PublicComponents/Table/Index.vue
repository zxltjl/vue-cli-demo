<template>
    <div>
        <a-button type="primary" @click="addUser" class="alert-info">
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
            :data="data" 
            :page-params="params"
            @updateData="load"
        >
            <template #age="{value}">
                <span style="color:red;font-size:24px;">{{ value }}</span>
            </template>
            <template #action="text">
                <a-button type="primary" style="margin-right:20px;">编辑</a-button>
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
    import {userList,delUser,addUser} from '@/api/user';
    export default {
        data() {
            return {    
                columns,
                data:{},
                selectedKeys:[],
                params:{
                    page:1,
                    pageSize:10,
                    name:'dasd'
                },
                form:this.$form.createForm(this),
                visible:false,
                formLayout:{
                    labelCol:{span:5},
                    wrapperCol:{span:12},
                }
            };
        },
        created() {
            this.setRules()
            this.load();
        },
        mounted(){
            
        },
        methods:{
            load(val) {
                userList(val ? val : this.params).then(res=>{
                    this.data = res;
                });
            },
            del(id){
                delUser(id).then(()=>{
                    this.$message.success('删除成功')
                    this.load(this.params)
                }).catch(err=>{
                    if(err){
                        this.$message.error('删除失败')
                    }
                })
            },
            addUser(){
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
                        addUser(values).then(()=>{
                            this.$message.success('新增成功');
                            this.load(this.params)
                        }).catch(err=>{
                            if(err){
                                this.$message.error('新增失败')
                            }
                        })
                    }
                })
            }
            
        }
    };
</script>

<style lang="less" scoped>
    .alert-info{
        margin-bottom:10px;
    }
</style>