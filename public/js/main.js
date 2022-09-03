const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

const options = {
  valueNames: ['title', 'dueDate', 'priority'],
};

const todoList = new List('todoList', options);

const events = (() => {
  const getId = (e) => e.parentElement.parentElement.parentElement.dataset.id;

  // ? Add new project button
  const addProjectBtn = () => {
    const addProjectBtn = document.querySelector('#add-project');
    const addProjectForm = document.querySelector('#add-project-form');

    //  ? Cancel new project form
    const cancelBtn = () => {
      const cancelBtn = document.querySelector('#cancel-btn');
      cancelBtn.addEventListener('click', () => {
        addProjectForm.classList.add('hidden');
        addProjectBtn.textContent = 'Add project';
      });
    };

    addProjectBtn.addEventListener('click', () => {
      addProjectForm.classList.toggle('hidden');
      addProjectBtn.textContent = '';
      cancelBtn();
    });
  };

  const deleteBtn = () => {
    const deleteBtn = document.querySelectorAll('.delete-btn');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        serverRequest.deleteItem(getId(e.target));
      });
    });
  };

  const init = () => {
    addProjectBtn();
    deleteBtn();
  };

  return { init };
})();

events.init();

const serverRequest = (() => {
  const deleteItem = async (id) => {
    const res = await fetch('todos/items', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: id,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      const msg = document.querySelector('#msg');
      msg.innerHTML = json;
      setTimeout(() => {
        msg.remove();
        window.location.reload(true);
      }, 1000);
    }
  };

  return {
    deleteItem,
  };
})();

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener('click', deleteTodo);
});

Array.from(todoItem).forEach((el) => {
  el.addEventListener('click', markComplete);
});

Array.from(todoComplete).forEach((el) => {
  el.addEventListener('click', markIncomplete);
});

async function deleteTodo() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/deleteTodo', {
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/markComplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id;
  try {
    const response = await fetch('todos/markIncomplete', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
