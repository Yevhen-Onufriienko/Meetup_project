import { eventsStore } from "./data.js"
import { createEventElement } from "./utils.js"

const eventsBox = document.querySelector(".events")

eventsStore.forEach((eventData) => {
  const element = createEventElement(eventData)
  eventsBox.append(element)
})

const distanceSelect = document.getElementById("distance-select")

distanceSelect.addEventListener("change", (e) => {
  const value = Number(e.target.value)
  if (Number.isNaN(value)) {
    eventsStore.forEach((eventData) => {
      const element = createEventElement(eventData)
      eventsBox.append(element)
    })
  } else {
    const filteredData = eventsStore.filter((event) => {
      return event.distance === value
    })
    eventsBox.innerHTML = ""

    if (filteredData.length === 0) {
      eventsBox.textContent = "нет данных"
    }
    filteredData.forEach((eventData) => {
      const element = createEventElement(eventData)
      eventsBox.append(element)
    })
  }
})


////////////////////////////


// renderEvents(eventsStore)

// const distanceSelect = document.getElementById("distance-select")

// distanceSelect.addEventListener("change", (e) => {
//   const value = Number(e.target.value)
//   if (Number.isNaN(value)) {
//     renderEvents(eventsStore)
//   } else {
//     const filteredData = eventsStore.filter((event) => {
//       return event.distance === value
//     })

//     if (filteredData.length === 0) {
//       document.querySelector(".events").textContent = "нет данных"
//     } else {
//       renderEvents(filteredData)
//     }
//   }
// })