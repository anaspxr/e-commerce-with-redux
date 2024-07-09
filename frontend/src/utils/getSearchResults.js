//? Function to get search results based on query,data and search items
// the search item is an array of properties to search for in the data
export default function getSearchResults(data, query, searchItems) {
  if (query === "") {
    return data;
  }
  return data
    ? data.filter((item) =>
        searchItems.some((searchItem) =>
          item[searchItem].toLowerCase().includes(query.toLowerCase())
        )
      )
    : [];
}
