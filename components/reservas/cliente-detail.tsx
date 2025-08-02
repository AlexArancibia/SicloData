"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  TrendingUp,
  Award,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { clientes, reservas, clases } from "@/lib/dummy-data"
import Link from "next/link"
import { useState } from "react"

interface ClienteDetailProps {
  clienteId: string
}

export default function ClienteDetail({ clienteId }: ClienteDetailProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const cliente = clientes.find((c) => c.id_cliente === clienteId)

  if (!cliente) {
    return <div>Cliente no encontrado</div>
  }

  // Obtener reservas del cliente
  const reservasCliente = reservas.filter((r) => r.id_cliente === clienteId)
  const clasesCliente = reservasCliente.map((r) => clases.find((c) => c.id_clase === r.id_clase)).filter(Boolean)

  // Estadísticas del cliente
  const ultimaReserva = reservasCliente.sort(
    (a, b) => new Date(b.fecha_reserva).getTime() - new Date(a.fecha_reserva).getTime(),
  )[0]
  const disciplinasUsadas = [...new Set(clasesCliente.map((c) => c?.disciplina))].filter(Boolean) as string[]
  const localesVisitados = [...new Set(clasesCliente.map((c) => c?.estudio))].filter(Boolean) as string[]
  
  // Calcular instructor preferido con mejor tipado
  const instructoresPreferidos: Record<string, number> = {}
  clasesCliente.forEach((clase) => {
    if (clase?.instructor) {
      instructoresPreferidos[clase.instructor] = (instructoresPreferidos[clase.instructor] || 0) + 1
    }
  })
  
  const instructorFavorito = Object.entries(instructoresPreferidos)
    .sort(([, a], [, b]) => b - a)[0]

  // Datos adicionales enriquecidos
  const gastoTotal = reservasCliente.length * 12 // €12 por clase promedio
  const frecuenciaPromedio = reservasCliente.length > 0 ? (reservasCliente.length / 12).toFixed(1) : "0" // clases por mes
  const tasaAsistencia = Math.floor(Math.random() * 15) + 85 // 85-100%

  // Paginación
  const totalPages = Math.ceil(reservasCliente.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReservas = reservasCliente.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/clientes">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Perfil de Cliente
        </h1>
      </div>

      {/* Header del cliente con información principal */}
      <Card className="border-slate-700 shadow-lg overflow-hidden" style={{ background: 'linear-gradient(to right, #475569, #64748b)' }}>
        <div className="p-6" style={{ background: 'linear-gradient(to right, #475569, #64748b)' }}>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-600 rounded-full flex items-center justify-center border-2 border-emerald-400/30">
              <span className="text-2xl font-bold text-white">
                {cliente.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{cliente.nombre}</h2>
              <p className="text-white">{cliente.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-emerald-600 text-white border-emerald-500 shadow-sm">
                  {reservasCliente.length} Reservas
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{reservasCliente.length}</div>
              <div className="text-white text-sm">Total Reservas</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gasto Total</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">€{gastoTotal}</p>
            <p className="text-green-600 dark:text-green-400 text-xs">€{(gastoTotal / 12).toFixed(0)}/mes promedio</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Frecuencia</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{frecuenciaPromedio}</p>
            <p className="text-blue-600 dark:text-blue-400 text-xs">clases/mes</p>
          </CardContent>
        </Card>

        {/* Instructor preferido */}
        {instructorFavorito ? (
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instructor Preferido</span>
              </div>
              <p className="text-lg font-bold mt-2 text-gray-900 dark:text-white truncate">{instructorFavorito[0]}</p>
              <p className="text-purple-600 dark:text-purple-400 text-xs">{instructorFavorito[1]} clases tomadas</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-800 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instructor Preferido</span>
              </div>
              <p className="text-lg font-bold mt-2 text-gray-900 dark:text-white">N/A</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Sin datos</p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disciplinas</span>
            </div>
            <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{disciplinasUsadas.length}</p>
            <p className="text-orange-600 dark:text-orange-400 text-xs">diferentes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información básica */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{cliente.email}</p>
              </div>
            </div>
            {cliente.telefono && (
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Teléfono</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-sm">{cliente.telefono}</p>
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha de Registro</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{cliente.fecha_registro}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Última Reserva</label>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <p className="text-sm">{ultimaReserva?.fecha_reserva || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disciplinas utilizadas */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle>Disciplinas Utilizadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {disciplinasUsadas.map((disciplina) => {
                const count = clasesCliente.filter((c) => c?.disciplina === disciplina).length
                const percentage = reservasCliente.length > 0 ? (count / reservasCliente.length) * 100 : 0
                return (
                  <div key={disciplina} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{disciplina}</span>
                      <span className="text-sm text-gray-600">
                        {count} clases ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Locales visitados */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle>Locales Visitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {localesVisitados.map((local) => {
                const count = clasesCliente.filter((c) => c?.estudio === local).length
                const percentage = reservasCliente.length > 0 ? (count / reservasCliente.length) * 100 : 0
                return (
                  <div key={local} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{local}</span>
                      <span className="text-sm text-gray-600">
                        {count} visitas ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial de reservas con tabla y paginación */}
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle>Historial de Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Estudio</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Fecha Clase</TableHead>
                  <TableHead>Fecha Reserva</TableHead>
                  <TableHead>Método Pago</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentReservas.map((reserva) => {
                  const clase = clases.find((c) => c.id_clase === reserva.id_clase)
                  return (
                    <TableRow key={reserva.id_reserva}>
                      <TableCell className="font-mono text-xs">{reserva.id_reserva}</TableCell>
                      <TableCell className="font-medium">{clase?.disciplina || "N/A"}</TableCell>
                      <TableCell>{clase?.estudio || "N/A"}</TableCell>
                      <TableCell>{clase?.instructor || "N/A"}</TableCell>
                      <TableCell>{reserva.fecha_clase}</TableCell>
                      <TableCell>{reserva.fecha_reserva}</TableCell>
                      <TableCell className="capitalize">{reserva.metodo_pago}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={reserva.estatus === "confirmada" ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {reserva.estatus}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, reservasCliente.length)} de {reservasCliente.length} reservas
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
