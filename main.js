// GET REQUEST
function getTodos() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => showOutput(response))
    .catch((err) => console.log(err));
}

// POST REQUEST
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "Nice",
    })
    .then((response) => showOutput(response))
    .catch((err) => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Nice Morning",
      body: "Lots of Love",
    })
    .then((response) => showOutput(response))
    .catch((err) => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => showOutput(response))
    .catch((err) => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(axios.spread((todos, post) => showOutput(post)))
    .catch((err) => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "jwt token",
    },
  };

  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "Nice",
      },
      config
    )
    .then((response) => showOutput(response))
    .catch((err) => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.default.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };
  axios(options)
    .then((response) => showOutput(response))
    .catch((err) => console.log(err));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todgos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(axios.spread((todos, post) => showOutput(post)))
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.headers);
        console.log(err.response.status);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
