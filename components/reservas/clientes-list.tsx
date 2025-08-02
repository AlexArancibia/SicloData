"use client"

import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Eye, Mail, Phone, Calendar } from "lucide-react"
import { clientes } from "@/lib/dummy-data"
import Link from "next/link"

export default function ClientesList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue-700 to-brand-emerald-600 bg-clip-text text-transparent">
          Gestión de Clientes
        </h1>
      </div>

      <DataTable
        data={clientes}
        title="Lista de Clientes"
        searchKey="nombre"
        itemsPerPage={10}
        columns={[
          {
            key: "nombre",
            label: "Cliente",
            sortable: true,
            render: (cliente) => (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-emerald-400 to-brand-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {cliente.nombre
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium">{cliente.nombre}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {cliente.email}
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: "telefono",
            label: "Teléfono",
            render: (cliente) => (
              <div className="flex items-center gap-1 text-sm">
                {cliente.telefono ? (
                  <>
                    <Phone className="h-3 w-3 text-gray-400" />
                    {cliente.telefono}
                  </>
                ) : (
                  <span className="text-gray-400">No disponible</span>
                )}
              </div>
            ),
          },
          {
            key: "fecha_registro",
            label: "Fecha de Registro",
            sortable: true,
            render: (cliente) => (
              <div className="flex items-center gap-1 text-sm">
                <Calendar className="h-3 w-3 text-gray-400" />
                {cliente.fecha_registro}
              </div>
            ),
          },
          {
            key: "id_cliente",
            label: "ID Cliente",
            render: (cliente) => (
              <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {cliente.id_cliente}
              </span>
            ),
          },
        ]}
        actions={(cliente) => (
          <Link href={`/clientes/${cliente.id_cliente}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Ver Perfil
            </Button>
          </Link>
        )}
      />
    </div>
  )
}
