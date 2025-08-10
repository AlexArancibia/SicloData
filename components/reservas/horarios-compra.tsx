"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, TrendingUp, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { reservas, clases } from "@/lib/dummy-data"

export default function HorariosCompra() {
  // Simular datos de compras por horario
  const horariosCompra = [
    { 
      rango: "06:00 - 09:00", 
      nombre: "Mañana Temprana",
      compras: 89, 
      ingresos: 1068, 
      clientes: 67, 
      color: "from-blue-500 to-blue-600", 
      tendencia: "up",
      porcentaje: 15.2
    },
    { 
      rango: "09:00 - 12:00", 
      nombre: "Mañana",
      compras: 156, 
      ingresos: 1872, 
      clientes: 98, 
      color: "from-green-500 to-green-600", 
      tendencia: "up",
      porcentaje: 26.7
    },
    { 
      rango: "12:00 - 15:00", 
      nombre: "Mediodía",
      compras: 134, 
      ingresos: 1608, 
      clientes: 89, 
      color: "from-yellow-500 to-yellow-600", 
      tendencia: "stable",
      porcentaje: 22.9
    },
    { 
      rango: "15:00 - 18:00", 
      nombre: "Tarde",
      compras: 178, 
      ingresos: 2136, 
      clientes: 112, 
      color: "from-orange-500 to-orange-600", 
      tendencia: "up",
      porcentaje: 30.4
    },
    { 
      rango: "18:00 - 21:00", 
      nombre: "Noche",
      compras: 98, 
      ingresos: 1176, 
      clientes: 76, 
      color: "from-purple-500 to-purple-600", 
      tendencia: "down",
      porcentaje: 16.7
    },
    { 
      rango: "21:00 - 00:00", 
      nombre: "Noche Tardía",
      compras: 45, 
      ingresos: 540, 
      clientes: 32, 
      color: "from-red-500 to-red-600", 
      tendencia: "down",
      porcentaje: 7.7
    },
  ]

  const totalCompras = horariosCompra.reduce((sum, horario) => sum + horario.compras, 0)
  const totalIngresos = horariosCompra.reduce((sum, horario) => sum + horario.ingresos, 0)
  const totalClientes = horariosCompra.reduce((sum, horario) => sum + horario.clientes, 0)
  
  // Encontrar mejor y peor horario
  const mejorHorario = horariosCompra.reduce((max, horario) => horario.compras > max.compras ? horario : max)
  const peorHorario = horariosCompra.reduce((min, horario) => horario.compras < min.compras ? horario : min)

  // Calcular tendencias
  const tendencias = {
    up: horariosCompra.filter(horario => horario.tendencia === "up").length,
    down: horariosCompra.filter(horario => horario.tendencia === "down").length,
    stable: horariosCompra.filter(horario => horario.tendencia === "stable").length,
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Horarios de Compra
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
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{mejorHorario.rango}</div>
              <div className="text-sm text-orange-700 dark:text-orange-300">Horario Pico</div>
            </div>
          </div>

          {/* Mejor y peor horario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Horario de Mayor Actividad</span>
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">{mejorHorario.nombre}</div>
              <div className="text-sm text-green-700 dark:text-green-300">
                {mejorHorario.compras} compras • S/{mejorHorario.ingresos}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-red-600" />
                <span className="font-medium text-sm">Horario de Menor Actividad</span>
              </div>
              <div className="text-2xl font-bold text-red-900 dark:text-red-100">{peorHorario.nombre}</div>
              <div className="text-sm text-red-700 dark:text-red-300">
                {peorHorario.compras} compras • S/{peorHorario.ingresos}
              </div>
            </div>
          </div>

          {/* Gráfico por horario */}
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={horariosCompra} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="nombre" type="category" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{backgroundColor:'#1f2937',border:'none',borderRadius:'8px',color:'#f9fafb'}} formatter={(value:any)=>[value,'Compras']} />
                <Bar dataKey="compras" name="Compras" fill="#3b82f6" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Indicador simple */}
          <p className="text-xs text-gray-500 mt-4">Horarios con crecimiento: {tendencias.up} • Estables: {tendencias.stable} • Bajada: {tendencias.down}</p>

          {/* Insights */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-indigo-600" />
              <span className="font-medium text-sm">Insights de Horarios</span>
            </div>
            <div className="text-sm text-indigo-700 dark:text-indigo-300 space-y-2">
              <p>• <strong>15:00 - 18:00</strong> es el horario de mayor actividad (30.4% de las compras)</p>
              <p>• <strong>21:00 - 00:00</strong> presenta la menor demanda (7.7% de las compras)</p>
              <p>• Los horarios <strong>matutinos</strong> muestran tendencias de crecimiento</p>
              <p>• <strong>Jueves</strong> es el día con mayor actividad en todos los horarios</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 