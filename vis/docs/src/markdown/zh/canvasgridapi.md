# CanvasGridLayer : CanvasLayer

## 元素说明

方格图是一种以规整的网格状分布渲染地图上的数值分布的图层。`CanvasGridLayer` 通过在 canvas 上绘制若干矩形实现方格图的渲染。我们通过 `dMap.ScalarField` 表示二维的网格数据，包含了二维矩阵的基本信息。

## 参数说明
| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| opacity | Number | `0.99` | canvas图层不透明度 |
| createPane | Boolean | `true` | 是否在新的Pane上创建图层 |
| zIndex | Number | `300` | 图层的Z轴高度 
| color  | Function | `null` | 数据-颜色映射函数 |
| border  | Boolean | `false` | 是否绘制网格边框 |
| borderWidth | Number | `0.5` | 边框宽度，单位为px |
| borderColor | String | `#000000` | 边框颜色 | 
| borderOpacity | Number | `0.99` | 边框不透明度 |

## 生成方格结构
dmap 提供了 `ScalarField.fromASCIIGrid` 函数，可以从ASC文件导出二维矩阵结构`arr`，并将`arr.grid`与`arr.params`作为`data`方法的第一、三参数传入。其中 ASC 文件前六行格式如下表所示：

| Name | Description |
| :--- | :------- |
| ncols | 方格图的列数，即宽度 |
| nrows | 方格图的行数，即高度 |
| xllcorner | 方格图左下角经度 |
| yllcorner | 方格图左下角纬度 |
| NODATA_value | 无数据显示的方格在原始数据中的取值（渲染为透明） |

自第七行开始，每一行记录方格图的原始数据中的一行，以空格分隔。如下所示：

```
ncols        3
nrows        5
xllcorner    116.34084820747375
yllcorner    39.979241217295936
cellsize     0.000505058366 0.0004625
NODATA_value  -9999
0.94221 0.92999 0.93455
0.95111 0.91213 0.97551
0.96115 0.92999 0.93520
0.93115 -9999 0.95112 -9999
-9999 -9999 -9999 -9999
```

`fromASCIIGrid` 返回一个 `ScalarField` 对象，其中`params`字段是 `Object`， 包含了ASC文件中的 `ncols` 等信息，`grid` 字段为二维数组格式的原始数据。

## 方法说明
### data
*(Array&lt;any&gt;, Function, Object) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。输入数据应为二维矩阵或一维数组，映射后的结构应为二维矩阵，元素为Number类型，代表所属网格的值。

`data` 方法的一、三参数可以分别从 `fromASCIIGrid` 返回的 `ScalarField` 对象的 `grid` 与 `grid` 属性获取。

### hide
*() => ()*

隐藏当前图层，并且禁止全部图层交互。

### show
*() => ()*

重新显示当前图层，并且恢复全部图层交互。

### on
*(String event_type, Function callback_function, Object? context) => this*

为当前图层绑定 event_type 事件。
+ `event_type`: *String*，绑定事件
+ `callback_function`: *Function (Polyline p, Number index, Object originData)*，回调函数
+ `context`: *Object*，执行回调函数时的事件上下文

### enter
*() => this*

将`this._data`映射为对应的`ScalarField`二维结构。

### addTo
*(Map) => this*

将图层添加到Leaflet地图容器中。

### getBounds
*() => L.Bounds*

返回该图层的渲染范围，为地图缩放等功能提供参数。

### needRedraw
*() => this*

强制重新渲染图层。

## 代码示例
```javascript

d3.text('risk.asc', function (asc) {
    let s = dmap.ScalarField.fromASCIIGrid(asc);
    
    let identify = function (e) {
        console.log(e.latlng);
        if (e.value !== null) {
            let v = e.value.toFixed(3);
            let html = `<span class="popupText">value: ${v}</span>`;

            let popup = L.popup().setLatLng(e.latlng).setContent(html).openOn(map);
        }
    };

    let gridLayer = new dmap.CanvasGridLayer({
        opacity: 0.78,
        border: true,
        color: dmap.Util.colorScale(['#FFFFB2', '#E31A1C']).domain([0, 27]),
        borderColor: '#111111',
        borderWidth: 0.71,
        borderOpacity: 0.7,
        controlBar: true,
        zIndex: 200
    });

    gridLayer
        .data(s.grid, (d)=>d ,s.params)
        .enter()
        .addTo(map)
        .on('click', identify);

    map.fitBounds(gridLayer.getBounds());

});

```
