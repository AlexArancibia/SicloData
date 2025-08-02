"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target } from "lucide-react"

export function PorcentajeOcupacion() {
  // Datos dummy para ocupación
  const datosOcupacion = [
    {
      local: "Síclo Chamberí",
      ocupacion: 87,
      cupos_ocupados: 174,
      cupos_totales: 200,
      crecimiento: "+5.2%",
    },
    {
      local: "Síclo Eixample",
      ocupacion: 78,
      cupos_ocupados: 156,
      cupos_totales: 200,
      crecimiento: "+3.8%",
    },
    {
      local: "Síclo Malasaña",
      ocupacion: 92,
      cupos_ocupados: 184,
      cupos_totales: 200,
      crecimiento: "+7.1%",
    }
  ]

  const ocupacionPromedio = Math.round(datosOcupacion.reduce((sum, item) => sum + item.ocupacion, 0) / datosOcupacion.length)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-emerald-50 to-brand-teal-50 dark:from-brand-emerald-900/20 dark:to-brand-teal-900/20">
        <CardTitle className="flex items-center gap-2 text-brand-emerald-700 dark:text-brand-emerald-300">
          <Target className="h-5 w-5" />
          Ocupación
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Métrica principal */}
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-brand-emerald-600 dark:text-brand-emerald-400 mb-1">
            {ocupacionPromedio}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Ocupación Promedio
          </div>
          <div className="flex items-center justify-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3 w-3" />
            <span>+5.4% vs mes anterior</span>
          </div>
        </div>

        {/* Detalle por local */}
        <div className="space-y-3">
          {datosOcupacion.map((local) => (
            <div key={local.local} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    local.ocupacion >= 90 ? 'bg-emerald-500' :
                    local.ocupacion >= 75 ? 'bg-blue-500' :
                    local.ocupacion >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{local.local}</span>
                  <Badge variant="outline" className="text-xs">
                    {local.ocupacion}%
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {local.cupos_ocupados}/{local.cupos_totales}
                </div>
              </div>
              
              <Progress 
                value={local.ocupacion} 
                className="h-2"
                style={{
                  '--progress-background': local.ocupacion >= 90 ? 'rgb(34 197 94)' :
                                          local.ocupacion >= 75 ? 'rgb(59 130 246)' :
                                          local.ocupacion >= 60 ? 'rgb(234 179 8)' :
                                          'rgb(239 68 68)'
                } as React.CSSProperties}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 