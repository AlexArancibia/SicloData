"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, TrendingDown, Target } from "lucide-react"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, Bar } from 'recharts'

export function AnalisisIngresos() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("mes")

  // Datos dummy para análisis de ingresos
  const generarDatosIngresos = (periodo: string) => {
    if (periodo === "mes") {
      return [
        { fecha: "Ene", ingresos: 12500, reservas: 450, promedio: 27.8, crecimiento: 12.5 },
        { fecha: "Feb", ingresos: 13800, reservas: 485, promedio: 28.5, crecimiento: 10.4 },
        { fecha: "Mar", ingresos: 15200, reservas: 520, promedio: 29.2, crecimiento: 10.1 },
        { fecha: "Abr", ingresos: 14500, reservas: 495, promedio: 29.3, crecimiento: -4.6 },
        { fecha: "May", ingresos: 16800, reservas: 580, promedio: 29.0, crecimiento: 15.9 },
        { fecha: "Jun", ingresos: 17500, reservas: 610, promedio: 28.7, crecimiento: 4.2 },
        { fecha: "Jul", ingresos: 16200, reservas: 545, promedio: 29.7, crecimiento: -7.4 },
        { fecha: "Ago", ingresos: 15800, reservas: 530, promedio: 29.8, crecimiento: -2.5 },
        { fecha: "Sep", ingresos: 17200, reservas: 590, promedio: 29.2, crecimiento: 8.9 },
        { fecha: "Oct", ingresos: 18500, reservas: 635, promedio: 29.1, crecimiento: 7.6 },
        { fecha: "Nov", ingresos: 19200, reservas: 650, promedio: 29.5, crecimiento: 3.8 },
        { fecha: "Dic", ingresos: 21000, reservas: 720, promedio: 29.2, crecimiento: 9.4 },
      ]
    } else if (periodo === "semana") {
      return [
        { fecha: "Lun", ingresos: 3200, reservas: 110, promedio: 29.1, crecimiento: 5.2 },
        { fecha: "Mar", ingresos: 3800, reservas: 125, promedio: 30.4, crecimiento: 18.8 },
        { fecha: "Mié", ingresos: 4200, reservas: 135, promedio: 31.1, crecimiento: 10.5 },
        { fecha: "Jue", ingresos: 4100, reservas: 130, promedio: 31.5, crecimiento: -2.4 },
        { fecha: "Vie", ingresos: 4500, reservas: 145, promedio: 31.0, crecimiento: 9.8 },
        { fecha: "Sáb", ingresos: 4800, reservas: 155, promedio: 31.0, crecimiento: 6.7 },
        { fecha: "Dom", ingresos: 3600, reservas: 115, promedio: 31.3, crecimiento: -25.0 },
      ]
    } else {
      // Últimos 30 días
      return Array.from({ length: 30 }, (_, i) => {
        const fecha = new Date()
        fecha.setDate(fecha.getDate() - (29 - i))
        const baseIngresos = 500 + Math.sin(i * 0.2) * 100
        const randomVariation = (Math.random() - 0.5) * 200
        const ingresos = Math.max(300, Math.round(baseIngresos + randomVariation))
        const reservas = Math.round(ingresos / 30)
        
        return {
          fecha: fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
          ingresos,
          reservas,
          promedio: Math.round((ingresos / reservas) * 10) / 10,
          crecimiento: i === 0 ? 0 : Math.round((Math.random() - 0.5) * 20)
        }
      })
    }
  }

  const datos = generarDatosIngresos(periodoSeleccionado)
  const totalIngresos = datos.reduce((sum, item) => sum + item.ingresos, 0)
  const totalReservas = datos.reduce((sum, item) => sum + item.reservas, 0)
  const promedioTicket = Math.round(totalIngresos / totalReservas)
  const crecimientoPromedio = Math.round(datos.reduce((sum, item) => sum + item.crecimiento, 0) / datos.length)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-green-50 to-brand-emerald-50 dark:from-brand-green-900/20 dark:to-brand-emerald-900/20 h-[60px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="flex items-center gap-2 text-brand-green-700 dark:text-brand-green-300">
            <DollarSign className="h-5 w-5" />
            Análisis de Ingresos
          </CardTitle>
          <Select value={periodoSeleccionado} onValueChange={setPeriodoSeleccionado}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mes">Mensual</SelectItem>
              <SelectItem value="semana">Semanal</SelectItem>
              <SelectItem value="dia">Diario</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              €{totalIngresos.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Ingresos</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalReservas}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Reservas</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              €{promedioTicket}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Ticket Promedio</div>
          </div>
        </div>

        {/* Gráfica combinada de ingresos y reservas */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorReservas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="fecha" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="left"
                stroke="#10b981"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `€${value}`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#3b82f6"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
                labelStyle={{ color: '#9ca3af' }}
                formatter={(value: any, name: any) => [
                  name === 'ingresos' ? `€${value.toLocaleString()}` : `${value}`,
                  name === 'ingresos' ? 'Ingresos' : 'Reservas'
                ]}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="ingresos" 
                stroke="#10b981" 
                strokeWidth={3}
                fill="url(#colorIngresos)"
                name="ingresos"
              />
              <Bar 
                yAxisId="right"
                dataKey="reservas" 
                fill="url(#colorReservas)"
                opacity={0.7}
                name="reservas"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Métricas de crecimiento */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Crecimiento Promedio: 
            <span className={`font-semibold ml-1 ${
              crecimientoPromedio >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {crecimientoPromedio >= 0 ? '+' : ''}{crecimientoPromedio}%
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Período: <span className="font-semibold text-gray-900 dark:text-gray-100">
              {periodoSeleccionado === 'mes' ? 'Último año' : 
               periodoSeleccionado === 'semana' ? 'Última semana' : 'Últimos 30 días'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 