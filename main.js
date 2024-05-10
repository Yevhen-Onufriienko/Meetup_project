import { eventsStore } from "./data.js"
import { createEventElement } from "./utils.js"

const selectType = document.getElementById("type-event")
const selectDist = document.getElementById("distance")
const selectCat = document.getElementById("categories")
const eventBlock = document.querySelector(".events-block")

const createEl = ({ tag, className, text, ...attrs }) => {
  const element = document.createElement(tag)
  element.className = className
  element.textContent = text
  Object.keys(attrs).forEach((attr) => {
    element.setAttribute(attr, attrs[attr])
  })
  return element
}

function formatDate(dateString) {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  }
  const date = new Date(dateString)
  const formattedDate = date.toLocaleString("en-US", options)
  return formattedDate
}

function getEvents() {
  const eventType = selectType.value
  let eventDistance
  if (selectDist.value !== "any-type") {
    eventDistance = parseInt(selectDist.value)
  }
  let eventCategory = ""
  if (selectCat.value !== "any-category") {
    eventCategory = selectCat.value
  }

  document.querySelectorAll(".card2").forEach((element) => {
    element.remove()
  })

  eventsStore.forEach((e) => {
    if (
      (eventType === "any" || e.type === eventType) &&
      (!eventDistance || e.distance <= eventDistance) &&
      (!eventCategory || e.category.includes(eventCategory))
    ) {
      const card = createEl({ tag: "div", className: "card2" })
      const cardImg = createEl({
        tag: "img",
        className: "card2-image",
        src: e.image,
      })
      const cardText = createEl({ tag: "div", className: "card-text" })
      const cardDate = createEl({
        tag: "span",
        className: "date2",
        text: formatDate(e.date),
      })
      const cardTitle = createEl({
        tag: "span",
        className: "card2-title",
        text: e.title,
      })
      const cardCat = createEl({
        tag: "span",
        className: "card-cat",
        text: e.category,
      })
      const cardDistance = createEl({
        tag: "span",
        className: "card2-distance",
        text: ` (${e.distance} km)`,
      })
      cardDistance.prepend(cardCat)
      cardText.append(cardDate, cardTitle, cardDistance)
      card.append(cardImg, cardText)
      if (e.attendees) {
        const attendees = createEl({
          tag: "span",
          className: "attendees",
          text: e.attendees + " attendees",
        })
        cardText.append(attendees)
      }
      eventBlock.append(card)
    }
  })
}

selectType.addEventListener("change", getEvents)
selectDist.addEventListener("change", getEvents)
selectCat.addEventListener("change", getEvents)

getEvents()
