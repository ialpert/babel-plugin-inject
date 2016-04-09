function injectCSS() {
  return function (css = '') {
    var s = document.createElement("style");
    s.innerHTML = css;

    document.querySelector('head').appendChild(s);
  }
}

export {injectCSS as injectCSS};