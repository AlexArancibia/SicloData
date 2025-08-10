"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, Calendar, Clock, DollarSign, Package, ShoppingCart } from "lucide-react"
import { clientes, reservas, clases } from "@/lib/dummy-data"
import { useState } from "react"

interface HistorialComprasClienteProps {
  clienteId: string
}

export default function HistorialComprasCliente({ clienteId }: HistorialComprasClienteProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const cliente = clientes.find((c) => c.id_cliente === clienteId)
  const reservasCliente = reservas.filter((r) => r.id_cliente === clienteId)
  const clasesCliente = reservasCliente.map((r) => clases.find((c) => c.id_clase === r.id_clase)).filter(Boolean)

  if (!cliente) return null

  // Estadísticas de compras
  const totalCompras = reservasCliente.length
  const gastoTotal = totalCompras * 12 // S/ 12 por clase promedio
  const promedioPorCompra = gastoTotal / totalCompras

  // Análisis por método de pago
  const metodosPago = reservasCliente.reduce((acc, reserva) => {
    acc[reserva.metodo_pago] = (acc[reserva.metodo_pago] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Análisis por mes
  const comprasPorMes = reservasCliente.reduce((acc, reserva) => {
    const mes = new Date(reserva.fecha_reserva).getMonth()
    const nombreMes = new Date(0, mes).toLocaleDateString('es-ES', { month: 'long' })
    acc[nombreMes] = (acc[nombreMes] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Análisis por horario
  const comprasPorHorario = reservasCliente.reduce((acc, reserva) => {
    const clase = clases.find((c) => c.id_clase === reserva.id_clase)
    if (clase) {
      const hora = parseInt(clase.hora.split(':')[0])
      if (hora < 12) acc.mañana = (acc.mañana || 0) + 1
      else if (hora < 18) acc.tarde = (acc.tarde || 0) + 1
      else acc.noche = (acc.noche || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  // Análisis por disciplina
  const comprasPorDisciplina = clasesCliente.reduce((acc, clase) => {
    if (clase) {
      acc[clase.disciplina] = (acc[clase.disciplina] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  // Paginación
  const totalPages = Math.ceil(reservasCliente.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReservas = reservasCliente.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header con estadísticas principales */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <ShoppingCart className="h-5 w-5" />
            Historial de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalCompras}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Compras</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">S/{gastoTotal}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Gasto Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">S/{promedioPorCompra.toFixed(0)}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Promedio/Compra</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{cliente.fecha_registro}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Cliente desde</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Métodos de pago */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Métodos de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(metodosPago).map(([metodo, cantidad]) => {
                const porcentaje = (cantidad / totalCompras) * 100
                return (
                  <div key={metodo} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{metodo}</span>
                      <span className="text-sm text-gray-600">
                        {cantidad} compras ({porcentaje.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={porcentaje} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Compras por disciplina */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Compras por Disciplina
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(comprasPorDisciplina).map(([disciplina, cantidad]) => {
                const porcentaje = (cantidad / totalCompras) * 100
                return (
                  <div key={disciplina} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{disciplina}</span>
                      <span className="text-sm text-gray-600">
                        {cantidad} compras ({porcentaje.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={porcentaje} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análisis temporal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compras por mes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Compras por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(comprasPorMes)
                .sort(([, a], [, b]) => b - a)
                .map(([mes, cantidad]) => {
                  const porcentaje = (cantidad / totalCompras) * 100
                  return (
                    <div key={mes} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">{mes}</span>
                        <span className="text-sm text-gray-600">
                          {cantidad} compras ({porcentaje.toFixed(0)}%)
                        </span>
                      </div>
                      <Progress value={porcentaje} className="h-2" />
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>

        {/* Compras por horario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Compras por Horario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(comprasPorHorario).map(([horario, cantidad]) => {
                const porcentaje = (cantidad / totalCompras) * 100
                return (
                  <div key={horario} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{horario}</span>
                      <span className="text-sm text-gray-600">
                        {cantidad} compras ({porcentaje.toFixed(0)}%)
                      </span>
                    </div>
                    <Progress value={porcentaje} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla detallada de compras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Detalle de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Compra</TableHead>
                  <TableHead>Disciplina</TableHead>
                  <TableHead>Estudio</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Fecha Clase</TableHead>
                  <TableHead>Fecha Compra</TableHead>
                  <TableHead>Método Pago</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Precio</TableHead>
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
                      <TableCell className="font-medium">€12</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Mostrando {startIndex + 1} a {Math.min(endIndex, reservasCliente.length)} de {reservasCliente.length} compras
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 p-0 text-sm border rounded ${
                          currentPage === page ? 'bg-blue-600 text-white' : ''
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 