(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.createElement("canvas");
var cover = document.querySelector("body");
cover.style.backgroundColor = "#000";
canvas.id = "canvas_snow";
canvas.style.zIndex = 5000;

if (cover.children.length > 0) {
  cover.prepend(canvas);
  var flakes = [],
    canvas = document.getElementById("canvas_snow"),
    ctx = canvas.getContext("2d"),
    flakeCount = 400,
    mX = -100,
    mY = -100

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function snow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
      var flake = flakes[i],
        x = mX,
        y = mY,
        minDist = 150,
        x2 = flake.x,
        y2 = flake.y;

      var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
        dx = x2 - x,
        dy = y2 - y;

      if (dist < minDist) {
        var force = minDist / (dist * dist),
          xcomp = (x - x2) / dist,
          ycomp = (y - y2) / dist,
          deltaV = force / 2;

        flake.velX -= deltaV * xcomp;
        flake.velY -= deltaV * ycomp;

      } else {
        flake.velX *= .98;
        if (flake.velY <= flake.speed) {
          flake.velY = flake.speed
        }
        flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
      }

      ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
      flake.y += flake.velY;
      flake.x += flake.velX;

      if (flake.y >= canvas.height || flake.y <= 0) {
        reset(flake);
      }

      if (flake.x >= canvas.width || flake.x <= 0) {
        reset(flake);
      }

      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(snow);
  }

  function reset(flake) {
    flake.x = Math.floor(Math.random() * canvas.width);
    flake.y = 0;
    flake.size = (Math.random() * 3) + 2;
    flake.speed = (Math.random() * 1) + 0.5;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = (Math.random() * 0.5) + 0.3;
  }

  function init() {
    for (var i = 0; i < flakeCount; i++) {
      var x = Math.floor(Math.random() * canvas.width),
        y = Math.floor(Math.random() * canvas.height),
        size = (Math.random() * 3) + 2,
        speed = (Math.random() * 1) + 0.5,
        opacity = (Math.random() * 0.5) + 0.3;

      flakes.push({
        speed: speed,
        velY: speed,
        velX: 0,
        x: x,
        y: y,
        size: size,
        stepSize: (Math.random()) / 30,
        step: 0,
        opacity: opacity
      });
    }

    snow();
  };

  // 滾動時更新canvas的寬高
  window.addEventListener("scroll", function (e) {
    // 取得網頁高度
    // console.log(e.target.scrollingElement.scrollHeight)
    // 離起始點的高度距離
    // console.log(document.documentElement.scrollTop)
    document.getElementById("canvas_snow").style.top = `${document.documentElement.scrollTop}px`;
  })

  // canvas.addEventListener("mousemove", function (e) {
  //   mX = e.clientX;
  //   mY = e.clientY;
  // });

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  })

  init();
}