"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, ChevronLeft, ChevronRight } from "lucide-react"
import { instructores } from "@/lib/dummy-data"

export function InstructoresTabla() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Datos dummy para instructores - solo información básica
  const datosInstructores = instructores.map((instructor, index) => ({
    id: instructor.id_instructor,
    nombre: instructor.nombre,
    clases_mes: Math.floor(Math.random() * 50) + 100, // Entre 100-150 clases
    ocupacion: Math.floor(Math.random() * 25) + 70, // Entre 70-95%
  }))

  // Ordenar por número de clases
  const instructoresOrdenados = datosInstructores.sort((a, b) => b.clases_mes - a.clases_mes)
  
  // Calcular paginación
  const totalPages = Math.ceil(instructoresOrdenados.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentInstructores = instructoresOrdenados.slice(startIndex, endIndex)

  return (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-brand-purple-50 to-brand-pink-50 dark:from-brand-purple-900/20 dark:to-brand-pink-900/20 h-[60px] flex items-center">
        <CardTitle className="flex items-center gap-2 text-brand-purple-700 dark:text-brand-purple-300">
          <User className="h-5 w-5" />
          Instructores
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Tabla de instructores simplificada */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100">Instructor</TableHead>
                <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100">Clases/Mes</TableHead>
                <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100">Ocupación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentInstructores.map((instructor, index) => (
                <TableRow key={instructor.id} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="py-3">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {instructor.nombre}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {instructor.clases_mes}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {instructor.ocupacion}%
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Mostrando {startIndex + 1}-{Math.min(endIndex, instructoresOrdenados.length)} de {instructoresOrdenados.length} instructores
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 