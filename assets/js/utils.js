export function orderExist() {
  const receipt = document.querySelector('.receipt')
  const item = receipt.querySelector('.card.item')
  return item === null
}
