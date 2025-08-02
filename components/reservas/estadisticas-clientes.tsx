"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from "@/components/ui/data-table"
import type { DateRange } from "@/lib/types"
import { Users, UserX, Trophy, Calendar, Eye, TrendingUp, TrendingDown, Activity, Clock, Target, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface EstadisticasClientesProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
}

export function EstadisticasClientes({ dateRange, onDateRangeChange }: EstadisticasClientesProps) {
  const [mesesInactividad, setMesesInactividad] = useState("3")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Datos dummy expandidos para las tablas
  const usuariosInactivos = [
    {
      id: "1",
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      ultimaReserva: "2023-10-15",
      totalReservas: 12,
      mesesInactivo: 3,
      disciplinaFavorita: "Yoga",
      valorCliente: "€180",
    },
    {
      id: "2",
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      ultimaReserva: "2023-09-22",
      totalReservas: 8,
      mesesInactivo: 4,
      disciplinaFavorita: "Siclo",
      valorCliente: "€120",
    },
    {
      id: "3",
      nombre: "Lucía Fernández",
      email: "lucia.fernandez@email.com",
      ultimaReserva: "2023-08-30",
      totalReservas: 15,
      mesesInactivo: 5,
      disciplinaFavorita: "Barre",
      valorCliente: "€225",
    },
    {
      id: "4",
      nombre: "Roberto Silva",
      email: "roberto.silva@email.com",
      ultimaReserva: "2023-07-18",
      totalReservas: 6,
      mesesInactivo: 6,
      disciplinaFavorita: "Ejercito",
      valorCliente: "€90",
    },
    {
      id: "5",
      nombre: "Patricia Díaz",
      email: "patricia.diaz@email.com",
      ultimaReserva: "2023-06-25",
      totalReservas: 20,
      mesesInactivo: 7,
      disciplinaFavorita: "Yoga",
      valorCliente: "€300",
    },
    {
      id: "6",
      nombre: "Miguel Santos",
      email: "miguel.santos@email.com",
      ultimaReserva: "2023-05-12",
      totalReservas: 9,
      mesesInactivo: 8,
      disciplinaFavorita: "Siclo",
      valorCliente: "€135",
    },
    {
      id: "7",
      nombre: "Carmen Vega",
      email: "carmen.vega@email.com",
      ultimaReserva: "2023-04-28",
      totalReservas: 14,
      mesesInactivo: 9,
      disciplinaFavorita: "Barre",
      valorCliente: "€210",
    },
  ]

  const usuariosDosVeces = [
    {
      id: "6",
      nombre: "Pedro González",
      email: "pedro.gonzalez@email.com",
      reservas: 2,
      fechaRegistro: "2024-01-10",
      ultimaReserva: "2024-01-20",
      disciplinas: ["Siclo", "Yoga"],
      probabilidadRetencion: "85%",
    },
    {
      id: "7",
      nombre: "Isabel Moreno",
      email: "isabel.moreno@email.com",
      reservas: 2,
      fechaRegistro: "2024-01-05",
      ultimaReserva: "2024-01-18",
      disciplinas: ["Barre"],
      probabilidadRetencion: "72%",
    },
    {
      id: "8",
      nombre: "Miguel Ángel",
      email: "miguel.angel@email.com",
      reservas: 2,
      fechaRegistro: "2023-12-20",
      ultimaReserva: "2024-01-15",
      disciplinas: ["Ejercito", "Siclo"],
      probabilidadRetencion: "91%",
    },
    {
      id: "9",
      nombre: "Sofía Castro",
      email: "sofia.castro@email.com",
      reservas: 2,
      fechaRegistro: "2023-12-15",
      ultimaReserva: "2024-01-12",
      disciplinas: ["Yoga", "Barre"],
      probabilidadRetencion: "88%",
    },
    {
      id: "10",
      nombre: "Alejandro Ruiz",
      email: "alejandro.ruiz@email.com",
      reservas: 2,
      fechaRegistro: "2023-12-08",
      ultimaReserva: "2024-01-08",
      disciplinas: ["Siclo"],
      probabilidadRetencion: "65%",
    },
    {
      id: "11",
      nombre: "María López",
      email: "maria.lopez@email.com",
      reservas: 2,
      fechaRegistro: "2023-12-01",
      ultimaReserva: "2024-01-05",
      disciplinas: ["Yoga", "Ejercito"],
      probabilidadRetencion: "78%",
    },
  ]

  const topUsuarios = [
    {
      id: "9",
      nombre: "María García",
      email: "maria.garcia@email.com",
      reservas: 45,
      mesActual: 8,
      disciplinasFrecuentes: ["Siclo", "Yoga", "Barre"],
      localFavorito: "Síclo Chamberí",
      gasto: "€540",
      tendencia: "up",
      valorLifetime: "€2,340",
    },
    {
      id: "10",
      nombre: "Juan López",
      email: "juan.lopez@email.com",
      reservas: 38,
      mesActual: 6,
      disciplinasFrecuentes: ["Yoga", "Ejercito"],
      localFavorito: "Síclo Eixample",
      gasto: "€456",
      tendencia: "up",
      valorLifetime: "€1,890",
    },
    {
      id: "11",
      nombre: "Carmen Ruiz",
      email: "carmen.ruiz@email.com",
      reservas: 32,
      mesActual: 5,
      disciplinasFrecuentes: ["Barre", "Yoga"],
      localFavorito: "Síclo Malasaña",
      gasto: "€384",
      tendencia: "stable",
      valorLifetime: "€1,560",
    },
    {
      id: "12",
      nombre: "Diego Herrera",
      email: "diego.herrera@email.com",
      reservas: 28,
      mesActual: 4,
      disciplinasFrecuentes: ["Siclo", "Ejercito"],
      localFavorito: "Síclo Chamberí",
      gasto: "€336",
      tendencia: "down",
      valorLifetime: "€1,320",
    },
    {
      id: "13",
      nombre: "Sofia Vega",
      email: "sofia.vega@email.com",
      reservas: 25,
      mesActual: 4,
      disciplinasFrecuentes: ["Yoga", "Barre"],
      localFavorito: "Síclo Eixample",
      gasto: "€300",
      tendencia: "up",
      valorLifetime: "€1,180",
    },
    {
      id: "14",
      nombre: "Fernando López",
      email: "fernando.lopez@email.com",
      reservas: 23,
      mesActual: 3,
      disciplinasFrecuentes: ["Siclo", "Yoga"],
      localFavorito: "Síclo Chamberí",
      gasto: "€276",
      tendencia: "up",
      valorLifetime: "€1,150",
    },
  ]

  const usuariosDosDisciplinas = [
    {
      id: "14",
      nombre: "Elena Castro",
      email: "elena.castro@email.com",
      disciplinas: ["Siclo", "Yoga"],
      reservasSiclo: 12,
      reservasYoga: 8,
      totalReservas: 20,
      fechaUltima: "2024-01-22",
      valorPromedio: "€15.50",
      frecuencia: "2.3x/semana",
    },
    {
      id: "15",
      nombre: "Fernando López",
      email: "fernando.lopez@email.com",
      disciplinas: ["Barre", "Ejercito"],
      reservasBarre: 15,
      reservasEjercito: 6,
      totalReservas: 21,
      fechaUltima: "2024-01-21",
      valorPromedio: "€14.20",
      frecuencia: "1.8x/semana",
    },
    {
      id: "16",
      nombre: "Cristina Morales",
      email: "cristina.morales@email.com",
      disciplinas: ["Yoga", "Siclo", "Barre"],
      reservasYoga: 10,
      reservasSiclo: 8,
      reservasBarre: 5,
      totalReservas: 23,
      fechaUltima: "2024-01-20",
      valorPromedio: "€16.80",
      frecuencia: "2.7x/semana",
    },
    {
      id: "17",
      nombre: "Andrés Jiménez",
      email: "andres.jimenez@email.com",
      disciplinas: ["Siclo", "Ejercito"],
      reservasSiclo: 14,
      reservasEjercito: 7,
      totalReservas: 21,
      fechaUltima: "2024-01-19",
      valorPromedio: "€15.90",
      frecuencia: "2.1x/semana",
    },
    {
      id: "18",
      nombre: "Natalia Vega",
      email: "natalia.vega@email.com",
      disciplinas: ["Yoga", "Barre"],
      reservasYoga: 11,
      reservasBarre: 9,
      totalReservas: 20,
      fechaUltima: "2024-01-18",
      valorPromedio: "€14.60",
      frecuencia: "1.9x/semana",
    },
    {
      id: "19",
      nombre: "Roberto Silva",
      email: "roberto.silva@email.com",
      disciplinas: ["Siclo", "Yoga", "Ejercito"],
      reservasSiclo: 8,
      reservasYoga: 6,
      reservasEjercito: 4,
      totalReservas: 18,
      fechaUltima: "2024-01-17",
      valorPromedio: "€13.40",
      frecuencia: "1.5x/semana",
    },
  ]

  const usuariosDobletean = [
    {
      id: "17",
      nombre: "Alejandro Ruiz",
      email: "alejandro.ruiz@email.com",
      fechasDobles: ["2024-01-15", "2024-01-20", "2024-01-22"],
      totalDobles: 3,
      disciplinasDobles: ["Siclo + Yoga", "Barre + Ejercito"],
      ultimoDoble: "2024-01-22",
      gastoPromedio: "€28.50",
      frecuencia: "1x/semana",
    },
    {
      id: "18",
      nombre: "Valentina Torres",
      email: "valentina.torres@email.com",
      fechasDobles: ["2024-01-18", "2024-01-21"],
      totalDobles: 2,
      disciplinasDobles: ["Yoga + Barre"],
      ultimoDoble: "2024-01-21",
      gastoPromedio: "€26.00",
      frecuencia: "0.8x/semana",
    },
    {
      id: "19",
      nombre: "Carlos Mendoza",
      email: "carlos.mendoza@email.com",
      fechasDobles: ["2024-01-16", "2024-01-19", "2024-01-23"],
      totalDobles: 3,
      disciplinasDobles: ["Siclo + Ejercito", "Yoga + Barre"],
      ultimoDoble: "2024-01-23",
      gastoPromedio: "€32.00",
      frecuencia: "1.2x/semana",
    },
    {
      id: "20",
      nombre: "Ana Martínez",
      email: "ana.martinez@email.com",
      fechasDobles: ["2024-01-14", "2024-01-17"],
      totalDobles: 2,
      disciplinasDobles: ["Siclo + Yoga"],
      ultimoDoble: "2024-01-17",
      gastoPromedio: "€24.50",
      frecuencia: "0.7x/semana",
    },
  ]

  // Cálculos de métricas
  const totalInactivos = usuariosInactivos.length
  const totalTopUsuarios = topUsuarios.length
  const totalMultiDisciplina = usuariosDosDisciplinas.length
  const totalDobletean = usuariosDobletean.length
  
  const valorPerdidoInactivos = usuariosInactivos.reduce((sum, user) => sum + parseInt(user.valorCliente.replace('€', '')), 0)
  const valorTopUsuarios = topUsuarios.reduce((sum, user) => sum + parseInt(user.gasto.replace('€', '')), 0)
  const valorMultiDisciplina = usuariosDosDisciplinas.reduce((sum, user) => sum + (parseFloat(user.valorPromedio.replace('€', '')) * user.totalReservas), 0)

  // Funciones de paginación
  const getPaginatedData = (data: any[], page: number, perPage: number) => {
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    return data.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(usuariosInactivos.length / itemsPerPage)

  // Función para descargar Excel
  const downloadExcel = (data: any[], filename: string) => {
    // Simulación de descarga Excel
    console.log(`Descargando ${filename} con ${data.length} registros`)
    // Aquí iría la lógica real de exportación a Excel
  }

  return (
    <div className="space-y-6">
      {/* Métricas principales compactas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">Inactivos</p>
                <p className="text-2xl font-bold text-red-800 dark:text-red-200">{totalInactivos}</p>
                <p className="text-xs text-red-600 dark:text-red-400">€{valorPerdidoInactivos} perdidos</p>
              </div>
              <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Top Clientes</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">{totalTopUsuarios}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">€{valorTopUsuarios} este mes</p>
              </div>
              <Trophy className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Multi-disciplina</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{totalMultiDisciplina}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">€{Math.round(valorMultiDisciplina)} valor</p>
              </div>
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Dobletean</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{totalDobletean}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Alto valor</p>
              </div>
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Layout de dos columnas compacto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna izquierda */}
        <div className="space-y-6">
          {/* Usuarios Inactivos - Compacto con paginación */}
          <Card className="border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <UserX className="h-4 w-4 text-red-600" />
                    Usuarios Inactivos
                    <Badge variant="secondary" className="text-xs">{totalInactivos}</Badge>
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={mesesInactividad} onValueChange={setMesesInactividad}>
                    <SelectTrigger className="w-20 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1m</SelectItem>
                      <SelectItem value="2">2m</SelectItem>
                      <SelectItem value="3">3m</SelectItem>
                      <SelectItem value="6">6m</SelectItem>
                      <SelectItem value="12">12m</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => downloadExcel(usuariosInactivos, 'usuarios-inactivos')}
                    className="h-8 px-3"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Cliente</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Última</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Valor</th>
                      <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {getPaginatedData(usuariosInactivos, currentPage, itemsPerPage).map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-3 py-2">
                          <div>
                            <div className="font-medium text-xs">{usuario.nombre}</div>
                            <div className="text-xs text-gray-500">{usuario.disciplinaFavorita}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">{usuario.ultimaReserva}</td>
                        <td className="px-3 py-2 text-xs font-medium text-red-600">{usuario.valorCliente}</td>
                        <td className="px-3 py-2 text-right">
                          <Link href={`/clientes/${usuario.id}`}>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Paginación */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500">
                  Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, usuariosInactivos.length)} de {usuariosInactivos.length}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <span className="text-xs px-2">{currentPage} de {totalPages}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-7 w-7 p-0"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usuarios con 2 Reservas - Compacto con paginación */}
          <Card className="border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  Nuevos Clientes
                  <Badge variant="secondary" className="text-xs">{usuariosDosVeces.length}</Badge>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadExcel(usuariosDosVeces, 'nuevos-clientes')}
                  className="h-8 px-3"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Cliente</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Retención</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Disciplinas</th>
                      <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {usuariosDosVeces.slice(0, 5).map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-3 py-2">
                          <div>
                            <div className="font-medium text-xs">{usuario.nombre}</div>
                            <div className="text-xs text-gray-500">{usuario.ultimaReserva}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <Badge 
                            variant={parseInt(usuario.probabilidadRetencion) > 80 ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {usuario.probabilidadRetencion}
                          </Badge>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-1">
                            {usuario.disciplinas.slice(0, 2).map((disc) => (
                              <span key={disc} className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                                {disc}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Link href={`/clientes/${usuario.id}`}>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha */}
        <div className="space-y-6">
          {/* Top Usuarios - Compacto con paginación */}
          <Card className="border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-emerald-600" />
                  Top Clientes
                  <Badge variant="secondary" className="text-xs">{totalTopUsuarios}</Badge>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadExcel(topUsuarios, 'top-clientes')}
                  className="h-8 px-3"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Cliente</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Reservas</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Gasto</th>
                      <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">Tendencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {topUsuarios.slice(0, 5).map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-3 py-2">
                          <div>
                            <div className="font-medium text-xs">{usuario.nombre}</div>
                            <div className="text-xs text-gray-500">{usuario.localFavorito}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div>
                            <div className="text-xs font-medium">{usuario.reservas}</div>
                            <div className="text-xs text-gray-500">{usuario.mesActual} este mes</div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div>
                            <div className="text-xs font-medium text-emerald-600">{usuario.gasto}</div>
                            <div className="text-xs text-gray-500">{usuario.valorLifetime}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right">
                          {usuario.tendencia === 'up' && <TrendingUp className="h-4 w-4 text-emerald-600" />}
                          {usuario.tendencia === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                          {usuario.tendencia === 'stable' && <Activity className="h-4 w-4 text-gray-600" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Usuarios Multi-disciplina - Compacto con paginación */}
          <Card className="border border-gray-200/50 dark:border-gray-700/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  Multi-disciplina
                  <Badge variant="secondary" className="text-xs">{totalMultiDisciplina}</Badge>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => downloadExcel(usuariosDosDisciplinas, 'multi-disciplina')}
                  className="h-8 px-3"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Cliente</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Frecuencia</th>
                      <th className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Valor</th>
                      <th className="px-3 py-2 text-right font-medium text-gray-700 dark:text-gray-300">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {usuariosDosDisciplinas.slice(0, 5).map((usuario) => (
                      <tr key={usuario.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-3 py-2">
                          <div>
                            <div className="font-medium text-xs">{usuario.nombre}</div>
                            <div className="text-xs text-gray-500">{usuario.disciplinas.length} disciplinas</div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div>
                            <div className="text-xs font-medium">{usuario.frecuencia}</div>
                            <div className="text-xs text-gray-500">{usuario.totalReservas} total</div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div>
                            <div className="text-xs font-medium text-purple-600">{usuario.valorPromedio}</div>
                            <div className="text-xs text-gray-500">por clase</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <Link href={`/clientes/${usuario.id}`}>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sección de insights adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Tiempo Promedio</p>
                <p className="text-lg font-bold text-blue-600">2.3 meses</p>
                <p className="text-xs text-gray-500">entre reservas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Retención</p>
                <p className="text-lg font-bold text-emerald-600">78%</p>
                <p className="text-xs text-gray-500">después de 2 reservas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Target className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Valor Promedio</p>
                <p className="text-lg font-bold text-purple-600">€15.40</p>
                <p className="text-xs text-gray-500">por reserva</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
