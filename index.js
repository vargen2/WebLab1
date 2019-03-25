async function loader() {
    return fetch('https://opentdb.com/api_category.php')
        .then(res => res.json())
        .then(json => json.trivia_categories)
}

async function sort(categories) {
    categories.sort((a, b) => {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    })
    return categories
}

async function populateCategorySelector(categories) {
    const categorySelect = document.getElementById('category')
    for (const category of categories) {
        var option = document.createElement("option")
        option.text = category.name
        option.value = category.id
        categorySelect.add(option)
    }
}

window.addEventListener('load', () => {
    loader().then(sort).then(populateCategorySelector)
})