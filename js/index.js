window.addEventListener("DOMContentLoaded", function () {
  // Tabs

  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items")

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide")
      item.classList.remove("show", "fade")
    })

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active")
    })
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade")
    tabsContent[i].classList.remove("hide")
    tabs[i].classList.add("tabheader__item_active")
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener("click", function (event) {
    const target = event.target
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })

  // Timer

  const deadline = "2023-06-11"

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24)

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
      return "0" + num
    } else {
      return num
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
      const t = getTimeRemaining(endtime)

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)

      if (t.total <= 0) {
        clearInterval(timeInterval)
      }
    }
  }

  setClock(".timer", deadline)

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]")

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal)
  })

  function closeModal() {
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow = ""
  }

  function openModal() {
    modal.classList.add("show")
    modal.classList.remove("hide")
    document.body.style.overflow = "hidden"
    clearInterval(modalTimerId)
  }

  modalCloseBtn.addEventListener("click", closeModal)

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal()
    }
  })

  const modalTimerId = setTimeout(openModal, 3000)

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal()
      window.removeEventListener("scroll", showModalByScroll)
    }
  }
  window.addEventListener("scroll", showModalByScroll)

  // использование картосчек на классах

  class menuCart {
    constructor(src, alt, title, description, price, classCard) {
      this.src = src
      this.alt = alt
      this.title = title
      this.description = description
      this.price = price
      this.classCard = document.querySelector(classCard)
      this.exchangeRates = 35
      this.converter()
    }

    converter() {
      this.price = this.price * this.exchangeRates
    }
    render() {
      const element = document.createElement("div")
      element.innerHTML = `
				<div class="menu__item">
					<img src=${this.src} alt=${this.alt} />
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.description}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> 🪙/день</div>
					</div>
				</div>
			`
      this.classCard.append(element)
    }
  }

  new menuCart(
    "img/tabs/vegy.jpg",
    "vegy",
    `Меню "Фитнес"`,
    `
		Меню &laquo;Фитнес&raquo;&nbsp;&mdash; это новый подход к&nbsp;приготовлению блюд:
		больше свежих овощей и&nbsp;фруктов. Продукт активных и&nbsp;здоровых людей. Это
		абсолютно новый продукт с&nbsp;оптимальной ценой и высоким качеством!
	`,
    9,
    `.menu .container`
  ).render()

  new menuCart(
    "img/tabs/elite.jpg",
    "elite",
    `Меню “Премиум”`,
    `
		В&nbsp;меню &laquo;Премиум&raquo; мы&nbsp;используем не&nbsp;только красивый дизайн
    упаковки, но&nbsp;и&nbsp;качественное исполнение блюд. Красная рыба, морепродукты,
    фрукты&nbsp;&mdash; ресторанное меню без похода в ресторан!
	`,
    11,
    `.menu .container`
  ).render()

  new menuCart(
    "img/tabs/post.jpg",
    "post",
    `Меню "Постное"`,
    `
		Меню &laquo;Постное&raquo;&nbsp;&mdash; это тщательный подбор ингредиентов: полное
		отсутствие продуктов животного происхождения, молоко из&nbsp;миндаля, овса, кокоса или
		гречки, правильное количество белков за&nbsp;счет тофу и&nbsp;импортных вегетарианских
		стейков.
	`,
    12,
    `.menu .container`
  ).render()
})
