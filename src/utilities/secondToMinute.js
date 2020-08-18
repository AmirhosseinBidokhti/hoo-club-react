export function secondsToTime(secs){
  
  var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes + 'mins',
        "s": seconds
    };
    return obj;
}

// function sec2time(timeInSeconds) {
//   var pad = function(num, size) { return ('000' + num).slice(size * -1); },
//   time = parseFloat(timeInSeconds).toFixed(3),
//   hours = Math.floor(time / 60 / 60),
//   minutes = Math.floor(time / 60) % 60,
//   seconds = Math.floor(time - minutes * 60),
//   milliseconds = time.slice(-3);

//   return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);
// }