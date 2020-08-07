import { ToDo } from "./todo.class";
// para el contador de tareas pendientes (fuera de curso):
import { countToDo } from "../js/componentes";

export class ToDoList {
  constructor() {
    // this.toDos = [];
    this.cargarLocalStorage();
    // contador tareas pendientes
    this.countToDo();
  }

  nuevoToDo(toDo) {
    this.toDos.push(toDo);
    this.guardarLocalStorage();
    this.cargarLocalStorage();
  }

  eliminarToDo(id) {
    this.toDos = this.toDos.filter(toDo => toDo.id != id);
    this.guardarLocalStorage();
    this.countToDo();
  }

  marcarCompletado(id) {
    for(const toDo of this.toDos) {
      if(toDo.id == id) {
        toDo.completado = !toDo.completado;
        this.guardarLocalStorage();
        this.countToDo();
        break;
      }
    }
  }

  eliminarCompletados() {
    this.toDos = this.toDos.filter(toDo => !toDo.completado);
    this.guardarLocalStorage();
  }

  // || LOCALSTORAGE
  guardarLocalStorage() {
    localStorage.setItem('toDo', JSON.stringify(this.toDos));
  }

  cargarLocalStorage() {
    // if(!localStorage.getItem('toDo')) {
    //   this.toDos = [];
    //   console.log('cargarLocal:', this.toDos);
    // } else {
    //   this.toDos = JSON.parse(localStorage.getItem('toDo'));
    //   console.log('cargarLocal:', this.toDos);
    // }
    this.toDos = (!localStorage.getItem('toDo'))
                 ? []
                 : JSON.parse(localStorage.getItem('toDo'));

    // this.toDos = this.toDos.map(obj => ToDo.fromJson(obj));
    this.toDos = this.toDos.map(ToDo.fromJson);
  }

  // para el contador de tareas pendientes
  countToDo() {
    let pendientes = 0;
    let countBox = countToDo.firstElementChild;
    for (let toDo of this.toDos) {
      (!toDo.completado === true) ? pendientes++ : null;
    }
    countBox.innerHTML = pendientes;
  }
}