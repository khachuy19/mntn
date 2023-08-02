//*
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const sliderItems = $$(".slider-item");
const activeLine = $(".active-line");
const hoverLine = $(".hover-line");
const activeSliderItem = $(".slider-item.active");
const contentItems = $$(".content-item");
const sliderWrapper = $(".wrapper");
const aElement = $$("a");

window.addEventListener("DOMContentLoaded", function () {
  //PreventDefault a element behavior
  aElement.forEach((element) => {
    element.onclick = (e) => e.preventDefault();
  });

  ///Initialize first line active
  requestIdleCallback(function () {
    activeLine.style.top = activeSliderItem.offsetTop + "px";
    activeLine.style.height = activeSliderItem.offsetHeight + "px";
  });

  const setTopNHeightAL = function () {
    activeLine.style.top = this.offsetTop + "px";
    activeLine.style.height = this.offsetHeight + "px";
  };

  const transToRight = (animation) => {
    sliderWrapper.style.transform = "translate(36%, -50%)";
    sliderWrapper.style.transition = animation;
  };

  const transBack = () => {
    sliderWrapper.style.transform = "translate(0%, -50%)";
  }

  ///handle slider click change the size
  const handleMouseMove = function () {
    // let isActive = this.classList.contains("active");
    hoverLine.style.display = "block";
    hoverLine.style.top = this.offsetTop + "px";
    hoverLine.style.height = this.offsetHeight + "px";
  };

  //handle hover + active slider item
  sliderItems.forEach((sliderItem, index) => {
    sliderItem.addEventListener("mousemove", handleMouseMove.bind(sliderItem));

    sliderItem.addEventListener("mouseleave", function () {
      hoverLine.style.display = "none";
    });

    sliderItem.addEventListener("click", function () {
      setTopNHeightAL.call(this);
      // activeLine.style.top = this.offsetTop + "px";
      // activeLine.style.height = this.offsetHeight + "px";
    });

    ///Handle click slide to element
    switch (index) {
      case 0: {
        sliderItem.addEventListener("click", () => {
          console.log("click fired");

          transBack();
          window.scrollTo(0, 0);
          // sliderWrapper.style.transform = "translate(0%, -50%)";
        });
        break;
      }
      case 1: {
        sliderItem.addEventListener("click", () => {
          transToRight("all 0.5s ease-in");
          // sliderWrapper.style.transform = "translate(36%, -50%)";
          // sliderWrapper.style.transition = "all 0.5s ease-in";

          contentItems[0].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        });
        break;
      }
      case 2: {
        sliderItem.addEventListener("click", () => {
          transToRight("all 0.5s ease-in");
          contentItems[1].scrollIntoView();
        });
        break;
      }
      case 3: {
        sliderItem.addEventListener("click", () => {
          transToRight("all 0.5s ease-in");
          contentItems[2].scrollIntoView();
        });
        break;
      }
    }
  });

  //handle scroll changes active slider item
  window.addEventListener("scroll", () => {
    console.log("scroll fired");
    setTopNHeightAL.call(sliderItems[0]);
    transBack();

    if (this.scrollY >= contentItems[0].offsetParent.offsetParent.offsetTop - 600) {
      setTopNHeightAL.call(sliderItems[1]);
      transToRight("all 0.5s ease-in");
    } 
    if (this.scrollY >= (contentItems[0].offsetParent.offsetParent.offsetTop - 400) + contentItems[0].offsetHeight - 170) {
      setTopNHeightAL.call(sliderItems[2]);
    }
    if(this.scrollY >= contentItems[0].offsetParent.offsetParent.offsetTop - 400 + contentItems[0].offsetHeight + contentItems[1].offsetHeight - 250 ){
      setTopNHeightAL.call(sliderItems[3]);
    }
  });
});
