export const COLORS = {
    TRANSPARENT: 'rgba(0,0,0,0)'
}

export const Basemaps = [
    {
        name: 'ArcGIS_Blue', thumb: require('../assets/maps/ArcGIS_Blue.png'),
        urls: ["https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"]
    },
    {
        name: 'ArcGIS_White', thumb: require('../assets/maps/ArcGIS_White.png'),
        urls: ["https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}"]
    },
    {
        name: 'ArcGIS_Warm', thumb: require('../assets/maps/ArcGIS_Warm.jpg'),
        urls: ["https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}"]
    },
    {
        name: 'ArcGIS_Imagery', thumb: require('../assets/maps/ArcGIS_Imagery.jpg'),
        urls: ["https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"]
    },
    {
        name: 'ArcGIS_Color', thumb: require('../assets/maps/ArcGIS_Color.jpg'),
        urls: ["https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"]
    },
    {
        name: 'Cartodb', thumb: require('../assets/maps/ArcGIS_Blue.png'),
        urls: ["https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
            "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        ]
    },
    {
        name: 'CartodbLight', thumb: require('../assets/maps/ArcGIS_Blue.png'),
        urls: ["https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
            "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        ]
    },
    {
        name: 'GaoDe_White', thumb: require('../assets/maps/GaoDe_White.png'),
        urls: ["http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            "http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"]
    },
    {
        name: 'GaoDe_Imagery', thumb: require('../assets/maps/ArcGIS_Imagery.jpg'),
        urls: [
            "http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            "http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            "http://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
            "http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"]
    },
    // {
    //     name: 'OSM_Gray', thumb: require('../assets/maps/ArcGIS_White.png'),
    //     urls: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //         "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //         "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",]
    // },
    // {
    //     name: 'OSM_White', thumb: require('../assets/maps/ArcGIS_White.png'),
    //     urls: ["https://tile.osm.ch/switzerland/{z}/{x}/{y}.png"]
    // },
]
