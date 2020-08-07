import { ToDo, ToDoList } from '../classes';
import { toDoList } from '../index';

//REFERENCIAS EN EL HTML
const ulToDoList           = document.querySelector('.todo-list');
const txtInput             = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros            = document.querySelector('.filters');
const anchorFiltros        = document.querySelectorAll('.filtro');
// fuera de curso (para el contador de tareas pendientes):
export const countToDo = document.querySelector('.todo-count');


export const crearToDoHtml = (toDo) => {
  const htmlToDo = `
    <li class="${(toDo.completado) ? 'completed' : ''}" data-id="${toDo.id}">
      <div class="view">
        <input class="toggle" type="checkbox" "${(toDo.completado) ? 'checked' : ''}">
        <label>${toDo.tarea}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
    </li>
  `;

  const div = document.createElement('div');
  div.innerHTML = htmlToDo;

  ulToDoList.append(div.firstElementChild); // para que guarde solo el li y no el div

  return div.firstElementChild;
}


// || EVENTOS
txtInput.addEventListener('keyup', (event) => {
  // console.log(event);

  // Enter -> keyCode: 13, key: "Enter"
  if(event.keyCode === 13 && txtInput.value.length > 0) {
    // console.log(txtInput.value);
    const nuevoToDo = new ToDo(txtInput.value);
    toDoList.nuevoToDo(nuevoToDo);

    crearToDoHtml(nuevoToDo);
    txtInput.value = '';
  }
});

ulToDoList.addEventListener('click', (event) => {
  // console.log('click');
  // console.log(event.target.localName);
  const nombreElemento = event.target.localName; // input, label, button son los que tiene divTodoList
  const toDoElemento   = event.target.parentElement.parentElement; // parentElement selecciona al padre
  const toDoId         = toDoElemento.getAttribute('data-id');

  if(nombreElemento.includes('input')) { // Click en el check, marcar completado
    toDoList.marcarCompletado(toDoId);
    toDoElemento.classList.toggle('completed'); // toggle para quitar o añadir
  } else if(nombreElemento.includes('button')) { // Click en la X, borrar todo
    toDoList.eliminarToDo(toDoId);
    ulToDoList.removeChild(toDoElemento); // elimina el li
  }

  // console.log((toDoList));
});

btnBorrarCompletados.addEventListener('click', () => {
  toDoList.eliminarCompletados();
  
  for(let i = ulToDoList.children.length-1; i >= 0; i--) {
    const elemento = ulToDoList.children[i];

    if(elemento.classList.contains('completed')) {
      ulToDoList.removeChild(elemento);
    }
  }
});

ulFiltros.addEventListener('click', (event) => {
  const filtro = event.target.text;

  if(!filtro){ return; }

  anchorFiltros.forEach(elem => elem.classList.remove('selected'));
  event.target.classList.add('selected');

  for(const elemento of ulToDoList.children) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch(filtro) {
      case 'Pendientes':
        if(completado) {
          elemento.classList.add('hidden');
        }
        break;
      case 'Completados':
        if(!completado) {
          elemento.classList.add('hidden');
        }
        break;
    }
  }
})