import { orderExist } from './utils.js'
import { orderedItems } from './orderedItems.js'

let items = [
  {
    item: 'Egg Pancake',
    cost: 4.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem1.jpg',
  },
  {
    item: 'Scrambled Eggs',
    cost: 7.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem2.jpg',
  },
  {
    item: 'Brown Bread with Coffee',
    cost: 3.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem3.jpg',
  },
  {
    item: 'Rice, Fried Chicken, and Salad',
    cost: 6.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem4.jpg',
  },
  {
    item: 'Saucy Pasta',
    cost: 5.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem5.jpg',
  },
  {
    item: 'Dim Sum with Wine',
    cost: 7.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem6.jpg',
  },
  {
    item: 'Cremated Grill Steak',
    cost: 9.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem7.jpg',
  },
  {
    item: 'Grilled Steak with Fries',
    cost: 11.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem8.jpg',
  },
  {
    item: 'Barbecued Kebab',
    cost: 6.99,
    quantity: 0,
    total: 0,
    src: 'assets/images/fooditem9.jpg',
  },
]

export function copyItems() {
  return items.slice()
}

const cards = document.querySelector('.cards')

cards.addEventListener('click', function (event) {
  const target = event.target
  if (!target.classList.contains('btn-order')) return

  const input = target.closest('.card').querySelector('input')
  if (input.value <= 0) return alert('Quantity must be at least 1')

  const quantity = parseFloat(input.value)
  const item = target.getAttribute('data-item')
  const cost = parseFloat(target.getAttribute('data-cost'))

  orderedItems(item, quantity)
  updateItems(item, cost, quantity)
  updateTotal()

  input.value = ''
})

function updateItems(itemName, cost, quantity) {
  items = items.map(item =>
    item.item === itemName
      ? { ...item, quantity: quantity, total: cost * quantity }
      : item
  )
}
let paidAmount
let change
const payAmount = document.querySelector('.payAmount')
const payBtn = document.querySelector('.payBtn')
payBtn.addEventListener('click', () => {
  if (orderExist()) return alert('Empty order')

  let sum = getSum()
  change = (parseFloat(payAmount.value) - sum).toFixed(2)
  if (isNaN(change)) {
    alert('Enter cash amount')
  } else if (change < 0) {
    alert(`Customer is short of $${change}`)
  } else {
    alert(`Thanks for ordering! Here's your $${change} change`)
    paidAmount = payAmount.value
    payAmount.value = ''
    items.map(item => item.price === 0)
  }
})

function getSum() {
  let sum = items.reduce((sum, item) => sum + item.total, 0)
  return sum.toFixed(2)
}

function updateTotal() {
  let sum = getSum()
  const totalElement = document.querySelector('.total')
  totalElement.textContent = `Total: $${sum}`
}

const clearBtn = document.querySelector('.clearBtn')
clearBtn.addEventListener('click', clearConsole)

function clearConsole() {
  const result = confirm('Do you want to proceed')
  if (result) {
    const inputs = document.querySelectorAll('input:not(.search-input)')
    inputs.forEach(input => (input.value = ''))

    const receipt = document.querySelector('.receipt')
    receipt.innerHTML = ''

    const totalElement = document.querySelector('.total')
    totalElement.textContent = 'Total: '
    resetItems()
  }
}

function resetItems() {
  items.map(item => {
    item.quantity = 0
    item.total = 0
  })
}

displaySearchResults(items)

// SEARCH FUNCTIONS

// Function to filter items based on search query
function filterItems(query) {
  return items.filter(item =>
    item.item.toLowerCase().includes(query.toLowerCase())
  )
}

function displaySearchResults(results) {
  const cards = document.querySelector('.cards')
  cards.innerHTML = ''

  results.forEach(item => {
    const card = document.createElement('div')
    card.innerHTML = `          
          <div class="card">
            <img
              src=${item.src}
              class="card-img-top"
              alt=${item.item}
            />
            <div class="card-body">
              <h5 class="card-title">${item.item}</h5>
              
              <div class="card-description">
                <p class="card-text">$${item.cost}</p>
                <input
                  type="number"
                  placeholder="Enter how many"
                  class="form-control"
                  min="0"
                  max="1500"
                />
                <div class="btn-container">
                  <button
                    class="btn btn-primary btn-order"
                    data-item='${item.item}'
                    data-cost=${item.cost}
                  >
                    Add to order
                  </button>
                </div
              </div>
            </div>
          </div>`
    cards.appendChild(card)
  })
}

// Event listener for the search input field
const searchInput = document.getElementById('searchInput')
searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value.trim()
  const filteredItems = filterItems(searchQuery)
  displaySearchResults(filteredItems)
})

const printer = document.querySelector('.printer-btn')
printer.addEventListener('click', () => {
  function printReceipt() {
    let content = `
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .receipt-container {
            max-width: 300px;
            margin: 20px auto;
            padding: 10px;
            border: 1px solid #ccc;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          .receipt-header {
            text-align: center;
            margin-bottom: 10px;
          }
          .receipt-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
          }
          .receipt-table th,
          .receipt-table td {
            border: 1px solid #ccc;
            padding: 8px;
          }
          .receipt-footer {
            margin-top: 10px;
            text-align: right;
          }
          footer {
            text-align: center;
          }
        </style>
        <div class="receipt-container">
          <div class="receipt-header">
            <h1>Sizzle & Spice Steakhouse</h1>
          </div>
          <table class="receipt-table">
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>`
    let subtotal = 0
    items.forEach(item => {
      if (item.quantity > 0) {
        content += `<tr><td>${item.item}</td><td>${
          item.quantity
        }</td><td>$${item.total.toFixed(2)}</td></tr>`
        subtotal += item.total
      }
    })

    content += `
          </table>
          <div class="receipt-footer">
            <div><strong>Total: $${subtotal.toFixed(2)}</strong></div>
            <div>Received: $${parseFloat(paidAmount)}</div>
            <div>Change: $${parseFloat(change)}</div>
          </div>
          <hr>
          <br>
          <footer>Enjoy your meal 💃</footer>
          <br>
        </div>
      </body>
      </html>`

    const printWindow = window.open('', '_blank')
    printWindow.document.open()
    printWindow.document.write(content)
    printWindow.document.close()

    // Set the icon
    const iconLink = printWindow.document.createElement('link')
    iconLink.setAttribute('rel', 'icon')
    iconLink.setAttribute('href', '/assets/images/logo/logo.svg')
    printWindow.document.head.appendChild(iconLink)

    printWindow.document.title = 'Sizzle & Spice Receipt'

    printWindow.print()
  }

  printReceipt()
})
