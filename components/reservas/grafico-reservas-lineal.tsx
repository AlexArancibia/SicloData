"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface GraficoReservasLinealProps {
  dateRange: { from: Date; to: Date }
  onDateRangeChange: (range: { from: Date; to: Date }) => void
}

export function GraficoReservasLineal({ dateRange, onDateRangeChange }: GraficoReservasLinealProps) {
  // Generar datos basados en el rango de fechas seleccionado
  const generarDatosOcupacion = (from: Date, to: Date) => {
    const datos = []
    const diffTime = Math.abs(to.getTime() - from.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // Determinar el número de puntos de datos basado en el rango
    let numPoints = 7 // Por defecto 7 puntos
    if (diffDays <= 7) {
      numPoints = diffDays + 1 // Un punto por día
    } else if (diffDays <= 30) {
      numPoints = Math.min(14, diffDays) // Máximo 14 puntos para rangos medianos
    } else {
      numPoints = 20 // Máximo 20 puntos para rangos largos
    }
    
    const step = diffDays / (numPoints - 1)
    
    for (let i = 0; i < numPoints; i++) {
      const fecha = new Date(from)
      fecha.setDate(fecha.getDate() + (i * step))
      
      // Generar datos realistas de ocupación
      const baseOcupacion = 75 + Math.sin(i * 0.5) * 15 // Patrón sinusoidal base
      const randomVariation = (Math.random() - 0.5) * 10 // Variación aleatoria
      const ocupacion = Math.max(60, Math.min(95, baseOcupacion + randomVariation))
      
      datos.push({
        fecha: fecha.toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: diffDays > 7 ? 'short' : undefined 
        }),
        ocupacion: Math.round(ocupacion),
        fechaCompleta: fecha
      })
    }
    
    return datos
  }

  const datos = generarDatosOcupacion(dateRange.from, dateRange.to)
  const maxOcupacion = Math.max(...datos.map(d => d.ocupacion))
  const minOcupacion = Math.min(...datos.map(d => d.ocupacion))
  const promedioOcupacion = Math.round(datos.reduce((sum, d) => sum + d.ocupacion, 0) / datos.length)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl w-full">
      <CardHeader className="bg-gradient-to-r from-brand-blue-50 to-brand-purple-50 dark:from-brand-blue-900/20 dark:to-brand-purple-900/20 h-[60px] flex items-center">
        <CardTitle className="flex items-center gap-2 text-brand-blue-700 dark:text-brand-blue-300">
          <TrendingUp className="h-5 w-5" />
          Evolución de Ocupación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Gráfica con Recharts - Área degradado sin puntos */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorOcupacion" x1="0" y1="0" x2="0" y2="1">
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
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[Math.max(0, minOcupacion - 10), Math.min(100, maxOcupacion + 10)]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
                labelStyle={{ color: '#9ca3af' }}
                formatter={(value: any) => [`${value}%`, 'Ocupación']}
              />
              <Area 
                type="monotone" 
                dataKey="ocupacion" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fill="url(#colorOcupacion)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Métricas resumen */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Promedio: <span className="font-semibold text-brand-blue-600">{promedioOcupacion}%</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Máximo: <span className="font-semibold text-brand-purple-600">{maxOcupacion}%</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mínimo: <span className="font-semibold text-brand-blue-600">{minOcupacion}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 