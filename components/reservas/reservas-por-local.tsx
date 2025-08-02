"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ReservasPorLocal() {
  // Datos dummy para reservas por local
  const datosLocales = [
    {
      local: "Chamberí",
      ciudad: "Madrid",
      reservas: 485,
      ocupacion: 87,
      crecimiento: "+12.5%",
    },
    {
      local: "Eixample",
      ciudad: "Barcelona",
      reservas: 392,
      ocupacion: 78,
      crecimiento: "+8.3%",
    },
    {
      local: "Malasaña",
      ciudad: "Madrid",
      reservas: 358,
      ocupacion: 92,
      crecimiento: "+15.7%",
    }
  ]

  const totalReservas = datosLocales.reduce((sum, local) => sum + local.reservas, 0)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-blue-50 to-brand-indigo-50 dark:from-brand-blue-900/20 dark:to-brand-indigo-900/20 h-[60px] flex items-center">
        <CardTitle className="flex items-center gap-2 text-brand-blue-700 dark:text-brand-blue-300">
          <MapPin className="h-5 w-5" />
          Reservas por Local
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* Gráfica de barras vertical compacta */}
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={datosLocales} 
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="local"
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={11}
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
                  name === 'reservas' ? `${value} reservas` : `${value}%`,
                  name === 'reservas' ? 'Reservas' : 'Ocupación'
                ]}
              />
              <Bar 
                dataKey="reservas" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Métricas resumen compactas */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total: <span className="font-semibold text-gray-900 dark:text-gray-100">{totalReservas}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Top: <span className="font-semibold text-blue-600">{datosLocales[0]?.local}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 