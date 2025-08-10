"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { reservas, clases } from "@/lib/dummy-data"

export default function ComprasPorMes() {
  // Simular datos de compras por mes del año actual
  const comprasPorMes = [
    { mes: "Enero", compras: 156, ingresos: 1872, clientes: 89, color: "from-blue-500 to-blue-600", tendencia: "up" },
    { mes: "Febrero", compras: 142, ingresos: 1704, clientes: 76, color: "from-purple-500 to-purple-600", tendencia: "down" },
    { mes: "Marzo", compras: 178, ingresos: 2136, clientes: 98, color: "from-green-500 to-green-600", tendencia: "up" },
    { mes: "Abril", compras: 165, ingresos: 1980, clientes: 92, color: "from-yellow-500 to-yellow-600", tendencia: "down" },
    { mes: "Mayo", compras: 189, ingresos: 2268, clientes: 105, color: "from-pink-500 to-pink-600", tendencia: "up" },
    { mes: "Junio", compras: 203, ingresos: 2436, clientes: 118, color: "from-indigo-500 to-indigo-600", tendencia: "up" },
    { mes: "Julio", compras: 187, ingresos: 2244, clientes: 103, color: "from-red-500 to-red-600", tendencia: "down" },
    { mes: "Agosto", compras: 145, ingresos: 1740, clientes: 78, color: "from-orange-500 to-orange-600", tendencia: "down" },
    { mes: "Septiembre", compras: 198, ingresos: 2376, clientes: 112, color: "from-teal-500 to-teal-600", tendencia: "up" },
    { mes: "Octubre", compras: 212, ingresos: 2544, clientes: 125, color: "from-cyan-500 to-cyan-600", tendencia: "up" },
    { mes: "Noviembre", compras: 195, ingresos: 2340, clientes: 108, color: "from-emerald-500 to-emerald-600", tendencia: "down" },
    { mes: "Diciembre", compras: 168, ingresos: 2016, clientes: 95, color: "from-rose-500 to-rose-600", tendencia: "down" },
  ]

  const totalCompras = comprasPorMes.reduce((sum, mes) => sum + mes.compras, 0)
  const totalIngresos = comprasPorMes.reduce((sum, mes) => sum + mes.ingresos, 0)
  const totalClientes = comprasPorMes.reduce((sum, mes) => sum + mes.clientes, 0)
  const promedioCompras = totalCompras / 12
  const promedioIngresos = totalIngresos / 12

  // Encontrar mejor y peor mes
  const mejorMes = comprasPorMes.reduce((max, mes) => mes.compras > max.compras ? mes : max)
  const peorMes = comprasPorMes.reduce((min, mes) => mes.compras < min.compras ? mes : min)

  // Calcular tendencias
  const tendencias = {
    up: comprasPorMes.filter(mes => mes.tendencia === "up").length,
    down: comprasPorMes.filter(mes => mes.tendencia === "down").length,
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Compras por Mes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Resumen general */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalCompras}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Compras</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">S/{totalIngresos}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Ingresos Totales</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{totalClientes}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Total Clientes</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">S/{promedioIngresos.toFixed(0)}</div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Promedio/Mes</div>
            </div>
          </div>

          {/* Mejor y peor mes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Mejor Mes</span>
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{mejorMes.mes}</div>
              <div className="text-sm text-green-700 dark:text-green-300">
                {mejorMes.compras} compras • S/{mejorMes.ingresos}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-red-600" />
                <span className="font-medium text-sm">Menor Actividad</span>
              </div>
              <div className="text-2xl font-bold text-red-900 dark:text-red-100">{peorMes.mes}</div>
              <div className="text-sm text-red-700 dark:text-red-300">
                {peorMes.compras} compras • S/{peorMes.ingresos}
              </div>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comprasPorMes} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor:'#1f2937',border:'none',borderRadius:'8px',color:'#f9fafb'}} formatter={(value:any, name:any)=>(name==='ingresos'?`S/${value}`:value)} />
                <Bar dataKey="compras" name="Compras" fill="#3b82f6" radius={[4,4,0,0]} />
                <Bar dataKey="ingresos" name="Ingresos (S/)" fill="#10b981" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Análisis de tendencias */}
          <p className="text-xs text-gray-500 mt-4">Meses con crecimiento: {tendencias.up} • Promedio Ingresos: S/{promedioIngresos.toFixed(0)}</p>

          {/* Insights */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-indigo-600" />
              <span className="font-medium text-sm">Análisis Anual</span>
            </div>
            <div className="text-sm text-indigo-700 dark:text-indigo-300 space-y-2">
              <p>• <strong>Octubre</strong> registra el mayor volumen de ventas (212 compras)</p>
              <p>• <strong>Agosto</strong> presenta la menor actividad debido a vacaciones (145 compras)</p>
              <p>• Los meses de <strong>verano</strong> muestran una tendencia a la baja</p>
              <p>• <strong>Septiembre-Octubre</strong> marcan el pico de actividad del año</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 