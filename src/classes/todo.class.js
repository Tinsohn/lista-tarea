export class ToDo {
  static fromJson({tarea, id, completado, fechaCreacion}) {
    const toDoTemp = new ToDo(tarea);

    toDoTemp.id            = id;
    toDoTemp.completado    = completado;
    toDoTemp.fechaCreacion = fechaCreacion;

    return toDoTemp;
  }

  constructor(tarea) {
    this.tarea = tarea;

    this.id            = new Date().getTime();
    this.completado    = false;
    this.fechaCreacion = new Date();
  }
}