"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ReservasPorHorario() {
  // Datos dummy para reservas por horario (cada 30 minutos)
  const horarios = [
    { hora: "06:00", reservas: 12, ocupacion: 60 },
    { hora: "06:30", reservas: 18, ocupacion: 90 },
    { hora: "07:00", reservas: 25, ocupacion: 83 },
    { hora: "07:30", reservas: 15, ocupacion: 75 },
    { hora: "08:00", reservas: 22, ocupacion: 88 },
    { hora: "08:30", reservas: 19, ocupacion: 95 },
    { hora: "09:00", reservas: 35, ocupacion: 87 },
    { hora: "09:30", reservas: 28, ocupacion: 93 },
    { hora: "10:00", reservas: 31, ocupacion: 78 },
    { hora: "10:30", reservas: 24, ocupacion: 80 },
    { hora: "11:00", reservas: 18, ocupacion: 72 },
    { hora: "11:30", reservas: 14, ocupacion: 70 },
    { hora: "12:00", reservas: 26, ocupacion: 87 },
    { hora: "12:30", reservas: 21, ocupacion: 84 },
    { hora: "13:00", reservas: 16, ocupacion: 64 },
    { hora: "13:30", reservas: 12, ocupacion: 60 },
    { hora: "14:00", reservas: 19, ocupacion: 76 },
    { hora: "14:30", reservas: 15, ocupacion: 75 },
    { hora: "15:00", reservas: 28, ocupacion: 93 },
    { hora: "15:30", reservas: 32, ocupacion: 89 },
    { hora: "16:00", reservas: 29, ocupacion: 85 },
    { hora: "16:30", reservas: 25, ocupacion: 83 },
    { hora: "17:00", reservas: 38, ocupacion: 95 },
    { hora: "17:30", reservas: 35, ocupacion: 88 },
    { hora: "18:00", reservas: 42, ocupacion: 91 },
    { hora: "18:30", reservas: 39, ocupacion: 87 },
    { hora: "19:00", reservas: 45, ocupacion: 94 },
    { hora: "19:30", reservas: 41, ocupacion: 89 },
    { hora: "20:00", reservas: 36, ocupacion: 86 },
    { hora: "20:30", reservas: 28, ocupacion: 78 },
    { hora: "21:00", reservas: 22, ocupacion: 73 },
    { hora: "21:30", reservas: 16, ocupacion: 64 },
  ]

  const maxReservas = Math.max(...horarios.map(h => h.reservas))
  const horarioPico = horarios.find(h => h.reservas === maxReservas)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-orange-50 to-brand-red-50 dark:from-brand-orange-900/20 dark:to-brand-red-900/20 h-[60px] flex items-center">
        <CardTitle className="flex items-center gap-2 text-brand-orange-700 dark:text-brand-orange-300">
          <Clock className="h-5 w-5" />
          Reservas por Horario
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Gráfica con Recharts - Área degradado sin puntos */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={horarios} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorReservas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="hora" 
                stroke="#6b7280"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="#6b7280"
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
                  name === 'reservas' ? `${value} reservas` : `${value}%`,
                  name === 'reservas' ? 'Reservas' : 'Ocupación'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="reservas" 
                stroke="#f97316" 
                strokeWidth={3}
                fill="url(#colorReservas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Métricas resumen */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Horario Pico: <span className="font-semibold text-brand-orange-600">{horarioPico?.hora}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Max Reservas: <span className="font-semibold text-brand-red-600">{maxReservas}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total: <span className="font-semibold text-brand-orange-600">
              {horarios.reduce((sum, h) => sum + h.reservas, 0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 