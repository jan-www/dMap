# CanvasGridLayer : CanvasLayer

## CanvasPolylineLayer图层参数说明
将二维网格数据以不同颜色渲染到地图上。

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


## 方法说明
### data
*(Array&lt;any&gt;, Function, params) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。映射后的结构应为二维矩阵。可使用`dmap.ScalarField.fromASCIIGrid`从ASC文件导出二维矩阵结构`arr`，并将`arr.grid`与`arr.params`作为`data`方法的第一、三参数传入。

`params`参数包含了方格图的行列数量、行列宽度、起始坐标等参数。

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
