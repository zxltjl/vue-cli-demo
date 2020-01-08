<template>
    <div id="flame" class="login-box">
        <div class="login-content">
            <h3>{{ title }}</h3>
            <AForm :form="LoginForm" @submit.prevent="handleLogin">
                <AFormItem>
                    <AInput 
                        type="username"
                        v-decorator="getRules('username')"
                        placeholder="请输入用户名"
                    >
                        <AIcon slot="prefix" type="user" />
                    </AInput>
                </AFormItem>
                <AFormItem>
                    <AInput v-focus="focus_input" :type="showPassword?'':'password'" v-decorator="getRules('password')" placeholder="请输入密码">
                        <AIcon slot="prefix" :type="showPassword?'unlock':'lock'" />
                        <AIcon slot="suffix" type="eye" style="cursor:pointer;" @click="showPassword=!showPassword" />
                    </AInput>
                </AFormItem>
                <AFormItem class="verification-box">
                    <AInput v-decorator="getRules('verification')" placeholder="请输入验证码" />
                    <div>
                        <valid class="validCode" :value.sync="verification_code" />
                    </div>
                </AFormItem>
                <AFormItem>
                    <AButton type="primary" :loading="loading" html-type="submit" class="login-btn">
                        登录
                    </AButton>
                </AFormItem>
            </AForm>
        </div>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex';
    import {updateThemes} from './layout_c/change';
    import valid from '../public_c/verification'
    export default {    
        components:{
            valid
        },
        data(){
            return {
                title:this.$app.name,//系统名称
                LoginForm:this.$form.createForm(this),//包装组件
                focus_input:false,//密码框聚焦
                verification_code:'',//用户输入的验证码
                loading:false,//登录按钮加载
                showPassword:false,//显示密码
            }
        },
        directives : {
            focus(el, {value}) {
                if (value) {
                    const find = Array.prototype.find;
                    const targetNode = find.call(el.childNodes, node => node.localName === 'input');
                    if (targetNode) {
                        targetNode.focus();
                    }
                }
            }
        },
        computed: {
            ...mapState('app', {
                color: state => state.color,
            })
        },
        created(){
            //挂载ruleForm
            this.setRules();
            this.handleLogin = this.throttle(this.handleLogin,360)
        },
        mounted () {
            //登录页主题更改
            updateThemes(this.color);
        },
        methods:{
            ...mapActions(['user','login']),
            //登录
            handleLogin(){
                this.loading = true;
                this.LoginForm.validateFieldsAndScroll((err,values)=>{
                    if(!err){
                        setTimeout(() => {
                            delete values.verification;
                            this.login(values);
                            this.loading = false;
                            this.$router.push({name:'Index'})
                        }, 1000);
                    }else{
                        this.loading = false;
                    }
                })
            },
            //获取验证类型
            getRules(type){
                return [type,this.ruleForm[type]]
            },
            //实例化所有验证类
            setRules(){
                this.ruleForm = {
                    username: {
                        initialValue: 'admin',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的用户名!'},
                            {min: 2, message: '不少于2个字符'},
                            {max: 30, message: '不超过30个字符'},
                            // validator
                        ]
                    },
                    password:{
                        initialValue: '666666',
                        validateFirst: true,
                        normalize: value => value ? value.toString().trim() : null,
                        rules: [
                            {required: true, whitespace: true, message: '请输入你的密码!'},
                            {validator:this.passwordValidator}
                        ]
                    },
                    verification:{
                        initialValue:'',
                        validateFirst:true,
                        normalize:vlaue => vlaue ? vlaue.toString().trim():null,
                        rules:[
                            {required:true,whitespace:true,message:'请输入验证码'},
                            {validator:this.verificationValidator}
                        ] 
                    }
                }
            },
            //密码验证规则
            passwordValidator(rule,value,clallback){
                const reg = /^(\w){6,20}$/;
                const new_reg = new RegExp(reg);
                if(!new_reg.test(value)){
                    clallback('密码为6-20以内的字母、数字、下划线')
                }else if(value===this.LoginForm.getFieldValue('username')){
                    this.focus_input = true;
                    clallback('用户名不能和密码重复')
                }else{
                    clallback()
                }
            },
            //验证码验证规则
            verificationValidator(rule,value,clallback){
                if(value!==this.verification_code.toLocaleLowerCase()){
                    clallback('验证码错误')
                }else{
                    clallback()
                }
            },
        }
    };
</script>

<style lang="less">
    body,html{
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
        background: black;
    }
    .login-box{
        width:100%;
        height:100%;
        background:url('../../assets/images/bg.jpg') center center;
        // background-size:100% 100%;
        position:relative;
        overflow:hidden;
    }
    .login-content{
        width:400px;
        height:auto;
        padding:20px 30px;
        border-radius:5px;
        position:absolute;
        left:50%;
        top:50%;
        margin-left:-200px;
        margin-top:-150px;
        background:rgba(22,222,221,.5);
        h3{
            color:#fff;
            text-align:center;
            font-size:30px;
        }
    }
    .login-content {
        animation: login-in .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    @keyframes login-in {
        0% {
            transform: translateX(400px);
        }
        100% {
            transform: translateX(0);
        }
    }
    .login-btn{
        width:100%;
    }
    .verification-box{
        position:relative;
    }
    .verification{
        height:32px;
        width:100px;
        background:#ccc;
        position:absolute;
        right:0;
        top:-7px;
        cursor:pointer;
    }
    .validCode{
        height:32px;
        width:80px;
        padding:0 10px;
        background:rgba(24,144,255,.2);
        position:absolute;
        right:0;
        top:-7px;
        display:inline-block;
        line-height:32px;
        cursor: pointer;
         -o-user-select: none;
        -moz-user-select: none; /*火狐 firefox*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10+*/
        -khtml-user-select :none; /*早期的浏览器*/
        user-select: none;
    }
</style>