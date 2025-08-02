"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, Calendar, MapPin, User, TrendingUp, Star, Award } from "lucide-react"
import { instructores, reservas, clases } from "@/lib/dummy-data"
import Link from "next/link"

interface InstructorDetailProps {
  instructorId: string
}

export default function InstructorDetail({ instructorId }: InstructorDetailProps) {
  const instructor = instructores.find((i) => i.id_instructor === instructorId)

  if (!instructor) {
    return <div>Instructor no encontrado</div>
  }

  // Obtener estadísticas del instructor
  const clasesInstructor = clases.filter((c) => c.instructor === instructor.nombre)
  const reservasInstructor = reservas.filter((r) => {
    const clase = clases.find((c) => c.id_clase === r.id_clase)
    return clase?.instructor === instructor.nombre
  })

  const disciplinasImpartidas = [...new Set(clasesInstructor.map((c) => c.disciplina))]
  const localesImpartidos = [...new Set(clasesInstructor.map((c) => c.estudio))]
  const rating = (4.2 + Math.random() * 0.8).toFixed(1)
  const clasesEsteMes = Math.floor(Math.random() * 20) + 10

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="sm"
            className="bg-gradient-to-r from-emerald-500 to-dark-blue-600 text-white border-none hover:from-emerald-600 hover:to-dark-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-dark-blue-700 to-emerald-600 bg-clip-text text-transparent">
          Perfil de Instructor
        </h1>
      </div>

      {/* Información básica */}
      <Card className="bg-gradient-card border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-dark-blue-600/10 to-emerald-500/10 border-b border-gray-200/50 dark:border-gray-700/50">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Básica
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Nombre</label>
                <p className="text-xl font-semibold">{instructor.nombre}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p>{instructor.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Teléfono</label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p>{instructor.telefono}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Experiencia</label>
                <p className="text-lg font-medium">{instructor.experiencia}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha de Contratación</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p>{instructor.fecha_contratacion}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating</label>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <p className="font-semibold">{rating}/5.0</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas del instructor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-none shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-200" />
              <span className="text-sm font-medium">Total Reservas</span>
            </div>
            <p className="text-2xl font-bold mt-2">{reservasInstructor.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-dark-blue-600 to-dark-blue-700 text-white border-none shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-200" />
              <span className="text-sm font-medium">Clases Este Mes</span>
            </div>
            <p className="text-2xl font-bold mt-2">{clasesEsteMes}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-200" />
              <span className="text-sm font-medium">Disciplinas</span>
            </div>
            <p className="text-2xl font-bold mt-2">{disciplinasImpartidas.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-orange-200" />
              <span className="text-sm font-medium">Locales</span>
            </div>
            <p className="text-2xl font-bold mt-2">{localesImpartidos.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Especialidades */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Especialidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {instructor.especialidades.map((especialidad) => (
                <Badge key={especialidad} className="bg-gradient-to-r from-emerald-500 to-dark-blue-600 text-white">
                  {especialidad}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Certificaciones */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {instructor.certificaciones.map((cert) => (
                <div
                  key={cert}
                  className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg"
                >
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disciplinas impartidas */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle>Disciplinas Impartidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {disciplinasImpartidas.map((disciplina) => {
                const count = clasesInstructor.filter((c) => c.disciplina === disciplina).length
                return (
                  <div
                    key={disciplina}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50/50 to-dark-blue-50/50 dark:from-emerald-900/20 dark:to-dark-blue-900/20 rounded-lg"
                  >
                    <span className="font-medium">{disciplina}</span>
                    <span className="font-bold text-emerald-600">{count} clases</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Locales donde imparte */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle>Locales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {localesImpartidos.map((local) => {
                const count = clasesInstructor.filter((c) => c.estudio === local).length
                return (
                  <div
                    key={local}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-dark-blue-50/50 to-emerald-50/50 dark:from-dark-blue-900/20 dark:to-emerald-900/20 rounded-lg"
                  >
                    <span className="font-medium">{local}</span>
                    <span className="font-bold text-dark-blue-600">{count} clases</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
