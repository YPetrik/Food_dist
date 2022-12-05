window.addEventListener("DOMContentLoaded", () => {
  // TABS
  const tabsContent = document.querySelectorAll(".tabcontent")
  const tabs = document.querySelectorAll(".tabheader__item")
  const tabsParent = document.querySelector(".tabheader__items")

  function hideTabContent() {
    tabsContent.forEach((el) => {
      el.classList.add("hide")
      el.classList.remove("show", "fade")
    })

    tabs.forEach((el) => {
      el.classList.remove("tabheader__item_active")
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade")
    tabsContent[i].classList.remove("hide")
    tabs[i].classList.add("tabheader__item_active")
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener("click", (e) => {
    e.preventDefault()
    const target = e.target
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((el, i) => {
        if (target === el) {
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })

  //TIMER

  const finishSalesDay = "2023-12-24"

  function getAllTime(deadline) {
    const t = Date.parse(deadline) - Date.parse(new Date())
    const days = Math.floor(t / (1000 * 60 * 60 * 24))
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((t / 1000 / 60) % 60)
    const seconds = Math.floor((t / 1000) % 60)

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector)
    const days = document.querySelector("#days")
    const hours = document.querySelector("#hours")
    const minutes = document.querySelector("#minutes")
    const seconds = document.querySelector("#seconds")

    timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
      const t = getAllTime(endtime)

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.total <= 0) {
        clearInterval(timeInterval)
      }
    }
  }
  setClock(".timer", finishSalesDay)
})
