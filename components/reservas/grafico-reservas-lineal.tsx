"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { clases } from "@/lib/dummy-data"

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

      const disciplinasUnicas = Array.from(new Set(clases.map(c=>c.disciplina)))
      const disciplinaValores: Record<string, number> = {}
      disciplinasUnicas.forEach((disc, idx)=>{
        // create variation per discipline
        const base = 60 + idx*5 + Math.sin(i*0.3+idx) * 20
        disciplinaValores[disc] = Math.round(Math.max(40, Math.min(95, base + (Math.random()-0.5)*10)))
      })

      datos.push({
        fecha: fecha.toLocaleDateString('es-ES', { 
          day: 'numeric', 
          month: diffDays > 7 ? 'short' : undefined 
        }),
        ocupacion: Math.round(ocupacion),
        ...disciplinaValores,
      })
    }
    
    return datos
  }

  const datos = generarDatosOcupacion(dateRange.from, dateRange.to)
  const maxOcupacion = Math.max(...datos.map((d:any) => d.ocupacion))
  const minOcupacion = Math.min(...datos.map((d:any) => d.ocupacion))
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
        {/* Gráfica con Recharts - Líneas múltiples */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="fecha" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} domain={[Math.max(0,minOcupacion-10), Math.min(100,maxOcupacion+10)]} tickFormatter={(v)=>`${v}%`} />
              <Tooltip contentStyle={{backgroundColor:'#1f2937',border:'none',borderRadius:'8px',color:'#f9fafb'}} labelStyle={{color:'#9ca3af'}} formatter={(value:any, name:any)=>[`${value}%`, name]} />
              <Line type="monotone" dataKey="ocupacion" stroke="#3b82f6" strokeWidth={2} dot={false} name="Total" />
              {/* líneas por disciplina */}
              {Array.from(new Set(clases.map(c=>c.disciplina))).map((disc, idx)=>{
                const colors = ["#ef4444", "#10b981", "#f59e0b"]
                return <Line key={disc} type="monotone" dataKey={disc} stroke={colors[idx]} strokeWidth={2} dot={false} name={disc} />
              })}
            </LineChart>
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