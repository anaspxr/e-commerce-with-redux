async function handleAdd(data, type) {
  const response = await fetch(`http://localhost:3000/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    alert("Added new product successfully!");
  } else {
    alert("Error");
  }
  return response;
}

async function handleEdit(data, type, id) {
  const response = await fetch(`http://localhost:3000/${type}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    alert("Edited product successfully!");
  } else {
    alert("Error");
  }
  return response;
}

async function handleDelete(id, type) {
  const response = await fetch(`http://localhost:3000/${type}/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    alert("Deleted product successfully!");
  } else {
    alert("Error");
  }
  return response;
}

export { handleAdd, handleEdit, handleDelete };
