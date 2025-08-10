"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { reservas, clases } from "@/lib/dummy-data"

export default function PaquetesVendidos() {
  // Simular diferentes tipos de paquetes
  const paquetes = [
    { nombre: "Clase Individual", precio: 12, vendidos: 45, color: "from-blue-500 to-blue-600" },
    { nombre: "Pack 5 Clases", precio: 50, vendidos: 28, color: "from-green-500 to-green-600" },
    { nombre: "Pack 10 Clases", precio: 90, vendidos: 32, color: "from-purple-500 to-purple-600" },
    { nombre: "Pack Mensual", precio: 120, vendidos: 18, color: "from-orange-500 to-orange-600" },
    { nombre: "Pack Trimestral", precio: 300, vendidos: 12, color: "from-red-500 to-red-600" },
  ]

  const totalVendidos = paquetes.reduce((sum, paquete) => sum + paquete.vendidos, 0)
  const ingresosTotales = paquetes.reduce((sum, paquete) => sum + (paquete.precio * paquete.vendidos), 0)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Paquetes Vendidos (S/)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Resumen */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Vendidos</p>
            <p className="text-2xl font-semibold">{totalVendidos}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Ingresos Totales</p>
            <p className="text-2xl font-semibold">S/{ingresosTotales}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Tipos</p>
            <p className="text-2xl font-semibold">{paquetes.length}</p>
          </div>
        </div>

        {/* Bar chart */}
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paquetes} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="nombre" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{backgroundColor:'#1f2937',border:'none',borderRadius:'8px',color:'#f9fafb'}} formatter={(value:any)=>[`S/${value}`, 'Vendidos']} />
              <Bar dataKey="vendidos" name="Vendidos" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 