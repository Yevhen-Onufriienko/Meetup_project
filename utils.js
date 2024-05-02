export const createEventElement = (data) => {
  const element = document.createElement("div")
  element.textContent = data.title
  return element
}
