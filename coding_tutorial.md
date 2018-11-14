编程风格：
[http://es6.ruanyifeng.com/#docs/style](http://es6.ruanyifeng.com/#docs/style)

一个样例：
```
import BaseLayer from '../layers/BaseLayer'
class Map{
  constructor(dom,option) {
    this._obj = L.map(dom, option);
    this._prev_data = []
    this._data = []
  }
  on(event_type,callback){
    this._obj.on(event_type,callback);
    return this;
  }
  setOption(option){
    this._obj.setOption(option);
    return this;
  }
  data(){
    // update this._data
  }
  render(){
    //leaflet 渲染  
  }
  enter(){
    //更新dom， 集合操作
  }
  onElement(){
    
  }
}

var map = new Map('#div',{
  center: [123,34]
})
map.on('click',function(){
  
})

```

不希望被调用，可以参照下面的语法
[http://es6.ruanyifeng.com/#docs/class](http://es6.ruanyifeng.com/#docs/class)
```
export default class BaseLayer{
  constructor() {
    if(new.target === BaseLayer){
      throw new Error('this class cannot be initialize')
    }
  }
  setOption(){
    
  }
}
```

```
import BaseLayer from '../layer/BaseLayer'
export default class Map extends BaseLayer{
  
}
```

常量定义
```
//const.js
export const CLICK = 'click'
```

常量引用
```
import {CLICK} from './const'

on(events_type,callback){
//有更简单的语法可以再写一下

  switch(events_type){
    case CLICK: this._obj.on(CLICK, callback);
    default: this._obj.on(events_type, callback)
  }
}
```



```
onElement(events_type,callback){
  for(let i=0;i<this._item.length;i++){
    _item[i].on(events_type,function(){
      callback(this._data[i],i)
    })
  }
}

//调用
layer.onElement('click',function(d,i){
  console.log(d)
})
```

[https://leafletjs.com/reference-1.3.4.html#layergroup](https://leafletjs.com/reference-1.3.4.html#layergroup)
```
var marker1 = L.marker([lat,lon],20)
var marker2 = L.marker([lat,lon],20)
L.layerGroup([marker1, marker2])
    .addLayer(polyline)
    .addTo(map);
```

