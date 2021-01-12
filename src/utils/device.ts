const docEl = document.documentElement;
function getScreenSizeW(): number {
  return docEl.getBoundingClientRect().width;
}

function checkDevice(): object {
  let rem = 16;
  const w = getScreenSizeW();
  let device = '';
  if (w < 768) {
    device = 'mobile';
  } else if (w >= 768 && w <= 1024) {
    device = 'pad';
  } else {
    device = 'pc';
  }
  if (device === 'mobile') {
    rem = (docEl.getBoundingClientRect().width) / 375 * 10;
  }
  docEl.setAttribute('data-device', device);
  docEl.style.fontSize = rem + 'px';
  return {
    name: device,
    rem
  };
}

export {
  checkDevice
};
