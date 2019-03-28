import {PointLayer} from "./PointLayer.js"

export class TimelineLayer{
    constructor(mymap,options) {
        this._times = [];
        this._data = [];
        this.times2index = {};
        this._layers = [];
        this._curlayer = null;
        this._map = mymap;
        
        // this.running = 1;//1:play,2:stop,3:pause
        this.timeline = document.getElementById("timeline");//timeline
        timeline.style.visibility = "visible";

        this.slider = document.getElementById("myRange");;//slider
        this.output = document.getElementById("demo");//output value
             
        this.bt_play = document.getElementById("bt_play");//play button
        // this.bt_stop = document.getElementById("bt_stop");//stop button
        // this.bt_pause = document.getElementById("bt_pause");//pause button

        this.setOption(options);
    }

    setOption(options){
        this.options = options;
    }

    data(time,data,fn){
        this._times = time;
        this._data = data;
        for(let i=0;i<time.length;i++){
            this.times2index[this._times[i]] = i;
        }

        for(let i=0;i<time.length;i++){
            let l = new PointLayer();
            this._layers[i] = l.data(data[i],fn).enter();
        }
        this.listen();
        
        return this;
    }

    listen(){
        //添加slider监听事件
        var tmp = this;
        this.slider.oninput = function() {
            tmp.output.innerHTML = tmp._times[tmp.slider.value];
            return tmp.output.innerHTML;
        }
        this.output.innerHTML = this._times[this.slider.value]; // Display the default slider value

        //the timeline is(not) visible
        if(this.options.enableControl==false){
            timeline.style.visibility = "hidden";
        }else{
            timeline.style.visibility = "visible";
        }

        //是否自动播放
        if(this.options.autoPlay==true){
            this.play(this._times[0],this._map);
        }else{
            this.renderAtTime(this._times[0],this._map);
        }

        //添加播放按钮监听事件
        var tmp = this;
        this.bt_play.onclick = function(){
            // tmp.running = 1;
            tmp.play(tmp._times[0],tmp._map);
        }
        // this.bt_stop.onclick = function(){
        //     tmp.running = 2;
        // }
        // this.bt_pause.onclick = function(){
        //     tmp.running = 3;
        // }

    }

    renderAtTime(time_index){
        if(this._curlayer!=null){
            this._curlayer.remove();
        }
        switch(this.options.layerType){
            case "PointMap":   
                this._layers[this.times2index[time_index]].addTo(this._map);
                this._curlayer = this._layers[this.times2index[time_index]];
                break;
            case "heatmap":
                this._curlayer = new HeatmapOverlay(this.options.layerOption).addTo(this._map);
                this._curlayer.setData(this._data[this.times2index[time_index]]);
                break;
            default:
                throw new Error(this.options.layerType+'is not exist in the timelinelayer');
        }     
        this.slider.value = this.times2index[time_index];
        this.output.innerHTML = time_index;  
    }

    on(event){
        if(event="timechage"){
            var tmp = this
            this.slider.onclick = function(){
                tmp.renderAtTime(tmp.output.innerHTML,tmp._map)
            }
        }
    }

    play(time){
        let index = this.times2index[time];

        //es6 promise
        for (let i=index; i<this._times.length; i++) {
            var tmp = this;
            (function () {
                setTimeout(() => tmp.renderAtTime(tmp._times[i],tmp._map), tmp.options.tickTime*i)
            })()
        }

    }
}
