import { State } from "./state.js";
// ----------------------------------------------------

const body = document.querySelector("body");

class Todolist {
  constructor(todolist) {
    this.todolist = this.createTodolist(todolist);
    this.render = this.render.bind(this);
  }

  createTodolist(todolist) {
    const newTodolist = document.createElement("div");
    newTodolist.id = todolist;
    newTodolist.style.marginTop = "100px";
    return newTodolist;
  }

  render(state, oldValue, todos) {
    this.todolist.innerHTML = "";
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

      console.log(state);

      this.todolist.appendChild(todo);
    });
  }
}

const todolist1 = new Todolist("todolist1");
const todolist2 = new Todolist("todolist2");
window.todolist1 = todolist1;
window.todolist2 = todolist2;
body.appendChild(todolist1.todolist);
body.appendChild(todolist2.todolist);

const todos1 = new State([]);
const todos2 = new State([]);

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
  const newState = todos.state.filter((todo) => todo.id !== id);
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

todos1.sub(todolist1.render.bind(this));
todos2.sub(todolist2.render);
