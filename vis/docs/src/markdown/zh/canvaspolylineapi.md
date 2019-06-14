# CanvasPolylineLayer : CanvasLayer

## CanvasPolylineLayer图层参数说明
以 *Polyline* 对象的形式组织路网结构，并通过Canvas图层在地图上渲染。

| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| opacity | Number | `0.99` | canvas图层不透明度 |
| createPane | Boolean | `true` | 是否在新的Pane上创建图层 |
| zIndex | Number | `300` | 图层的Z轴高度 |
| cursor  | String | `'pointer'` | 指定鼠标划过折线时的CSS样式 |
| dividePart  | Number | `2` | 优化交互检索效率，将图层折线按照 dividePart 数目横纵划分 |

## Polyline参数说明
| Option | Type | Default | Description |
| :----- | :---:| :-----: | :---------  |
| color | String | `'#000000'` | 折线颜色 |
| width | Number | `1` | 折线宽度，单位为px | 
| zoomLevel | Number | `1` | 最小显示缩放程序，默认在任意缩放大小下均显示 |

## 方法说明
### data
*(Array&lt;any&gt;, Function) => this*

将原始数据集映射为具有指定字段格式的对象数组`this._data`。

| key    | Type  | Description |
| :----- | :---: | :---------  |
| coordinates  | `Array(Array(2))`/`Array<L.Latlng>` | Polyline 的坐标集合 |
| options | `Object` | 样式设置，参见 "Polyline参数说明"

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

调用`generate`方法，将`this._data`映射为对应的`Polyline`对象数组

### generate
*() => Array*

将 `this._data` 映射为 `Array<Polyline>`。

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
map.doubleClickZoom.disable();

var emphasisList = [];

function emphasisPolyline(polyline) {
    if (polyline.emphasis) return;

    polyline.options.formerColor = polyline.options.color;
    polyline.options.formerWidth = polyline.options.width;

    polyline.options.color = 'red';
    polyline.options.width = 2;

    polyline.emphasis = true;
    emphasisList.push(polyline)
}

function resetEmphasis() {
    emphasisList.forEach(function(polyline) {
        polyline.options.color = polyline.options.formerColor;
        polyline.options.width = polyline.options.formerWidth;
        polyline.emphasis = false;
    });
    emphasisList = [];
}

function onClickCallBack(polyline, index, originData) {
    if (polyline) emphasisPolyline(polyline);
    c.needRedraw();
}

var c = new dmap.CanvasPolylineLayer({
    cursor: 'pointer',
    divideParts: 4
})

 
$.getJSON('newyorkcity_streetcenterline.json', function(json) {
    c.data(json.data, function(d) {
        let color = undefined,
            rw_type = parseInt(d.RW_TYPE)
        switch (rw_type) {
            case 1: color = 'grey'; break;
            case 2: color = 'blue'; break;
            case 3: color = 'brown'; break;
            default: color = 'black';
        }
        return {
            coordinates: d.coords,
            options: {
                zoomLevel: rw_type == 2 ? 1 : 11,
                color: color,
                width: 0.5
            },
            data: d
        }
    }).enter().addTo(map);
    map.fitBounds(c.getBounds());
    c.on('dblclick', resetEmphasis)
    c.on('click', onClickCallBack, c);

})
```