"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserCheck, UserX, TrendingUp, Heart, Star } from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

export function RetencionClientes() {
  const [tipoGrafico, setTipoGrafico] = useState("retencion")

  // Datos dummy para retención de clientes
  const datosRetencion = [
    { segmento: "Nuevos", clientes: 125, porcentaje: 25, color: "#3b82f6" },
    { segmento: "Recurrentes", clientes: 225, porcentaje: 45, color: "#10b981" },
    { segmento: "Leales", clientes: 100, porcentaje: 20, color: "#8b5cf6" },
    { segmento: "En Riesgo", clientes: 50, porcentaje: 10, color: "#f59e0b" },
  ]

  const datosLoyalty = [
    { nivel: "Bronce", clientes: 180, porcentaje: 36, beneficios: "5% descuento", color: "#cd7f32" },
    { nivel: "Plata", clientes: 120, porcentaje: 24, beneficios: "10% descuento", color: "#c0c0c0" },
    { nivel: "Oro", clientes: 90, porcentaje: 18, beneficios: "15% descuento", color: "#ffd700" },
    { nivel: "Platino", clientes: 60, porcentaje: 12, beneficios: "20% descuento", color: "#e5e4e2" },
    { nivel: "Diamante", clientes: 50, porcentaje: 10, beneficios: "25% descuento", color: "#b9f2ff" },
  ]

  const datosTendencias = [
    { mes: "Ene", retencion: 78, nuevos: 45, perdidos: 12 },
    { mes: "Feb", retencion: 82, nuevos: 52, perdidos: 10 },
    { mes: "Mar", retencion: 79, nuevos: 48, perdidos: 15 },
    { mes: "Abr", retencion: 85, nuevos: 55, perdidos: 8 },
    { mes: "May", retencion: 88, nuevos: 62, perdidos: 7 },
    { mes: "Jun", retencion: 91, nuevos: 68, perdidos: 6 },
  ]

  const totalClientes = datosRetencion.reduce((sum, item) => sum + item.clientes, 0)
  const tasaRetencion = Math.round((datosRetencion[1].clientes + datosRetencion[2].clientes) / totalClientes * 100)
  const clientesLeales = datosRetencion[2].clientes + datosRetencion[3].clientes

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444']

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-pink-50 to-brand-rose-50 dark:from-brand-pink-900/20 dark:to-brand-rose-900/20 h-[60px] flex items-center">
        <div className="flex items-center justify-between w-full">
          <CardTitle className="flex items-center gap-2 text-brand-pink-700 dark:text-brand-pink-300">
            <Heart className="h-5 w-5" />
            Retención de Clientes
          </CardTitle>
          <Select value={tipoGrafico} onValueChange={setTipoGrafico}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retencion">Retención</SelectItem>
              <SelectItem value="loyalty">Programa Loyalty</SelectItem>
              <SelectItem value="tendencias">Tendencias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {tasaRetencion}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Tasa Retención</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {totalClientes}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Clientes</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {clientesLeales}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Clientes Leales</div>
          </div>
        </div>

        {/* Gráficas según el tipo seleccionado */}
        {tipoGrafico === "retencion" && (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosRetencion}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ segmento, porcentaje }) => `${segmento}: ${porcentaje}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="clientes"
                >
                  {datosRetencion.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value} clientes`, 'Clientes']}
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {tipoGrafico === "loyalty" && (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosLoyalty} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="nivel" 
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
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                  formatter={(value: any, name: any) => [
                    `${value} clientes (${((value / totalClientes) * 100).toFixed(1)}%)`,
                    'Clientes'
                  ]}
                />
                <Bar 
                  dataKey="clientes" 
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tipoGrafico === "tendencias" && (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosTendencias} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="mes" 
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
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
                <Bar dataKey="retencion" fill="#10b981" name="Retención %" />
                <Bar dataKey="nuevos" fill="#3b82f6" name="Nuevos" />
                <Bar dataKey="perdidos" fill="#ef4444" name="Perdidos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Información adicional según el tipo */}
        {tipoGrafico === "loyalty" && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Beneficios por Nivel</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {datosLoyalty.map((nivel) => (
                <div key={nivel.nivel} className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{nivel.nivel}:</span>
                  <span className="text-gray-600 dark:text-gray-400">{nivel.beneficios}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Métricas de resumen */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Cliente Promedio: <span className="font-semibold text-gray-900 dark:text-gray-100">
              {Math.round(totalClientes / 12)}/mes
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Valor Vida: <span className="font-semibold text-green-600">€450</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 