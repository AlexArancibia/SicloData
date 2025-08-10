"use client"

import { useState } from "react"
import { reservas, clientes, clases } from "@/lib/dummy-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination } from "@/components/ui/pagination"

interface Filtro {
  disciplina: string
  cliente: string
}

export default function ComprasTabla() {
  const [page, setPage] = useState(1)
  const perPage = 10
  const [filtro, setFiltro] = useState<Filtro>({ disciplina: "all", cliente: "all" })

  const disciplinas = Array.from(new Set(clases.map(c => c.disciplina)))
  const clientesOptions = clientes.map(c => ({ id: c.id_cliente, nombre: c.nombre }))

  // Enriquecer reservas con info relacionada
  const compras = reservas.map(res => {
    const cliente = clientes.find(c => c.id_cliente === res.id_cliente)
    const clase = clases.find(c => c.id_clase === res.id_clase)
    return {
      ...res,
      clienteNombre: cliente?.nombre || "-",
      disciplina: clase?.disciplina || "-",
      fecha: res.fecha_reserva,
      monto: 12, // precio base
    }
  })

  const filtradas = compras.filter(c => {
    const disciplinaOk = filtro.disciplina === "all" ? true : c.disciplina === filtro.disciplina
    const clienteOk = filtro.cliente === "all" ? true : c.id_cliente === filtro.cliente
    return disciplinaOk && clienteOk
  })

  const totalPages = Math.ceil(filtradas.length / perPage)
  const display = filtradas.slice((page - 1) * perPage, page * perPage)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Compras</span>
          <div className="flex gap-2">
            <Select value={filtro.disciplina} onValueChange={val => setFiltro({ ...filtro, disciplina: val })}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {disciplinas.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtro.cliente} onValueChange={val => {
              setFiltro({ ...filtro, cliente: val })
            }}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {clientesOptions.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Método Pago</TableHead>
                <TableHead className="text-right">Monto (S/)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {display.map(compra => (
                <TableRow key={compra.id_reserva}>
                  <TableCell>{compra.fecha}</TableCell>
                  <TableCell>{compra.clienteNombre}</TableCell>
                  <TableCell>{compra.disciplina}</TableCell>
                  <TableCell>{compra.metodo_pago}</TableCell>
                  <TableCell className="text-right">{compra.monto.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </CardContent>
    </Card>
  )
}