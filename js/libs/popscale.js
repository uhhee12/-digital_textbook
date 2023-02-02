/*
	create date : 2016-05-19
	creator : saltgamer
*/
"use strict";

function loadScriptFile(scriptSrc, callBack) {
  var script = document.createElement("script");
  script.src = scriptSrc;
  if (callBack) {
    script.onload = function () {
      callBack();
    };
  }
  document.head.appendChild(script);
}

function runTextBook(callBack) {
  if (window.document) {
    if (window.document.readyState === "complete") {
      setTimeout(run);
    } else {
      window.addEventListener("load", completed, false);
    }
  }
  function completed() {
    window.removeEventListener("load", completed, false);
    callBack();
  }
}

//loadScriptFile('./js/common/responsive.js', function () { console.log('□ responsive.js loaded...')});

runTextBook(function () {
  FORTEACHERCD.responsive.setScaleElement(
    document.querySelector(".wayContent")
  );
  window.addEventListener(
    "resize",
    function () {
      FORTEACHERCD.responsive.currentContainerSize.containerWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      FORTEACHERCD.responsive.currentContainerSize.containerHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      FORTEACHERCD.responsive.setScaleElement(
        document.querySelector(".wayContent")
      );
    },
    false
  );
});

("use strict");

var FORTEACHERCD = FORTEACHERCD || {};

FORTEACHERCD.responsive = (function () {
  var responsive = {
    baseContainerSize: {
      width: 1000,
      height: 600,
    },
    currentContainerSize: {
      containerWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      containerHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
    },
    setScaleElement: function (targetElement, adjust) {
      var bgContainer = document.querySelector("#bgContainer"),
        zoomVertical =
          this.currentContainerSize.containerHeight /
          targetElement.clientHeight,
        zoomHorizontal = this.currentContainerSize.containerWidth / targetElement.clientWidth;

      zoomVertical = document.documentElement.clientHeight / targetElement.clientHeight;
      zoomHorizontal = document.documentElement.clientWidth / targetElement.clientWidth;

      if (
        targetElement.clientWidth * zoomVertical >
        document.documentElement.clientWidth
      ) {
        this.setTransformCSS(targetElement, zoomHorizontal);
        targetElement.style.top = (document.documentElement.clientHeight - targetElement.clientHeight * zoomHorizontal) / 2 + "px";console.log(document.documentElement.clientWidth ,  targetElement.clientHeight)
      } else {
        this.setTransformCSS(targetElement, zoomVertical);
        targetElement.style.left = (document.documentElement.clientWidth - targetElement.clientWidth * zoomVertical) / 2 + "px";
      }
    },

    setTransformCSS: function (targetElement, zoomRate) {
      targetElement.setAttribute(
        "style",
        "-ms-transform: scale(" +
          zoomRate +
          "," +
          zoomRate +
          ");" +
          "-webkit-transform: scale(" +
          zoomRate +
          "," +
          zoomRate +
          ");" +
          "transform: scale(" +
          zoomRate +
          "," +
          zoomRate +
          ");" +
          "transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;"
      );
      window.EDUTSS.scaleValue.zoom && (window.EDUTSS.scaleValue.zoom = zoomRate); 
    },
  };

  return responsive;
})();
