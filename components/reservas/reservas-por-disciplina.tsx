"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp } from "lucide-react"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function ReservasPorDisciplina() {
  const [localSeleccionado, setLocalSeleccionado] = useState("todos")

  // Datos dummy para reservas por disciplina
  const datosPorLocal = {
    todos: [
      { disciplina: "Siclo", reservas: 450, porcentaje: 36.5, crecimiento: "+12%", color: "#1e40af" },
      { disciplina: "Yoga", reservas: 320, porcentaje: 26.0, crecimiento: "+8%", color: "#10b981" },
      { disciplina: "Barre", reservas: 280, porcentaje: 22.7, crecimiento: "+15%", color: "#7c3aed" },
      { disciplina: "Ejercito", reservas: 180, porcentaje: 14.6, crecimiento: "+22%", color: "#ea580c" },
    ],
    "Síclo Chamberí": [
      { disciplina: "Siclo", reservas: 180, porcentaje: 42.1, crecimiento: "+15%", color: "#1e40af" },
      { disciplina: "Yoga", reservas: 120, porcentaje: 28.1, crecimiento: "+10%", color: "#10b981" },
      { disciplina: "Barre", reservas: 85, porcentaje: 19.9, crecimiento: "+18%", color: "#7c3aed" },
      { disciplina: "Ejercito", reservas: 42, porcentaje: 9.8, crecimiento: "+25%", color: "#ea580c" },
    ],
    "Síclo Eixample": [
      { disciplina: "Siclo", reservas: 145, porcentaje: 32.8, crecimiento: "+8%", color: "#1e40af" },
      { disciplina: "Yoga", reservas: 135, porcentaje: 30.5, crecimiento: "+12%", color: "#10b981" },
      { disciplina: "Barre", reservas: 95, porcentaje: 21.5, crecimiento: "+20%", color: "#7c3aed" },
      { disciplina: "Ejercito", reservas: 67, porcentaje: 15.2, crecimiento: "+18%", color: "#ea580c" },
    ],
    "Síclo Malasaña": [
      { disciplina: "Siclo", reservas: 125, porcentaje: 35.2, crecimiento: "+14%", color: "#1e40af" },
      { disciplina: "Yoga", reservas: 65, porcentaje: 18.3, crecimiento: "+5%", color: "#10b981" },
      { disciplina: "Barre", reservas: 100, porcentaje: 28.2, crecimiento: "+12%", color: "#7c3aed" },
      { disciplina: "Ejercito", reservas: 65, porcentaje: 18.3, crecimiento: "+28%", color: "#ea580c" },
    ],
  }

  const datosActuales = datosPorLocal[localSeleccionado as keyof typeof datosPorLocal] || datosPorLocal.todos
  const totalReservas = datosActuales.reduce((sum, item) => sum + item.reservas, 0)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-emerald-50 to-brand-blue-50 dark:from-brand-emerald-900/20 dark:to-brand-blue-900/20 h-[60px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="flex items-center gap-2 text-brand-emerald-700 dark:text-brand-emerald-300">
            <BarChart3 className="h-5 w-5" />
            Reservas por Disciplina
          </CardTitle>
          <Select value={localSeleccionado} onValueChange={setLocalSeleccionado}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Síclo Chamberí">Chamberí</SelectItem>
              <SelectItem value="Síclo Eixample">Eixample</SelectItem>
              <SelectItem value="Síclo Malasaña">Malasaña</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* Gráfica de barras compacta */}
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosActuales} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="disciplina" 
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
                formatter={(value: any, name: any) => [
                  `${value} reservas (${((value / totalReservas) * 100).toFixed(1)}%)`,
                  'Reservas'
                ]}
              />
              <Bar 
                dataKey="reservas" 
                fill="#10b981"
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
            Top: <span className="font-semibold text-emerald-600">{datosActuales[0]?.disciplina}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 