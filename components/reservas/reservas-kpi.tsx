"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, CalendarDays, DollarSign } from "lucide-react"
import { reservas, clientes } from "@/lib/dummy-data"

export function ReservasKPI() {
  const totalReservas = reservas.length
  const clientesUnicos = clientes.length
  const ingresoEstimado = totalReservas * 12 // 12 soles por reserva aproximado
  const reservaPromedio = (totalReservas / clientesUnicos).toFixed(1)

  const cards = [
    {
      label: "Total Reservas",
      value: totalReservas.toLocaleString(),
      icon: CalendarDays,
      color: "text-blue-600",
    },
    {
      label: "Clientes Únicos",
      value: clientesUnicos.toLocaleString(),
      icon: Users,
      color: "text-indigo-600",
    },
    {
      label: "Reserva Prom./Cliente",
      value: reservaPromedio,
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      label: "Ingreso Estimado (S/)",
      value: ingresoEstimado.toLocaleString(),
      icon: DollarSign,
      color: "text-green-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ label, value, icon: Icon, color }, idx) => (
        <Card key={idx} className="shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Icon className={`h-4 w-4 ${color}`} />
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {value}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}