<template>
    <AMenu v-bind="$attrs" v-on="$listeners">
        <template v-for="(item,index) in menuData">
            <AMenuItem v-if="!item.children" :key="item.name||index">
                <AIcon type="user" />
                <span>{{item.meta.title}}</span>
            </AMenuItem> 
            <ASubMenu v-else :key="item.name||index">
                <span slot="title">
                    <a-icon type="user" />
                    <span>{{item.meta.title}}</span>
                </span>
                <template v-for="(item1,index1) in item.children">
                    <AMenuItem v-if="!item1.children" :key="item1.name||index1">
                        <AIcon type="user" />
                        <span>{{item.meta.title}}</span>
                    </AMenuItem> 
                    <ASubMenu v-else :key="item1.name||index1">
                        <span slot="title">
                            <a-icon type="user" />
                            <span>{{item.meta.title}}</span>
                        </span>
                        <AMenuItem v-for="item2 in item1.children" :key="item2.name">{{item2.meta.title}}</AMenuItem>
                    </ASubMenu>
                </template>
            </ASubMenu>
        </template>

    </AMenu>
</template>

<script>
export default {
    props:{
        menuData:{
            type:Array,
            default:()=>[]
        }
    }
}
</script>

<style>

</style>