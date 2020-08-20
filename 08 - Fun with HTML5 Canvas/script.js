// WARNING**
// THIS IS A VERY BASIC STUDY PROJECT, 
// I DID'NT EVEN KNOW HOW CONTROL THE STATES OF THE APPLICATION
// OR HOW TO DO THAT WITH BEST PRACTICES.

// BUT AS A WISE MAN ONCE SAID: BETTER DONE THAN PERFECT
// THE MOST IMPORTANT THING: THE APP WORKS FINE
// HAVE FUN!


let DEFAULT_COLOR = 'black';
let DEFAULT_SIZE = 30;
let POWER_MODE = false;
let DEFAULT_TOOL = 'brush';

const $cursor = document.querySelector('cursor');
const $canvas = document.querySelector('#canvas');
const $toolTips = document.querySelectorAll('.tooltip');
const $powerModeBtn = document.querySelector('.tools__powermode');
const $brushBtn = document.querySelector('#brush');
const $pencilBtn = document.querySelector('#pencil');
const $eraserBtn = document.querySelector('#eraser');
const $colorBtn = document.querySelector('#color');
const $colorList = document.querySelectorAll('.color__item');
const $listItems = document.querySelectorAll('.tools__item');
const $sizeSliders = document.querySelectorAll('input[type="range"]');

$canvas.addEventListener('mousemove', (e) => {
  const mousePosition = (e) => {
    const positions = {
      positionX: e.pageX - DEFAULT_SIZE / 2,
      positionY: e.pageY - DEFAULT_SIZE / 2,
    };
    return positions;
  };

  cursorPosition = mousePosition(e);

  if (
    cursorPosition.positionX >= 0 &&
    cursorPosition.positionX <= $canvas.width
  ) {
    if (
      cursorPosition.positionY >= 0 &&
      cursorPosition.positionY <= $canvas.height
    ) {
      $cursor.setAttribute(
        'style',
        `top: ${cursorPosition.positionY}px;
  left: ${cursorPosition.positionX}px;
  width: ${DEFAULT_SIZE}px;
  height: ${DEFAULT_SIZE}px`
      );
    }
  }
});

window.addEventListener('load', () => {
  $canvas.width = screen.width;
  $canvas.height = screen.height;
  sizeHasChange();
});

window.addEventListener('resize', () => {
  $canvas.width = screen.width;
  $canvas.height = screen.height;
});

$powerModeBtn.addEventListener('click', () => {
  if ($powerModeBtn.classList.contains('tools__powermode--on')) {
    $powerModeBtn.classList.remove('tools__powermode--on');
    $colorBtn.style.backgroundImage = 'none';
    $colorBtn.style.backgroundColor = DEFAULT_COLOR;
    POWER_MODE = false;
    return;
  }

  $powerModeBtn.classList.add('tools__powermode--on');
  $colorBtn.style.backgroundImage = `url("./img/palette.svg")`;
  POWER_MODE = true;
});

$brushBtn.addEventListener('click', function (e) {
  buildSizeToolSliders(e, this);
  DEFAULT_TOOL = 'brush';
  DEFAULT_SIZE = $brushBtn.lastElementChild.lastElementChild.value;
  toolHasChange();
});

$pencilBtn.addEventListener('click', function (e) {
  buildSizeToolSliders(e, this);
  DEFAULT_TOOL = 'pencil';
  DEFAULT_SIZE = $pencilBtn.lastElementChild.lastElementChild.value;
  toolHasChange();
});

$eraserBtn.addEventListener('click', function (e) {
  buildSizeToolSliders(e, this);
  DEFAULT_TOOL = 'eraser';
  DEFAULT_SIZE = $eraserBtn.lastElementChild.lastElementChild.value;
  toolHasChange();
});

$colorBtn.addEventListener('click', (e) => {
  if ($powerModeBtn.classList.contains('tools__powermode--on')) return;
  if (e.target !== $colorBtn) return;
  $colorBtn.firstChild.nextSibling.classList.toggle('isVisible');
});

$canvas.addEventListener('mousedown', (e) => {
  if (e.target == !$canvas) return;
  $toolTips.forEach((tooltip) => tooltip.classList.remove('isVisible'));
});

$colorList.forEach((colorItem) => {
  colorItem.addEventListener('click', () => {
    DEFAULT_COLOR = window.getComputedStyle(colorItem).backgroundColor;
    colorHasChange();
    $colorBtn.style.backgroundColor = DEFAULT_COLOR;
    $colorBtn.style.backgroundImage = 'none';
  });
});

$sizeSliders.forEach((slider) => {
  const OLD_SIZE = DEFAULT_SIZE;
  slider.addEventListener('input', () => {
    DEFAULT_SIZE = slider.value;
    sizePreview(OLD_SIZE);
  });
});

$sizeSliders.forEach((slider) => {
  slider.addEventListener('mouseup', () => {
    sizeHasChange();
  });
});

$canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offtsetX, e.offsetY];
});

$canvas.addEventListener('mousemove', draw);
$canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.closePath();
});
$canvas.addEventListener('mouseleave', () => (isDrawing = false));

const resetActiveState = () => {
  $listItems.forEach((item) => item.classList.remove('isActive'));
  $toolTips.forEach((tooltip) => tooltip.classList.remove('isVisible'));
};

const buildSizeToolSliders = (e, item) => {
  if (e.target !== item) return;
  resetActiveState();
  item.firstChild.nextSibling.classList.toggle('isVisible');
  if (item.classList.contains('isActive')) return;
  item.classList.add('isActive');
};

// CANVAS FUNCTIONS BELOW

const colorHasChange = () => {
  ctx.strokeStyle = DEFAULT_COLOR;
};

const sizePreview = (oldValue) => {
  ctx.lineWidth = DEFAULT_SIZE;
  const $handler = document.querySelector('handler');

  $cursor.classList.add('size-isChanging');

  $handler.setAttribute(
    'style',
    `top: ${50}%;
  left: ${50}%;
  bottom: ${50}%;
  right: ${50}%;
  transform: translate(-${50}%, -${50}%);
  width: ${oldValue}px;
  height: ${oldValue}px`
  );

  $cursor.setAttribute(
    'style',
    `top: ${50}%;
  left: ${50}%;
    bottom: ${50}%;
  right: ${50}%;
  transform: translate(-${50}%, -${50}%);
  width: ${DEFAULT_SIZE}px;
  height: ${DEFAULT_SIZE}px`
  );
};

const sizeHasChange = () => {
  ctx.lineWidth = DEFAULT_SIZE;
  const $handler = document.querySelector('handler');
  $handler.style.display = 'none';
  $cursor.classList.remove('size-isChanging');

  $cursor.setAttribute(
    'style',
    `top: ${50}%;
  left: ${50}%;
  right: ${50}%;
  bottom: ${50}%;
  transform: translate(-${50}%, -${50}%);
  width: ${DEFAULT_SIZE}px;
  height: ${DEFAULT_SIZE}px`
  );
};
const toolHasChange = () => {
  ctx.lineWidth = DEFAULT_SIZE;

  switch (DEFAULT_TOOL) {
    case 'brush':
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'source-over';
      break;

    case 'pencil':
      ctx.lineCap = 'butt';
      ctx.lineJoin = 'miter';
      ctx.globalCompositeOperation = 'source-over';
      break;

    case 'eraser':
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'destination-out';
      break;
  }
};

const ctx = $canvas.getContext('2d');
$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;
ctx.lineWidth = 30;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let customSize = 11;
let direction = true;

function draw(e) {
  if (!isDrawing) return;

  if (POWER_MODE) {
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = customSize;
    if (hue >= 360) {
      hue = 0;
    }

    if (customSize >= 100 || customSize <= 10) {
      direction = !direction;
    }

    direction ? customSize++ : customSize--;
    hue++;
  }

  if (!POWER_MODE) {
    ctx.strokeStyle = DEFAULT_COLOR;
    toolHasChange();
  }

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

$canvas.addEventListener(
  'touchstart',
  function (e) {
    mousePos = getTouchPos($canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    $canvas.dispatchEvent(mouseEvent);
    sizeHasChange();
  },
  false
);
$canvas.addEventListener(
  'touchend',
  function (e) {
    var mouseEvent = new MouseEvent('mouseup', {});
    $canvas.dispatchEvent(mouseEvent);
  },
  false
);
$canvas.addEventListener(
  'touchmove',
  function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    $canvas.dispatchEvent(mouseEvent);
  },
  false
);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top,
  };
}

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top,
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener(
  'touchstart',
  function (e) {
    if (e.target == $canvas) {
      e.preventDefault();
    }
  },
  { passive: false }
);
document.body.addEventListener(
  'touchend',
  function (e) {
    if (e.target == $canvas) {
      e.preventDefault();
    }
  },
  { passive: false }
);
document.body.addEventListener(
  'touchmove',
  function (e) {
    if (e.target == $canvas) {
      e.preventDefault();
    }
  },
  { passive: false }
);
