//VISUAL

document.addEventListener("DOMContentLoaded", function () {
  if (window.gsap) {
    gsap.set("#visual .right h2", {
      x: 100,
      opacity: 0,
    });

    gsap.to("#visual .right h2", {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });
  }

  //left
  const typing = document.getElementById("typing");

  if (typing) {
    const words = typing.innerText.split(" ");
    typing.innerHTML = "";

    let delay = 0;

    words.forEach((word, wIndex) => {
      [...word].forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        delay += 0.05;
        span.style.animationDelay = `${delay}s`;
        typing.appendChild(span);
      });

      if (wIndex < words.length - 1) {
        const space = document.createElement("span");
        space.className = "space";
        space.innerHTML = "&nbsp;";
        delay += 0.05;
        space.style.animationDelay = `${delay}s`;
        typing.appendChild(space);
      }
    });
  }
});
// con01
gsap.registerPlugin(ScrollTrigger);
gsap.from(".con01 .title .left h2", {
  x: -200,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".con01",
    start: "top center",
    end: "40% center",
    toggleActions: "play none none reverse",
    markers: false, // 테스트 후 false로 변경
  },
});

// 오른쪽에서 등장
gsap.from(".con01 .title .right h2", {
  x: 200,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".con01",
    start: "10% center",
    end: "40% center",
    toggleActions: "play none none reverse",
    markers: false,
  },
});

// con02
// 초기 상태 설정 - 카드들을 가운데 겹쳐놓기
gsap.set(".con02 li:nth-child(1)", {
  x: 530,
  rotation: -10,
});

gsap.set(".con02 li:nth-child(2)", {
  x: 0,
  rotation: 0,
});

gsap.set(".con02 li:nth-child(3)", {
  x: -530,
  rotation: 10,
});

// 애니메이션 중 호버 비활성화
gsap.set(".con02 li", {
  pointerEvents: "none",
});

// 텍스트 숨기기 (데스크톱만)
if (window.innerWidth > 1024) {
  gsap.set(".con02 li .txt", {
    opacity: 0,
  });
} else {
  gsap.set(".con02 li .txt", {
    opacity: 1,
  });
}

// PRODUCT 타이틀 - 왼쪽에서
gsap.from(".con02 .textbox .title", {
  x: -200,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con02",
    start: "top 80%",
  },
});

// 오른쪽 설명 텍스트 - 오른쪽에서
gsap.from(".con02 .textbox .box", {
  x: 200,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con02",
    start: "top 80%",
  },
});

// 카드 1 - 펼쳐지기
gsap.to(".con02 li:nth-child(1)", {
  x: 0,
  y: 0,
  rotation: 0,
  duration: 1.2,
  delay: 0.4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con02 .imgBox",
    start: "top 70%",
  },
});

// 카드 2 - 펼쳐지기
gsap.to(".con02 li:nth-child(2)", {
  x: 0,
  y: 25,
  rotation: 0,
  duration: 1.2,
  delay: 0.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con02 .imgBox",
    start: "top 70%",
  },
});

// 카드 3 - 펼쳐지기 + 호버 활성화
gsap.to(".con02 li:nth-child(3)", {
  x: 0,
  y: 50,
  rotation: 0,
  duration: 1.2,
  delay: 0.6,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con02 .imgBox",
    start: "top 70%",
  },
  onComplete: function () {
    // 데스크톱에서만 호버 활성화
    if (window.innerWidth > 1024) {
      gsap.set(".con02 li", { pointerEvents: "auto" });
      setupAccordion();
    } else {
      gsap.set(".con02 li", { pointerEvents: "none" });
    }
  },
});

// 아코디언 효과 (데스크톱만)
function setupAccordion() {
  // 태블릿/모바일에서는 실행하지 않음
  if (window.innerWidth <= 1024) {
    return;
  }

  const cards = document.querySelectorAll(".con02 li");
  const container = document.querySelector(".con02 ul");

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      // 현재 카드 확대
      gsap.to(card, {
        width: 750,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // 다른 카드 축소
      cards.forEach((otherCard, otherIndex) => {
        if (otherIndex !== index) {
          gsap.to(otherCard, {
            width: 250,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
          gsap.to(otherCard.querySelector(".txt"), {
            opacity: 0,
            duration: 0.3,
          });
        }
      });

      // 현재 카드 텍스트 보이기
      gsap.to(card.querySelector(".txt"), {
        opacity: 1,
        duration: 0.3,
        delay: 0.3,
      });
    });
  });

  // 전체 영역에서 마우스 나가면 원래대로
  container.addEventListener("mouseleave", () => {
    cards.forEach((card, index) => {
      gsap.to(card, {
        width: 530,
        y: index * 25,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(card.querySelector(".txt"), {
        opacity: 0,
        duration: 0.3,
      });
    });
  });
}
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    const cards = document.querySelectorAll(".con02 li");

    if (window.innerWidth > 1024) {
      // 데스크톱: 호버 활성화
      gsap.set(".con02 li", { pointerEvents: "auto" });
      gsap.set(".con02 li .txt", { opacity: 0 });

      // 카드 초기화
      cards.forEach((card, index) => {
        gsap.set(card, {
          width: 530,
          y: index * 25,
        });
      });

      setupAccordion();
    } else {
      // 태블릿/모바일: 호버 비활성화
      gsap.set(".con02 li", { pointerEvents: "none" });
      gsap.set(".con02 li .txt", { opacity: 1 });

      // 카드 초기화
      cards.forEach((card) => {
        gsap.set(card, {
          width: "auto",
          y: 0,
        });
      });
    }
  }, 250);
});

//con03
document.addEventListener("DOMContentLoaded", function () {
  if (window.gsap && window.ScrollTrigger) {
    gsap.set(".con03 .title", { x: -50, opacity: 0 });
    gsap.set(".con03 .textBox p", { x: 50, opacity: 0 });
    gsap.set(".con03 .global img", { scale: 0.5, opacity: 0 });
    gsap.set(".con03 .country-wrapper", { scale: 0.8, opacity: 0 });

    gsap.set(".con03 .country-info", { opacity: 0, display: "none" });

    // ScrollTrigger 타임라인
    const con03Tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".con03",
        start: "top center",
        toggleActions: "play none none none",
      },
    });

    // 등장 애니메이션
    con03Tl.to(
      ".con03 .title",
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      0
    );
    con03Tl.to(
      ".con03 .textBox p",
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      0
    );
    con03Tl.to(
      ".con03 .global img",
      { scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.7)" },
      0.5
    );
    con03Tl.to(
      ".con03 .country-wrapper",
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(2)",
      },
      1.0
    );
  }

  //gsap fade
  const wrappers = document.querySelectorAll(".country-wrapper");

  if (window.innerWidth > 768) {
    wrappers.forEach((wrapper) => {
      const btn = wrapper.querySelector(".country-btn");
      const countryName = wrapper.getAttribute("data-country");
      const infoBox = document.querySelector(
        `.country-info[data-country="${countryName}"]`
      );

      if (btn && infoBox) {
        btn.addEventListener("click", function () {
          document.querySelectorAll(".country-info").forEach((box) => {
            if (box !== infoBox) {
              gsap.to(box, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                  box.style.display = "none";
                },
              });
            }
          });

          document.querySelectorAll(".country-wrapper").forEach((w) => {
            if (w !== wrapper) {
              w.classList.remove("active");
              w.querySelector(".country-btn").classList.remove("active");
            }
          });

          const isHidden =
            infoBox.style.display === "none" ||
            (window.gsap && gsap.getProperty(infoBox, "opacity") < 0.1);

          if (isHidden) {
            // 보이기 (GSAP 페이드 인)
            infoBox.style.display = "block";
            gsap.to(infoBox, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            });

            btn.classList.add("active");
            wrapper.classList.add("active");
          } else {
            // 숨기기 (GSAP 페이드 아웃)
            gsap.to(infoBox, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => {
                infoBox.style.display = "none";
              },
            });

            btn.classList.remove("active");
            wrapper.classList.remove("active");
          }
        });
      }
    });
  }

  // 3. 모바일용

  const slider = document.querySelector(".mobile-global-slider");
  const slides = document.querySelectorAll(".country-slide");
  const sliderDotsContainer = document.querySelector(".slider-dots");

  // 자동 슬라이드 설정
  const AUTO_SLIDE_DELAY = 2000;
  let autoSlideInterval;
  let scrollTimeout;

  if (slider && slides.length > 0 && sliderDotsContainer) {
    let currentIndex = 0;
    const totalSlides = slides.length;

    // 인디케이터 생성
    function createDots() {
      sliderDotsContainer.innerHTML = "";
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.dataset.index = i;
        dot.addEventListener("click", () => {
          stopAutoSlide();
          goToSlide(i);
          startAutoSlide();
        });
        sliderDotsContainer.appendChild(dot);
      }
    }

    // 인디케이터 업데이트
    function updateDots() {
      const dots = document.querySelectorAll(".slider-dots .dot");
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // 특정 슬라이드로 이동
    function goToSlide(index) {
      if (index >= totalSlides) {
        index = 0;
      } else if (index < 0) {
        index = totalSlides - 1;
      }

      currentIndex = index;
      const scrollPosition = slides[currentIndex].offsetLeft;

      slider.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      updateDots();
    }

    // 다음 슬라이드로 이동
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    // 자동 슬라이드 시작
    function startAutoSlide() {
      if (autoSlideInterval) return;

      autoSlideInterval = setInterval(nextSlide, AUTO_SLIDE_DELAY);
    }

    // 자동 슬라이드 정지
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }

    // 이벤트 리스너: 마우스/스크롤 시 자동 슬라이드 제어
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    slider.addEventListener("scroll", () => {
      stopAutoSlide();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let closestIndex = 0;
        let minDiff = Infinity;
        const scrollLeft = slider.scrollLeft;

        slides.forEach((slide, index) => {
          const diff = Math.abs(slide.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
          }
        });

        if (currentIndex !== closestIndex) {
          currentIndex = closestIndex;
          updateDots();
        }

        startAutoSlide();
      }, 100);
    });

    // 초기화
    createDots();
    updateDots();
    startAutoSlide();
  }
});

// con04

// 화면 크기에 따른 초기 위치 설정
function getCardOffset04() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    return 0; // 모바일
  } else if (screenWidth <= 1024) {
    return 300; // 태블릿
  } else {
    return 530; // 데스크톱
  }
}

const offset04 = getCardOffset04();

// 초기 상태 설정 - 카드들을 가운데 겹쳐놓기
gsap.set(".con04 .imgBox li:nth-child(1)", {
  x: offset04,
  rotation: window.innerWidth <= 768 ? 0 : -10,
});

gsap.set(".con04 .imgBox li:nth-child(2)", {
  x: 0,
  rotation: 0,
});

gsap.set(".con04 .imgBox li:nth-child(3)", {
  x: -offset04,
  rotation: window.innerWidth <= 768 ? 0 : 10,
});

// 애니메이션 중 호버 비활성화
gsap.set(".con04 .imgBox li", {
  pointerEvents: "none",
});

// ESG 타이틀 - 왼쪽에서
gsap.from(".con04 .textBox .title", {
  x: -200,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con04",
    start: "top 80%",
  },
});

// 오른쪽 설명 텍스트 - 오른쪽에서
gsap.from(".con04 .textBox p", {
  x: 200,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con04",
    start: "top 80%",
  },
});

// 카드 1 - 펼쳐지기
gsap.to(".con04 .imgBox li:nth-child(1)", {
  x: 0,
  y: window.innerWidth > 1024 ? 0 : 0,
  rotation: 0,
  duration: 0.8,
  delay: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con04 .imgBox",
    start: "top 70%",
  },
});

// 카드 2 - 펼쳐지기
gsap.to(".con04 .imgBox li:nth-child(2)", {
  x: 0,
  y: window.innerWidth > 1024 ? 25 : 0,
  rotation: 0,
  duration: 0.8,
  delay: 0.4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con04 .imgBox",
    start: "top 70%",
  },
});

// 카드 3 - 펼쳐지기 + 호버 활성화
gsap.to(".con04 .imgBox li:nth-child(3)", {
  x: 0,
  y: window.innerWidth > 1024 ? 50 : 0,
  rotation: 0,
  duration: 0.8,
  delay: 0.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".con04 .imgBox",
    start: "top 70%",
  },
  onComplete: function () {
    // 애니메이션 완료 후 호버 활성화
    gsap.set(".con04 .imgBox li", { pointerEvents: "auto" });
  },
});

// con05

document.addEventListener("DOMContentLoaded", function () {
  // title 텍스트 - 오른쪽에서 왼쪽으로
  gsap.from(".con05 .textBox .title", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".con05",
      start: "top 80%",
    },
  });

  // All, Notice, News 섹션들 - 위에서 아래로 순차적으로
  gsap.from(".con05 .all", {
    y: -80,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".con05",
      start: "top 80%",
    },
  });

  gsap.from(".con05 .notice", {
    y: -80,
    opacity: 0,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".con05",
      start: "top 80%",
    },
  });

  gsap.from(".con05 .NEWS", {
    y: -80,
    opacity: 0,
    duration: 0.8,
    delay: 0.7,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".con05",
      start: "top 80%",
    },
  });

  // 탭 메뉴 스크롤 기능
  const listItems = document.querySelectorAll(".con05 .list li");
  const allSection = document.querySelector(".con05 .all");
  const noticeSection = document.querySelector(".con05 .notice");
  const newsSection = document.querySelector(".con05 .NEWS");

  listItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      listItems.forEach((li) => li.classList.remove("on"));

      item.classList.add("on");

      let targetSection;
      if (index === 0) {
        targetSection = allSection;
      } else if (index === 1) {
        targetSection = noticeSection;
      } else if (index === 2) {
        targetSection = newsSection;
      }

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 200;

    const allTop = allSection.offsetTop;
    const noticeTop = noticeSection.offsetTop;
    const newsTop = newsSection.offsetTop;

    listItems.forEach((li) => li.classList.remove("on"));

    if (scrollPosition >= newsTop) {
      listItems[2].classList.add("on");
    } else if (scrollPosition >= noticeTop) {
      listItems[1].classList.add("on");
    } else if (scrollPosition >= allTop) {
      listItems[0].classList.add("on");
    }
  });

  // 슬라이더 초기화 함수
  function initSlider(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const sliderTrack = container.querySelector(".alls");
    const slides = Array.from(sliderTrack.querySelectorAll(".slide"));
    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");
    const pagebar = container.querySelector(".pagebar");

    let currentIndex = 0;
    const total = slides.length;

    // 페이지 바 생성
    const pageCurrent = document.createElement("span");
    pageCurrent.classList.add("page-current");

    const pageBar = document.createElement("div");
    pageBar.classList.add("page-bar");
    pageBar.innerHTML = '<div class="fill"></div>';

    const pageTotal = document.createElement("span");
    pageTotal.classList.add("page-total");

    pagebar.appendChild(pageCurrent);
    pagebar.appendChild(pageBar);
    pagebar.appendChild(pageTotal);

    const progressFill = pageBar.querySelector(".fill");

    // 슬라이드에 내용 추가
    slides.forEach((slide) => {
      const content = document.createElement("div");
      content.classList.add("slide-content");

      const title = document.createElement("h3");
      title.classList.add("slide-title");
      title.textContent = slide.getAttribute("data-title");

      const desc = document.createElement("p");
      desc.classList.add("slide-desc");
      desc.textContent = slide.getAttribute("data-desc");

      content.appendChild(title);
      content.appendChild(desc);
      slide.appendChild(content);
    });

    function updateSlider() {
      // 모든 슬라이드에서 active 제거
      const allSlides = sliderTrack.querySelectorAll(".slide");
      allSlides.forEach((slide) => slide.classList.remove("active"));

      // 첫 번째 슬라이드에 active 추가
      allSlides[0].classList.add("active");

      // 페이지 번호 업데이트
      pageCurrent.textContent =
        currentIndex + 1 < 10 ? "0" + (currentIndex + 1) : currentIndex + 1;
      pageTotal.textContent = total < 10 ? "0" + total : total;

      // 진행바 업데이트
      const fillPercent = ((currentIndex + 1) / total) * 100;
      progressFill.style.width = fillPercent + "%";
    }

    // 다음 버튼
    nextBtn.addEventListener("click", () => {
      sliderTrack.appendChild(sliderTrack.firstElementChild);
      currentIndex = (currentIndex + 1) % total;
      updateSlider();
    });

    // 이전 버튼
    prevBtn.addEventListener("click", () => {
      sliderTrack.insertBefore(
        sliderTrack.lastElementChild,
        sliderTrack.firstElementChild
      );
      currentIndex = (currentIndex - 1 + total) % total;
      updateSlider();
    });

    // 슬라이드 클릭
    slides.forEach((slide) => {
      slide.addEventListener("click", () => {
        if (slide !== sliderTrack.firstElementChild) {
          while (sliderTrack.firstElementChild !== slide) {
            sliderTrack.appendChild(sliderTrack.firstElementChild);
            currentIndex = (currentIndex + 1) % total;
          }
          updateSlider();
        }
      });
    });

    // 초기화
    updateSlider();
  }

  // 각 슬라이더 초기화
  initSlider(".con05 .all");
  initSlider(".con05 .notice");
  initSlider(".con05 .NEWS");
});
// footer

document.addEventListener("DOMContentLoaded", function () {
  const familySiteBtn = document.querySelector(".familySite");
  const blackBox = document.querySelector(".blackBox");
  const topBtn = document.querySelector(".topBtn");
  let autoCloseTimer;

  // Family Site 버튼 클릭
  if (familySiteBtn && blackBox) {
    familySiteBtn.addEventListener("click", () => {
      // 토글
      const isActive = blackBox.classList.contains("show");

      if (isActive) {
        // 닫기
        blackBox.classList.remove("show");
        familySiteBtn.classList.remove("active");
        clearTimeout(autoCloseTimer);
      } else {
        // 열기
        blackBox.classList.add("show");
        familySiteBtn.classList.add("active");

        // 3초 후 자동 닫기
        autoCloseTimer = setTimeout(() => {
          blackBox.classList.remove("show");
          familySiteBtn.classList.remove("active");
        }, 3000);
      }
    });
  }

  // Top 버튼 클릭
  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
