"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { reservas, clases } from "@/lib/dummy-data"

export default function DiasMasVentas() {
  // Simular datos de ventas por día de la semana
  const ventasPorDia = [
    { dia: "Lunes", ventas: 45, porcentaje: 18, color: "from-blue-500 to-blue-600", tendencia: "up" },
    { dia: "Martes", ventas: 52, porcentaje: 21, color: "from-green-500 to-green-600", tendencia: "up" },
    { dia: "Miércoles", ventas: 38, porcentaje: 15, color: "from-purple-500 to-purple-600", tendencia: "down" },
    { dia: "Jueves", ventas: 61, porcentaje: 24, color: "from-orange-500 to-orange-600", tendencia: "up" },
    { dia: "Viernes", ventas: 58, porcentaje: 23, color: "from-red-500 to-red-600", tendencia: "up" },
    { dia: "Sábado", ventas: 35, porcentaje: 14, color: "from-indigo-500 to-indigo-600", tendencia: "stable" },
    { dia: "Domingo", ventas: 22, porcentaje: 9, color: "from-gray-500 to-gray-600", tendencia: "down" },
  ]

  const totalVentas = ventasPorDia.reduce((sum, dia) => sum + dia.ventas, 0)
  const diaMasVentas = ventasPorDia.reduce((max, dia) => dia.ventas > max.ventas ? dia : max)
  const promedioVentas = totalVentas / 7

  // Calcular tendencias
  const tendencias = {
    up: ventasPorDia.filter(dia => dia.tendencia === "up").length,
    down: ventasPorDia.filter(dia => dia.tendencia === "down").length,
    stable: ventasPorDia.filter(dia => dia.tendencia === "stable").length,
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Días de Mayor Ventas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Resumen general */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalVentas}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Ventas</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{promedioVentas.toFixed(0)}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Promedio/Día</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{diaMasVentas.dia}</div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Mejor Día</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{diaMasVentas.ventas}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Ventas Máximas</div>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ventasPorDia} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dia" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor:'#1f2937',border:'none',borderRadius:'8px',color:'#f9fafb'}} formatter={(value:any)=>[value,'Ventas']} />
                <Bar dataKey="ventas" name="Ventas" fill="#f59e0b" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-gray-500 mt-4">Días crecimiento: {tendencias.up} • Bajada: {tendencias.down}</p>

          {/* Insights */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-sm">Insights de Ventas</span>
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <p>• <strong>Jueves</strong> es el día con mayor actividad comercial (24% de las ventas)</p>
              <p>• <strong>Domingo</strong> presenta la menor demanda (9% de las ventas)</p>
              <p>• Los días <strong>laborables</strong> concentran el 76% de las ventas totales</p>
              <p>• <strong>Martes y Viernes</strong> muestran tendencias consistentes de crecimiento</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 