
function loaderXhr () {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (xhr.status === 200) {
        parse(this.responseText).then(sort).then(populateCategorySelector)
      } else {
        window.location.href = 'error.html'
      }
    }
  }

  xhr.open('GET', 'https://opentdb.com/api_category.php', true)
  xhr.send()
}

async function parse (response) {
  return JSON.parse(response).trivia_categories
}

async function sort (categories) {
  categories.sort((a, b) => {
    var x = a.name.toLowerCase()
    var y = b.name.toLowerCase()
    if (x < y) { return -1 }
    if (x > y) { return 1 }
    return 0
  })
  return categories
}

async function populateCategorySelector (categories) {
  const categorySelect = document.getElementById('category')
  for (const category of categories) {
    var option = document.createElement('option')
    option.text = category.name
    option.value = category.id
    categorySelect.add(option)
  }
}

window.addEventListener('load', () => {
  loaderXhr()
})
