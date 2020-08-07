import './styles.css';

import { ToDo, ToDoList } from './classes'
import { crearToDoHtml } from './js/componentes';
// import { Todo } from "./classes/todo.class";
// import { TodoList } from './classes/todo-list.class';

export const toDoList = new ToDoList();

//toDoList.toDos.forEach(toDo => crearToDoHtml(toDo)); // se puede escribir de la siguiente manera:
toDoList.toDos.forEach( crearToDoHtml ); // esto funciona solo si la función o el método recibe un solo argumento, como en este caso

console.log(toDoList.toDos);

/**
 * LOCAL STORAGE Y SESSION STORAGE
 * 
 * - El sessionStorage pierde su información luego de cerrar el navegador. El localStorage la mantiene indefinidamente hasta que la borre uno o lo haga la app
 */
// localStorage.setItem('mi-key', 'ABC123');
// sessionStorage.setItem('mi-key', 'ABC1234'); // funciona exactamente igual

// setTimeout( () => {
//   localStorage.removeItem('mi-key');
// }, 1500);