/**
 * A class to define animation queue
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license MIT license
 */

/*
Usage: var timer = new dTimer() //similiar to setInterval
timer(function(elapsed){
    //TO DO : elapsed = Animation trigger time - Animation start time
    return True; //If you want timer stop, please return True value
}, delay, then)
*/
export function dTimer(){
    var dMap_timer_queueHead, dMap_timer_queueTail, dMap_timer_interval, dMap_timer_timeout, dMap_timer_frame = window.requestAnimationFrame || function(callback) {
        setTimeout(callback, 17);
    };
    
    function dMap_timer(callback, delay, then) {
        var n = arguments.length;
        if (n < 2) delay = 0;
        if (n < 3) then = Date.now();
        var time = then + delay, timer = {
          c: callback,
          t: time,
          n: null
        };
        if (dMap_timer_queueTail) dMap_timer_queueTail.n = timer; else dMap_timer_queueHead = timer;
        dMap_timer_queueTail = timer;
        if (!dMap_timer_interval) {
          dMap_timer_timeout = clearTimeout(dMap_timer_timeout);
          dMap_timer_interval = 1;
          dMap_timer_frame(dMap_timer_step);
        }
        return timer;
    }
    
    function dMap_timer_step() {
        var now = dMap_timer_mark(), delay = dMap_timer_sweep() - now;
        if (delay > 24) {
          if (isFinite(delay)) {
            clearTimeout(dMap_timer_timeout);
            dMap_timer_timeout = setTimeout(dMap_timer_step, delay);
          }
          dMap_timer_interval = 0;
        } else {
          dMap_timer_interval = 1;
          dMap_timer_frame(dMap_timer_step);
        }
    }
    
    dMap_timer.flush = function() {
        dMap_timer_mark();
        dMap_timer_sweep();
    };
    
    function dMap_timer_mark() {
        var now = Date.now(), timer = dMap_timer_queueHead;
        while (timer) {
          if (now >= timer.t && timer.c(now - timer.t)) timer.c = null;
          timer = timer.n;
        }
        return now;
    }
    
    function dMap_timer_sweep() {
        var t0, t1 = dMap_timer_queueHead, time = Infinity;
        while (t1) {
          if (t1.c) {
            if (t1.t < time) time = t1.t;
            t1 = (t0 = t1).n;
          } else {
            t1 = t0 ? t0.n = t1.n : dMap_timer_queueHead = t1.n;
          }
        }
        dMap_timer_queueTail = t0;
        return time;
    }

    return function() {
        dMap_timer.apply(this, arguments);
    };
}
