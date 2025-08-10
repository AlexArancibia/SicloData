"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, TrendingUp, Sun, Cloud, Snowflake, Leaf } from "lucide-react"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, Bar } from 'recharts'

export function TendenciasEstacionales() {
  const [añoSeleccionado, setAñoSeleccionado] = useState("2024")
  const [tipoDatos, setTipoDatos] = useState("reservas")

  // Datos dummy para tendencias estacionales
  const generarDatosEstacionales = (año: string, tipo: string) => {
    const datosBase = [
      { mes: "Enero", mesCorto: "Ene", estacion: "Invierno", icono: Snowflake, reservas: 420, ocupacion: 75, ingresos: 12500, clima: "Frío" },
      { mes: "Febrero", mesCorto: "Feb", estacion: "Invierno", icono: Snowflake, reservas: 385, ocupacion: 68, ingresos: 11500, clima: "Frío" },
      { mes: "Marzo", mesCorto: "Mar", estacion: "Primavera", icono: Leaf, reservas: 520, ocupacion: 82, ingresos: 15200, clima: "Templado" },
      { mes: "Abril", mesCorto: "Abr", estacion: "Primavera", icono: Leaf, reservas: 495, ocupacion: 78, ingresos: 14500, clima: "Templado" },
      { mes: "Mayo", mesCorto: "May", estacion: "Primavera", icono: Leaf, reservas: 580, ocupacion: 85, ingresos: 16800, clima: "Cálido" },
      { mes: "Junio", mesCorto: "Jun", estacion: "Verano", icono: Sun, reservas: 610, ocupacion: 88, ingresos: 17500, clima: "Cálido" },
      { mes: "Julio", mesCorto: "Jul", estacion: "Verano", icono: Sun, reservas: 545, ocupacion: 72, ingresos: 16200, clima: "Caluroso" },
      { mes: "Agosto", mesCorto: "Ago", estacion: "Verano", icono: Sun, reservas: 530, ocupacion: 70, ingresos: 15800, clima: "Caluroso" },
      { mes: "Septiembre", mesCorto: "Sep", estacion: "Otoño", icono: Leaf, reservas: 590, ocupacion: 83, ingresos: 17200, clima: "Templado" },
      { mes: "Octubre", mesCorto: "Oct", estacion: "Otoño", icono: Leaf, reservas: 635, ocupacion: 87, ingresos: 18500, clima: "Templado" },
      { mes: "Noviembre", mesCorto: "Nov", estacion: "Otoño", icono: Leaf, reservas: 650, ocupacion: 89, ingresos: 19200, clima: "Frío" },
      { mes: "Diciembre", mesCorto: "Dic", estacion: "Invierno", icono: Snowflake, reservas: 720, ocupacion: 92, ingresos: 21000, clima: "Frío" },
    ]

    // Aplicar variaciones según el año
    const variacionAño = año === "2023" ? 0.9 : año === "2025" ? 1.1 : 1.0
    
    return datosBase.map(item => ({
      ...item,
      reservas: Math.round(item.reservas * variacionAño),
      ingresos: Math.round(item.ingresos * variacionAño),
      ocupacion: Math.round(item.ocupacion * variacionAño)
    }))
  }

  const datos = generarDatosEstacionales(añoSeleccionado, tipoDatos)
  const totalReservas = datos.reduce((sum, item) => sum + item.reservas, 0)
  const promedioOcupacion = Math.round(datos.reduce((sum, item) => sum + item.ocupacion, 0) / datos.length)
  const totalIngresos = datos.reduce((sum, item) => sum + item.ingresos, 0)

  // Agrupar por estación
  const datosPorEstacion = datos.reduce((acc, item) => {
    if (!acc[item.estacion]) {
      acc[item.estacion] = { estacion: item.estacion, reservas: 0, ocupacion: 0, ingresos: 0, meses: 0 }
    }
    acc[item.estacion].reservas += item.reservas
    acc[item.estacion].ocupacion += item.ocupacion
    acc[item.estacion].ingresos += item.ingresos
    acc[item.estacion].meses += 1
    return acc
  }, {} as Record<string, any>)

  const estaciones = Object.values(datosPorEstacion).map((est: any) => ({
    ...est,
    ocupacionPromedio: Math.round(est.ocupacion / est.meses),
    ingresosPromedio: Math.round(est.ingresos / est.meses)
  }))

  const getEstacionColor = (estacion: string) => {
    switch (estacion) {
      case "Primavera": return "#10b981"
      case "Verano": return "#f59e0b"
      case "Otoño": return "#8b5cf6"
      case "Invierno": return "#3b82f6"
      default: return "#6b7280"
    }
  }

  const getEstacionIcono = (estacion: string) => {
    switch (estacion) {
      case "Primavera": return Leaf
      case "Verano": return Sun
      case "Otoño": return Leaf
      case "Invierno": return Snowflake
      default: return Calendar
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-amber-50 to-brand-orange-50 dark:from-brand-amber-900/20 dark:to-brand-orange-900/20 h-[60px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="flex items-center gap-2 text-brand-amber-700 dark:text-brand-amber-300">
            <Calendar className="h-5 w-5" />
            Tendencias Estacionales
          </CardTitle>
          <div className="flex gap-2">
            <Select value={añoSeleccionado} onValueChange={setAñoSeleccionado}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipoDatos} onValueChange={setTipoDatos}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reservas">Reservas</SelectItem>
                <SelectItem value="ocupacion">Ocupación</SelectItem>
                <SelectItem value="ingresos">Ingresos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalReservas.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Reservas</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {promedioOcupacion}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Ocupación Promedio</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              €{totalIngresos.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Ingresos</div>
          </div>
        </div>

        {/* Gráfica principal de tendencias */}
        <div className="h-[300px] w-full mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorTendencias" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="mesCorto" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => 
                  tipoDatos === "ingresos" ? `€${value/1000}k` : 
                  tipoDatos === "ocupacion" ? `${value}%` : value
                }
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
                  tipoDatos === "ingresos" ? `€${value.toLocaleString()}` : 
                  tipoDatos === "ocupacion" ? `${value}%` : `${value} reservas`,
                  tipoDatos === "ingresos" ? "Ingresos" : 
                  tipoDatos === "ocupacion" ? "Ocupación" : "Reservas"
                ]}
                labelFormatter={(label) => {
                  const mes = datos.find(d => d.mesCorto === label)
                  return `${mes?.mes} (${mes?.estacion})`
                }}
              />
              <Area 
                type="monotone" 
                dataKey={tipoDatos} 
                stroke="#f59e0b" 
                strokeWidth={3}
                fill="url(#colorTendencias)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Análisis por estación */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {estaciones.map((estacion) => {
            const IconComponent = getEstacionIcono(estacion.estacion)
            const color = getEstacionColor(estacion.estacion)
            
            return (
              <div key={estacion.estacion} className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                <div className="flex justify-center mb-2">
                  <IconComponent className="h-6 w-6" style={{ color }} />
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {estacion.estacion}
                </div>
                <div className="text-lg font-bold" style={{ color }}>
                  {tipoDatos === "ingresos" ? `€${(estacion.ingresosPromedio/1000).toFixed(1)}k` :
                   tipoDatos === "ocupacion" ? `${estacion.ocupacionPromedio}%` :
                   estacion.reservas.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {tipoDatos === "ingresos" ? "por mes" :
                   tipoDatos === "ocupacion" ? "promedio" :
                   "reservas"}
                </div>
              </div>
            )
          })}
        </div>

        {/* Insights estacionales */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
          <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Insights Estacionales</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span><strong>Mejor temporada:</strong> Verano (Jun-Ago) - 1,675 reservas</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span><strong>Pico de ingresos:</strong> Diciembre - €21,000</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span><strong>Mayor ocupación:</strong> Primavera (Mar-May) - 82% promedio</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span><strong>Estacionalidad:</strong> +15% variación entre estaciones</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 