interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

let todos: Todo[] = [];

function render() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.textContent = todo.text;

    textSpan.onclick = () => {
      startEditing(todo.id, textSpan);
    };

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.title = 'Toggle Complete';
    completeBtn.textContent = todo.completed ? '↺' : '✓';
    completeBtn.onclick = () => {
      toggleComplete(todo.id);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Delete Task';
    deleteBtn.textContent = '×';
    deleteBtn.onclick = () => {
      deleteTodo(todo.id);
    };

    li.appendChild(textSpan);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

function addTodo(text: string) {
  if (text.trim() === '') return;
  todos.push({ id: Date.now(), text: text.trim(), completed: false });
  render();
}

function toggleComplete(id: number) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  render();
}

function deleteTodo(id: number) {
  todos = todos.filter(todo => todo.id !== id);
  render();
}

function startEditing(id: number, textSpan: HTMLElement) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const li = textSpan.parentElement as HTMLLIElement;
  textSpan.style.display = 'none';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = todo.text;
  li.insertBefore(input, textSpan);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'save-btn';
  saveBtn.textContent = 'Save';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'cancel-btn';
  cancelBtn.textContent = 'Cancel';

  li.insertBefore(saveBtn, textSpan.nextSibling);
  li.insertBefore(cancelBtn, saveBtn.nextSibling);

  input.focus();
  input.select();

  function cleanup() {
    li.removeChild(input);
    li.removeChild(saveBtn);
    li.removeChild(cancelBtn);
    textSpan.style.display = '';
  }

  function saveChanges() {
    const newText = input.value.trim();
    if (newText.length > 0) {
      updateTodo(id, newText);
    }
    cleanup();
  }

  saveBtn.onclick = () => {
    saveChanges();
  };

  cancelBtn.onclick = () => {
    cleanup();
  };

  input.onkeydown = (e) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      cleanup();
    }
  };
}

function updateTodo(id: number, newText: string) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  render();
}

addBtn.onclick = () => {
  addTodo(todoInput.value);
  todoInput.value = '';
  todoInput.focus();
};

todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

render();
