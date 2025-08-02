export interface Cliente {
  id_cliente: string
  email: string
  nombre: string
  telefono?: string
  fecha_registro: string
}

export interface Clase {
  id_clase: string
  pais: string
  ciudad: string
  disciplina: string
  estudio: string
  salon: string
  instructor: string
  dia: string
  hora: string
  cupos_totales: number
}

export interface Reserva {
  id_reserva: string
  id_clase: string
  id_cliente: string
  creador_pedido: string
  metodo_pago: string
  estatus: "confirmada" | "cancelada" | "pendiente"
  fecha_reserva: string
  fecha_clase: string
}

export interface Usuario {
  id_usuario: string
  nombre: string
  email: string
  rol: "admin" | "operador"
  fecha_creacion: string
}

export interface DateRange {
  from: Date
  to: Date
}
