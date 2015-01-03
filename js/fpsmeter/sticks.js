STICK_COUNT = 100;
function setup_fps_meters() {
  var heading = document.getElementById('heading');
  var meter = new FPSMeter(heading, {
      heat: true,
      theme: 'colorful',
      graph: true
  });

  // Tap into snabbt.js tick
  var _snabbtjs_tick = snabbtjs.tick_animations;

  master_tick = function(time) {
    _snabbtjs_tick(time);
    meter.tick();
  };

  snabbtjs.tick_animations = master_tick;
}

function animate(prefix, index) {
  if(index != STICK_COUNT - 1)
    return;

  for(var i=0;i<STICK_COUNT;++i) {
    var stick = document.getElementById(prefix + i);
    snabbt(stick, {
      from_position: [0, -(STICK_COUNT/2) * 5 + 5*i, 0],
      position: [200, 0, 0],
      duration: 500,
      easing: 'ease',
    }).then({
      position: [200, 0, 0],
      rotation_post: [0, 0, (i/STICK_COUNT)*2*Math.PI],
      duration: 1000,
      easing: 'ease',
    }).then({
      from_position: [
        200*Math.cos((i/STICK_COUNT)*2*Math.PI),
        -200*Math.sin((i/STICK_COUNT)*2*Math.PI),
        0
      ],
      position: [
        100*Math.cos((i/STICK_COUNT)*2*Math.PI),
        -100*Math.sin((i/STICK_COUNT)*2*Math.PI),
        0
      ],
      from_rotation: [0, 0, (i/STICK_COUNT)*2*Math.PI - 2*Math.PI],
      rotation: [0, 0, (i/STICK_COUNT)*2*Math.PI - 2*Math.PI],
      from_rotation_post: [-2*Math.PI, 0, 0],
      rotation_post: [0, 0, 0],
      delay: i*10,
      duration: 1000,
      easing: 'ease',
    }).then({
      from_position: [100, 0, 0],
      position: [0, -(STICK_COUNT/2) * 5 + 5*i, 0],
      from_rotation: [0, 0, 0],
      from_rotation_post: [0, 0, (i/STICK_COUNT)*2*Math.PI],// + Math.PI],
      rotation_post: [0, 0, 0],
      easing: 'ease',
      delay: STICK_COUNT*10 + i*10,
      duration: 1000,
      callback: (function(j) { return function() { animate(prefix, j) } })(i),
    });
  }
}


function init() {
  setup_fps_meters();


  

}
