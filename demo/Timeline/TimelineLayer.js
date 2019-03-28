// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// var bt_play = document.getElementById("bt_play");
// var bt_stop = document.getElementById("bt_stop");
// var bt_pause = document.getElementById("bt_pause");

import {PointLayer} from "./PointLayer.js"

class Timelinelayer{
    constructor(time,data) {
        this.time = time;
        this.data = data;
        this.templayer = null;//the layer which is rendering
        this.running = 1;//1:play,2:stop,3:pause

        this.timeline = document.getElementById("timeline");//timeline
        timeline.style.visibility = "visible";

        this.slider = document.getElementById("myRange");;//slider
        this.output = document.getElementById("demo");//output value
        
        // Update the current slider value (each time you drag the slider handle)
        var tmp = this
        this.slider.oninput = function() {
            tmp.output.innerHTML = tmp.slider.value;
            return tmp.value
        }
        this.output.innerHTML = this.slider.value; // Display the default slider value
             
      

        this.bt_play = document.getElementById("bt_play");//play button
        this.bt_stop = document.getElementById("bt_stop");//stop button
        this.bt_pause = document.getElementById("bt_pause");//pause button
    }

    setOption(options){
        this.options = options;
        var tmp = this;
        this.bt_play.onclick = function(){
            tmp.running = 1;
            tmp.play(tmp.slider.value);
        }
        this.bt_stop.onclick = function(){
            tmp.running = 2;
        }
        this.bt_pause.onclick = function(){
            tmp.running = 3;

        }

        //the timeline is(not) visible
        if(this.options.enableControl==false){
            timeline.style.visibility = "hidden"
        }else{
            timeline.style.visibility = "visible"
        }
        
        //is(not) play
        if(this.options.autoPlay==true){
            this.play(1)
        }else{
            this.renderAtTime(this.time[0],mymap) 
        }
    }

    renderAtTime(time_index,mymap){
        // console.log(this.options.layerType);
        if(this.templayer!=null){
            this.templayer.remove();
        }
        switch(this.options.layerType){
            case "circle":
                this.templayer = L.circle(this.data[time_index-1],this.options.layerOption).addTo(mymap);
                break;
            case "PointMap":               
                break;
            case "heatmap":
                this.templayer = new HeatmapOverlay(this.options.layerOption).addTo(mymap);
                this.templayer.setData(this.data);
                break;
            default:
                break;
        }
        this.slider.value = time_index;
        this.output.innerHTML = this.slider.value;
    }

    //from time of index play
    play(index){
        //synchronous
        function sleep (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }

        async function test(tmp){
            tmp.renderAtTime(tmp.time[0],mymap) 
            for(let i=index-1;i<tmp.time.length;i++){
                tmp.renderAtTime(tmp.time[i],mymap) 
                if(tmp.running == 2){
                    tmp.renderAtTime(1,mymap)
                    return;
                }else if(tmp.running == 3){
                    return;
                }
                if(i==tmp.time.length-1){
                    break;
                }
                var temple=await sleep(tmp.options.tickTime);
            }
        }
        test(this); 

        //asychronous
        // function sleep(ms){
        // 	var start=Date.now(),expire=start+ms;
        // 	while(Date.now()<expire);
        // 	return;
        // }
        // for(let i=0;i<time.length;i++){
        // 	// this.renderAtTime(this.time[i],mymap) 
        // 	// sleep(200);
        // 	function render(tmp){
        // 		tmp.renderAtTime(tmp.time[i],mymap)
        // 	};
        // 	setTimeout(render(this),2000*(i+1));
        // 	console.log(i+1)
        // 	if(i==time.length-1){
        // 		break;
        // 	}
        // }
    }

    on(event){
        if(event="timechage"){
            var tmp = this
            this.slider.onclick = function(){
                tmp.renderAtTime(tmp.slider.value,mymap)
            }
        }
    }
}
