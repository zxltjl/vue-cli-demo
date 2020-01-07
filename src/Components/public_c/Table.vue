<template>
    <div>
        <a-table 
            :row-key="record=>record.id"
            :columns="slotColumns"
            :data-source="data.data"
            :bordered="isBordered"
            :position="position"
            :row-selection="rowSelection"
            :loading="loading"
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
    const proxyColumns = (columns)=>{
        const _columns = columns.map(item => ({
            key: item.scopedSlots ? (item.key || item.dataIndex) : warn(item.key || item.dataIndex),
            fixed: item.fixed || false,
            dataIndex: item.dataIndex || item.key,
            scopedSlots: { customRender: item.dataIndex || item.key },
            ...item
        }));
        _columns.unshift({
            title:"序号",
            key:'index',
            dataIndex:'index',
            scopedSlots:{
                customRender:'index'
            }
        })
        return _columns;
    }
    const disabled_key = ['index','title'];
    const warn = (key)=>{
        if(disabled_key.includes(key)){
            console.error(key+"is disabled，Please change to other")
        }
    }
    export default {
        props:{
            columns:{
                type:Array,
                default:()=>[],
                require:true
            },
            data:{
                type:Object,
                default:()=>{}
            },
            isBordered:{
                type:Boolean,
                default:false
            },
        },
        data(){
            return {
                loading:false,
                position:{
                    page:1,
                    pageSize:10,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    showTotal:(total,range)=>{
                        return "共"+total+"页"+range
                    },
                    total:this.data.meta.total,
                    pageSizeOptions:['10','30','60','100']
                },
                selectedRowKeys:[],
            }
        },
        watch:{

        },
        computed:{
            slotColumns(){
                return proxyColumns(this.columns)
            },
            rowSelection:{
                get:(all)=>{
                    return {
                        selectedRowKeys:all.selectedRowKeys,
                        onChange: all.onSelectChange,
                        hideDefaultSelections: true,
                        //扩展勾选的方法
                        selections: [
                            {
                                key: 'all-data',
                                text: '全选',
                                onSelect: (val) => {
                                    all.selectedRowKeys = val
                                },
                            },
                            {
                                key: 'reverse-data',
                                text: '反选',
                                onSelect: (val) => {
                                    let newRowKeys = [];
                                    newRowKeys = val.filter(item=>!all.selectedRowKeys.includes(item))
                                    all.selectedRowKeys = newRowKeys;
                                },
                            },
                            {
                                key: 'odd-data',
                                text: '奇数行',
                                onSelect: (val) => {
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
                                onSelect: (val) => {
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
                    };
                },
            },
        },
        created(){
            
        },
        methods:{
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys;
            },
        }
    }
</script>

<style>

</style>