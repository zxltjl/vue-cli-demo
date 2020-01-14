<template>
    <div>
        <a-table 
            :row-key="record=>record.id"
            :columns="slotColumns"
            :data-source="data.data"
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
    const proxyColumns = columns=>{
        const _columns = columns.map(item => ({
            key: item.scopedSlots ? (item.key || item.dataIndex) : warn(item.key || item.dataIndex),
            fixed: item.fixed || false,
            dataIndex: item.dataIndex || item.key,
            scopedSlots: { customRender: item.dataIndex || item.key },
            ...item
        }));
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
            columns:{
                type:Array,
                default:()=>[],
                require:true
            },
            data:{
                type:Object,
                default:()=>({
                    meta:{total:0},
                    data:[]
                }),
                require:true,
            },
            isBordered:{
                type:Boolean,
                default:false
            },
            pageParams:{
                type:Object,
                default:()=>({page:1,pageSize:30}),
                require:true,
            },
            selectedKeys:{
                type:[Boolean,Array],
                default:()=>false
            }
        },
        data() {
            return {
                loading:false,
                pagination:{
                    current:1,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    showTotal:total=>'共' + total + '条',
                    total:0,
                    pageSizeOptions:['10','30','60','100'],
                    ...this.pageParams
                },
                selectedRowKeys:[],
            };
        },
        computed:{
            slotColumns() {
                return proxyColumns(this.columns);
            },
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
                                all.selectedRowKeys = val;
                            },
                        },
                        {
                            key: 'reverse-data',
                            text: '反选',
                            onSelect: val => {
                                let newRowKeys = [];
                                newRowKeys = val.filter(item=>!all.selectedRowKeys.includes(item));
                                all.selectedRowKeys = newRowKeys;
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
                                all.selectedRowKeys = newRowKeys;
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
                                all.selectedRowKeys = newRowKeys;
                            },
                        },
                    ],
                }),
            },
        },
        watch:{
            data:{
                handler(newVal) {
                    this.loadData(newVal);
                },
                deep:true
            },
        },
        created() {
        },
        methods:{
            async loadData(data){
                this.loading = true;
                await this.dealData(data);
                this.loading = false;

            },
            //表格数据处理
            dealData(data) {
                this.pagination.total = this.data.meta.total;
                this.data.data.forEach((item,index) => {
                    item.index = (index + 1) + (this.pagination.current - 1) * this.pagination.pageSize;
                });
                this.data = data;
            },
            //页码改变的回调
            change(page) {
                this.pagination.current = page.current;
                this.pagination.pageSize = page.pageSize;
                this.$emit('updateData',{...this.pageParams,page:page.current,pageSize:page.pageSize});
            },
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
                //异步更新数据
                this.$emit('update:selectedKeys',this.selectedRowKeys)
            },
        }
    };
</script>

<style>

</style>