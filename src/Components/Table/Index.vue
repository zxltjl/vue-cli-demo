<template>
    <div>
        <a-button v-if="isExport" type="primary" @click="ex" style="margin-bottom:10px;">导出</a-button>
        <a-table 
            :row-key="record=>record.id"
            :columns="slotColumns"
            :data-source="dataSource"
            :bordered="isBordered"
            :pagination="pagination"
            :row-selection="selectedKeys?rowSelection:null"
            :loading="loading"
            @change="change"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <template
                v-for="column in slotColumns"
                #[column.scopedSlots.customRender]="text, record, index"
            >
                <slot
                    :name="column.scopedSlots.customRender"
                    v-bind="{ row: record, column, index, value: text }"
                >
                    <span :key="column.dataIndex + index" class="table-cell">{{ text }}</span>
                </slot>
            </template>
        </a-table>
    </div>
</template>

<script>
    import ExportExcel from './xlsx';
    //给每个column添加scopedSlots
    const proxyColumns = (columns,isNumber)=>{
        const _columns = columns.map(item => ({
            key: item.scopedSlots ? (item.key || item.dataIndex) : warn(item.key || item.dataIndex),
            fixed: item.fixed || false,
            dataIndex: item.dataIndex || item.key,
            scopedSlots: { customRender: item.dataIndex || item.key },
            ...item
        }));
        //第一列加入序号
        if(isNumber){
            _columns.unshift({
                title:'序号',
                key:'index',
                dataIndex:'index',
                align:'center',
                width:64,
                scopedSlots:{
                    customRender:'index'
                }
            });
        }
        return _columns;
    };
    const disabled_key = ['index','title'];
    const warn = key=>{
        if (disabled_key.includes(key)) {
            console.error(key + 'is disabled，Please change to other');
        }
    };
    export default {
        props:{
            //表格title
            columns:{
                type:Array,
                default:()=>[],
                require:true
            },
            //promise对象
            data:{
                type:Function,
                require:true,
            },
            //表格是否有边框
            isBordered:{
                type:Boolean,
                default:false
            },
            //是否有序号
            isNumber:{
                type:Boolean,
                default:false
            },
            //手动分页page
            page:{
                type:[Number,String],
                default:1||'1'
            },
            //手动分页pageSize
            pageSize:{
                type:[Number,String],
                default:10||'10'
            },
            //勾选的数据
            selectedKeys:{
                type:[Boolean,Array],
                default:()=>false
            },
            //异步刷新
            isReload:{
                type:Boolean,
                default:false
            },
            //是否手动导出
            isExport:{
                type:Boolean,
                default:false
            },
            //自定义修改数据需要
            handlerData:{
                type:Function,
            }
        },
        data() {
            return {
                //分页
                loading:false,
                pagination:{
                    current:1,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    showTotal:total=>'共' + total + '条',
                    total:0,
                    pageSizeOptions:['10','30','60','100'],
                },
                selectedRowKeys:[],//勾选的数组
                dataSource:[],//表格数据源
            };
        },
        computed:{
            //插槽
            slotColumns() {
                return proxyColumns(this.columns,this.isNumber);
            },
            //勾选数据扩展功能
            rowSelection:{
                get:all=>({
                    selectedRowKeys:all.selectedRowKeys,
                    onChange: all.onSelectChange,
                    hideDefaultSelections: true,
                    //扩展勾选的方法
                    selections: [
                        {
                            key: 'all-data',
                            text: '全选',
                            onSelect: val => {
                                all.onSelectChange(val)
                            },
                        },
                        {
                            key: 'reverse-data',
                            text: '反选',
                            onSelect: val => {
                                let newRowKeys = [];
                                newRowKeys = val.filter(item=>!all.selectedRowKeys.includes(item));
                                all.onSelectChange(newRowKeys)
                            },
                        },
                        {
                            key: 'odd-data',
                            text: '奇数行',
                            onSelect: val => {
                                let newRowKeys = [];
                                newRowKeys = val.filter((key, index) => {
                                    if (index % 2 !== 0) {
                                        return false;
                                    }
                                    return true;
                                });
                                all.onSelectChange(newRowKeys)
                            },
                        },
                        {
                            key: 'even-data',
                            text: '偶数行',
                            onSelect: val => {
                                let newRowKeys = [];
                                newRowKeys = val.filter((key, index) => {
                                    if (index % 2 === 0) {
                                        return false;
                                    }
                                    return true;
                                });
                                all.onSelectChange(newRowKeys)
                            },
                        },
                    ],
                }),
            },
        },
        watch:{
            pageNum(val){
                Object.assign(this.pagination,{page:val})
            },
            pageSize(val){
                Object.assign(this.pagination,{pageSize:val})
            },
            isReload(val){
                if(val){
                    this.loadData();
                    this.$emit('update:isReload',false)
                }
            }
        },
        created() {
        },
        mounted(){
            this.loadData()
        },
        methods:{
            loadData(){
                this.loading = true;
                let params={
                    page:this.pagination.page||this.pagination.current||this.page||1,
                    pageSize:this.pagination.pageSize||this.pageSize||10
                }
                const load_fun = this.data(params);
                if(typeof load_fun !== 'object'){
                    this.loading = false;
                    this.dataSource = [];
                    return;
                }
                load_fun.then(res=>{
                    this.loading = false;
                    if(res.data.length===0&&res.meta.total!==0){
                        this.pagination.current--;
                        this.pagination.page--;
                        this.loadData()
                    }
                    this.pagination.total = res.meta.total;
                    res.data.forEach((item,index) => {
                        item.index = (index + 1) + (params.page - 1) * params.pageSize;
                    });
                    if(typeof this.handlerData==='function'){
                        this.dataSource = this.handlerData(res.data)
                    }else{
                        this.dataSource = res.data;
                    }
                }).catch(err=>{
                    if(err){
                        this.dataSource = [];
                        if(err==='请求超时'){
                            this.$message.error(err)
                        }
                        this.loading = false;
                    }
                })
            },
            //页码改变的回调
            change(page) {
                this.pagination.current = page.current;
                this.pagination.pageSize = page.pageSize;
                this.pagination.page = page.current;
                this.loadData()
            },
            //勾选函数
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
                //异步更新数据
                this.$emit('update:selectedKeys',this.selectedRowKeys)
            },
            //前端导出表格数据xlxs
            ex(){
                let arr = this.dataSource.filter(item=>this.selectedRowKeys.includes(item.id));
                let _columns = this.columns.filter(item=>item.title!='操作')
                if(arr.length===0){
                    this.$message.warning('请勾选需要导出的选项');
                    return;
                }
                ExportExcel(_columns, arr, `${new Date().getTime().toString()}_导出.xlsx`);
            }
        }
    };
</script>

<style>

</style>