# CanvaspolylineLayer : CanvasLayer


CanvasPolylineLayer 在 canvas 上绘制折线，可用来展示路网等轨迹数据。

# 参数说明
+ options: 
    - dividePart: int，优化交互检索效率，将图层折线按照 dividePart 数目横纵划分。 默认为 2，可以取 2-4
    - cursor: String，鼠标划过展示的折线后的样式，默认为 `"pointer"`
    - createPane: boolean，是否在新面板上创建 canvas，默认为 true

## 方法说明
## `hide`
*() => ()*
隐藏当前图层，并且禁止全部图层交互。

## `show`
*() => ()*
重新显示当前图层，并且恢复全部图层交互。

## `on`
*(String event_type, Function callback_function, Object? context) => this*

为当前图层绑定 `event_type` 事件。
+ `event_type`: String，绑定事件
+ `callback_function`: Function (Polyline p, Number index, Object originData)，回调函数
+ `context`: Object，执行回调函数时的事件上下文

## `enter`
*() => this*

将 `this._data` 映射为用于渲染 polyline 的对象。 *非 L.Polyline 类*
### `_data` 参数要求:
+ coordinates: 折线上的坐标数组，格式为[lat, lng]或L.Latlng
+ options: 折线渲染选项
    - options.color: 折线颜色，默认为 `'#000000'`
    - width: 折线宽度，单位为px
    - zoomLevel: 显示该折线的缩放等级，默认为 1，即始终显示


*样例见 canvastest.js*