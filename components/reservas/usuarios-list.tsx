"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Shield, User } from "lucide-react"
import { usuarios } from "@/lib/dummy-data"
import type { Usuario } from "@/lib/types"

export default function UsuariosList() {
  const [usuariosList, setUsuariosList] = useState(usuarios)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    rol: "operador" as "admin" | "operador",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      // Editar usuario existente
      setUsuariosList((prev) =>
        prev.map((user) => (user.id_usuario === editingUser.id_usuario ? { ...user, ...formData } : user)),
      )
    } else {
      // Crear nuevo usuario
      const newUser: Usuario = {
        id_usuario: (usuariosList.length + 1).toString(),
        ...formData,
        fecha_creacion: new Date().toISOString().split("T")[0],
      }
      setUsuariosList((prev) => [...prev, newUser])
    }

    setIsDialogOpen(false)
    setEditingUser(null)
    setFormData({ nombre: "", email: "", rol: "operador" })
  }

  const handleEdit = (user: Usuario) => {
    setEditingUser(user)
    setFormData({
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (userId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsuariosList((prev) => prev.filter((user) => user.id_usuario !== userId))
    }
  }

  const resetForm = () => {
    setEditingUser(null)
    setFormData({ nombre: "", email: "", rol: "operador" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rol">Rol</Label>
                <Select
                  value={formData.rol}
                  onValueChange={(value: "admin" | "operador") => setFormData((prev) => ({ ...prev, rol: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operador">Operador</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingUser ? "Actualizar" : "Crear"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios ({usuariosList.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {usuariosList.map((usuario) => (
              <div key={usuario.id_usuario} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    {usuario.rol === "admin" ? (
                      <Shield className="h-6 w-6 text-red-600" />
                    ) : (
                      <User className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{usuario.nombre}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{usuario.email}</p>
                    <p className="text-xs text-gray-500">Creado: {usuario.fecha_creacion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={usuario.rol === "admin" ? "destructive" : "secondary"}>
                    {usuario.rol === "admin" ? "Administrador" : "Operador"}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(usuario)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(usuario.id_usuario)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
