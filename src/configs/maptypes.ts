export const Map2dTypes = {
    Grid: {id: 'grid', name: '网格图', type:'grid', thumb: require('../assets/maps/img_wanggetu.png')},
    Hexbin: {id: 'hexbin', name: '蜂窝图', thumb: require('../assets/maps/img_fengwotu.png')},
    Heatmap: {id: 'heatmap', name: '热力图', thumb: require('../assets/maps/img_relitu.png')},
    OD: {id: 'od', name: 'OD图', thumb: require('../assets/maps/img_qianxitu.png')},
    Normao: {id: 'normal', name: '单值图', thumb: require('../assets/maps/img_danzhitu.png')},
    Wms: {id: 'wms', name: '单值图', thumb: require('../assets/maps/img_danzhitu.png')},
    NormalPoint: {id: 'normalpoint', name: '普通点图', thumb: require('../assets/maps/img_size_point_color.png')},
    NormalPointWms: {id: 'normalpointwms', name: '普通点图', thumb: require('../assets/maps/img_size_point_color.png')},
    NormalLine: {id: 'normalline', name: '普通线图', thumb: require('../assets/maps/img_fenduanxuanran.png')},
    NormalLineWms: {id: 'normallinewms', name: '普通线图', thumb: require('../assets/maps/img_fenduanxuanran.png')},
    NormalPolygon: {id: 'normalpolygon', name: '普通面图', thumb: require('../assets/maps/img_fenduantianchong.png')},
    NormalPolygonWms: {id: 'normalpolygonwms', name: '普通面图', thumb: require('../assets/maps/img_fenduantianchong.png')},
    ClassifyPolygon: {id: 'classifypolygon', name: '色差图', thumb: require('../assets/maps/img_fenduantianchong.png')},
    ClasssifyPoint: {id: 'classifypoint', name: '散点图', thumb: require('../assets/maps/img_fenduantu.png')},
    ClassifyLine: {id: 'classifyline', name: '色差图', thumb: require('../assets/maps/img_fenduanxuanran.png')},
    Scatter: {id: 'scatter', name: '气泡图', thumb: require('../assets/maps/img_size_point.png')},
    Cluster: {id: 'cluster', name: '聚合图', thumb: require('../assets/maps/icon_juhetu.png')}
}

export const MapSourceType = {
    Geojson : 'geojson',
    API : 'api',
    WMS: 'wms'
}