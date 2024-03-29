export function orderedItems(itemName, quantity) {
  const receipt = document.querySelector('.receipt')
  const items = receipt.querySelectorAll('.card.item')

  let itemExists = false
  items.forEach(item => {
    const h5 = item.querySelector('h5')
    if (h5.innerText === itemName) {
      itemExists = true
      const p = item.querySelector('p')
      p.innerText = `Qty: ${quantity}`
    }
  })

  if (!itemExists) {
    createTicket(itemName, quantity)
  }
}

function createTicket(itemName, quantity) {
  const receipt = document.querySelector('.receipt')

  const ticket = document.createElement('div')
  ticket.classList.add('card', 'item')

  const item = document.createElement('h5')
  item.innerText = itemName

  const qty = document.createElement('p')
  qty.innerText = `Qty: ${quantity}`

  ticket.appendChild(item)
  ticket.appendChild(qty)
  receipt.appendChild(ticket)
}
