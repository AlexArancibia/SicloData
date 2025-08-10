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
import HistorialComprasCliente from "./historial-compras-cliente"
import PaquetesVendidos from "./paquetes-vendidos"
import DiasMasVentas from "./dias-mas-ventas"
import ComprasPorMes from "./compras-por-mes"
import HorariosCompra from "./horarios-compra"
import { ReservasKPI } from "./reservas-kpi"

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
          <TabsTrigger value="ventas" className="flex-1">Ventas</TabsTrigger>
        </TabsList>

        {/* Pestaña de Análisis de Reservas */}
        <TabsContent value="analisis" className="space-y-6">
          {/* KPIs resumen */}
          <ReservasKPI />

          {/* Gráfico lineal de reservas (pantalla completa) */}
          <GraficoReservasLineal dateRange={dateRange} onDateRangeChange={setDateRange} />

          {/* Segunda fila: Reservas por Horario y Reservas por Disciplina */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReservasPorHorario />
            <ReservasPorDisciplina />
          </div>

          {/* Tercera fila: Reservas por Local y Porcentaje de Ocupación */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReservasPorLocal />
            <PorcentajeOcupacion />
          </div>

          {/* Tabla de instructores (fila completa) */}
          <InstructoresTabla />
        </TabsContent>

        {/* Pestaña de Estadísticas de Clientes */}
        <TabsContent value="clientes" className="space-y-4">
          <EstadisticasClientes dateRange={dateRange} onDateRangeChange={setDateRange} />
        </TabsContent>

        {/* Pestaña de Ventas */}
        <TabsContent value="ventas" className="space-y-6">
          {/* Primera fila: Historial de Compras del Cliente */}
          <HistorialComprasCliente clienteId="1" />

          {/* Segunda fila: Paquetes Vendidos y Días de Más Ventas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PaquetesVendidos />
            <DiasMasVentas />
          </div>

          {/* Compras por Mes (ancho completo) */}
          <ComprasPorMes />

          {/* Horarios de Compra (ancho completo) */}
          <HorariosCompra />
        </TabsContent>
      </Tabs>
    </div>
  )
}
