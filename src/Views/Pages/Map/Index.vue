<template>
    <div class="aMap">
        <ASpin :tip="tip" :spinning="spin">
            <div id="container"></div>
        </ASpin>
    </div>
</template>

<script>
    import mapLoader from '@/libs/aMap.js';
    export default {
        name: 'AMap',
        props: {
            // 查询参数
            params: {
                type: Object,
                default () {
                    return {};
                },
            },
        },
        data() {
            return {
                // 地图实例
                map: null,
                // 地图对象
                AMap: null,
                // 所有人员信息
                usersData: [],
                // 所有的marker
                markerData: [],
                // 用户详情
                userDetail: {},
                // 用户信息展示的信息窗体
                infoWindow: null,
                // 加载标志
                spin: false,
                // 加载提示
                tip: '',
                // 打卡中心点
                center_location:[],
                // 坐标构造
                polyline: {},
                // 轨迹坐标
                linePath: []
            };
        },
        watch: {
        },
        mounted() {
            this.initAMap();
        },
        // beforeRouteLeave (to,from,next) {
        //     // this.destroyMap();
        //     next();
        // },
        methods: {
            // 初始化地图
            initAMap () {
                [this.spin,this.tip] = [true, '地图加载中'];
                mapLoader().then(AMap=>{
                    
                    this.AMap = AMap;
                    this.map = new AMap.Map('container', {
                        center: [106.524497,29.618969],
                        zoom: 1111,
                    });
                    var toolbar = new this.AMap.ToolBar();
                    // 实例鹰眼
                    const overView = new AMap.OverView({
                        visible: true,
                    });
                    overView.open();
                    // 实例比例尺
                    const scale = new AMap.Scale({
                        visible: true,
                    });
                    // 设置中心点
                    const circle = new AMap.Circle(
                        {
                            center: new AMap.LngLat(106.524497,29.618969), // 圆心位置
                            radius: 200,  //半径
                            strokeColor: 'red',  //线颜色
                            strokeOpacity: 1,  //线透明度
                            strokeWeight: 3,  //线粗细度
                            fillColor: 'red',  //填充颜色
                            fillOpacity: 0.35, //填充透明度
                        }
                    );
                    // 标记点
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(106.524497,29.618969),   // 经纬度对象，也可以是经纬度构成的一维数组[106.524497,29.618969]
                        title: '北京'
                    });

                    // 将创建的点标记添加到已有的地图实例：
                    this.map.add(marker);
                    // 添加填充区域
                    this.map.add(circle);
                    this.map.addControl(overView);
                    this.map.addControl(toolbar);
                    this.map.addControl(scale);
                    this.map.on('complete',this.finish(AMap));

                }).catch((err)=>{
                    console.log(err)
                    this.$message.error('地图调用失败');
                    [this.spin,this.tip] = [false, ''];
                });
            },
            finish(){

                [this.spin,this.tip] = [false, '完成'];
                console.log('完成')
            },
            // 地图销毁
            destroyMap () {
                this.map && this.map.destroy();
            },
        }
    };
</script>

<style scoped lang="less">
    .aMap {
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
        min-height: 550px;
        flex: 1;
    }
    #container {
        width: 100%;
        height: 650px;
    }
</style>
