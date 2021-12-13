import { State, state, callbacks, setup, setSate, sub } from "./state.js";
// ----------------------------------------------------

const todolist = document.getElementById("todolist");
const todolist2 = document.getElementById("todolist2");

const todos1 = new State([], []);
const todos2 = new State([], []);
todos1.setup([]);
todos2.setup([]);
// console.log(setup);
window.todos1 = todos1;
window.todos2 = todos2;

const todo = {
  id: "",
  title: "",
  isChecked: false,
};

window.addTodo = addTodo;

function addTodo(todos, title) {
  if (title === "") {
    alert("無");
    return;
  }

  if (title.length > 10) {
    alert("太長");
    return;
  }

  const newTodo = { ...todo, id: new Date().getTime().toString(), title };
  todos.setSate([...todos.state, newTodo]);
}

function deleteTodo(todos, id) {
  const newState = state.filter((todo) => todo.id !== id);
  todos.setSate(newState);
}

function toggleTodo(todos, id) {
  const newState = todos.state.map((todo) => {
    if (todo.id === id) {
      return { ...todo, isChecked: !todo.isChecked };
    }
    return todo;
  });

  todos.setSate(newState);
}

function editTodo(todos, id, newTitle) {
  const newState = todos.state.map((todo) => {
    if (todo.id === id) {
      return { ...todo, title: newTitle };
    }
    return todo;
  });

  todos.setSate(newState);
}

function render1(state, oldValue, todos) {
  todolist.innerHTML = "";
  state.forEach((item) => {
    const todo = document.createElement("div");

    todo.innerHTML = `
            <input type="checkbox" checked=${item.isChecked} />
            <h3>${item.title}</h3>
            <button class="delete">delete</button>
            <button class="edit">edit</button>  
        `;

    const deleteBtn = todo.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
      deleteTodo(todos, item.id);
    });

    const editBtn = todo.querySelector(".edit");
    editBtn.addEventListener("click", () => {
      todo.innerHTML = `
            <input type='text' value=${item.title} />
            <button class="delete">delete</button>
            <button class="edit">edit</button>
        `;

      const Input = todo.querySelector("input");
      Input.addEventListener("blur", () => {
        if (Input.value === "") {
          editTodo(todos, item.id, item.title);
          return;
        }

        const confirmEdit = confirm("確定編輯?");
        editTodo(todos, item.id, confirmEdit ? Input.value : item.title);
      });
    });

    todolist.appendChild(todo);
  });
}

function render2(state, oldValue, todos) {
  todolist2.innerHTML = "";
  state.forEach((item) => {
    const todo = document.createElement("div");

    todo.innerHTML = `
            <input type="checkbox" checked=${item.isChecked} />
            <h3>${item.title}</h3>
            <button class="delete">delete</button>
            <button class="edit">edit</button>  
        `;

    const deleteBtn = todo.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
      deleteTodo(todos, item.id);
    });

    const editBtn = todo.querySelector(".edit");
    editBtn.addEventListener("click", () => {
      todo.innerHTML = `
            <input type='text' value=${item.title} />
            <button class="delete">delete</button>
            <button class="edit">edit</button>
        `;

      const Input = todo.querySelector("input");
      Input.addEventListener("blur", () => {
        if (Input.value === "") {
          editTodo(todos, item.id, item.title);
          return;
        }

        const confirmEdit = confirm("確定編輯?");
        editTodo(todos, item.id, confirmEdit ? Input.value : item.title);
      });
    });

    todolist2.appendChild(todo);
  });
}

todos1.sub(render1);
todos2.sub(render2);
