"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, TrendingUp, Clock, BarChart3, PieChart, MapPin, User, Target } from "lucide-react"
import { EstadisticasClientes } from "./estadisticas-clientes"
import { PorcentajeOcupacion } from "./porcentaje-ocupacion"
import { ReservasPorLocal } from "./reservas-por-local"
import { ReservasPorDisciplina } from "./reservas-por-disciplina"
import { GraficoReservasLineal } from "./grafico-reservas-lineal"
import { InstructoresTabla } from "./instructores-tabla"
import { ReservasPorHorario } from "./reservas-por-horario"
import type { DateRange } from "@/lib/types"

export default function DashboardContent() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  })

  return (
    <div className="space-y-6">
      {/* Pestañas principales */}
      <Tabs defaultValue="analisis" className="space-y-4">
        <TabsList className="flex w-full">
          <TabsTrigger value="analisis" className="flex-1">Análisis de Reservas</TabsTrigger>
          <TabsTrigger value="clientes" className="flex-1">Estadísticas de Clientes</TabsTrigger>
        </TabsList>

        {/* Pestaña de Análisis de Reservas */}
        <TabsContent value="analisis" className="space-y-6">
          {/* Primera fila: Evolución de Ocupación y Reservas por Horario */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GraficoReservasLineal dateRange={dateRange} onDateRangeChange={setDateRange} />
            <ReservasPorHorario />
          </div>

          {/* Segunda fila: Reservas por Disciplina y Reservas por Local */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReservasPorDisciplina />
            <ReservasPorLocal />
          </div>

          {/* Tercera fila: Reservas por Instructor (tabla) y Ocupación */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InstructoresTabla />
            <PorcentajeOcupacion />
          </div>
        </TabsContent>

        {/* Pestaña de Estadísticas de Clientes */}
        <TabsContent value="clientes" className="space-y-4">
          <EstadisticasClientes dateRange={dateRange} onDateRangeChange={setDateRange} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
