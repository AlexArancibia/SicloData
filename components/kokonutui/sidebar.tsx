"use client"

import type React from "react"

import { Users2, Shield, Settings, HelpCircle, Menu } from "lucide-react"
import { Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    const isActive = pathname === href

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200 group relative overflow-hidden ${
          isActive
            ? "bg-gradient-to-r from-emerald-500 to-dark-blue-600 text-white shadow-lg"
            : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-dark-blue-700 hover:to-emerald-600"
        }`}
      >
        <Icon
          className={`h-5 w-5 mr-3 flex-shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
        />
        <span className="font-medium">{children}</span>
        {isActive && <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-gradient-to-r from-dark-blue-800 to-dark-blue-900 shadow-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-white" />
      </button>
      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-gradient-secondary transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-dark-blue-700/50
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col relative">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-dark-blue-500/10 pointer-events-none" />

          <div
            className="h-20 px-6 flex items-center border-b border-dark-blue-700/50 relative z-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-dark-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Síclo Data</span>
                <p className="text-xs text-gray-400">Analítica de Clientes</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 relative z-10">
            <div className="space-y-8">
              <div>
                <div className="px-4 mb-4 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Navegación Principal
                </div>
                <div className="space-y-2">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/clientes" icon={Users2}>
                    Clientes
                  </NavItem>
                  <NavItem href="/usuarios" icon={Shield}>
                    Usuarios
                  </NavItem>
                  <NavItem href="/compras" icon={Home}>
                    Compras
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-6 border-t border-dark-blue-700/50 relative z-10">
            <div className="space-y-2">
              <NavItem href="#" icon={Settings}>
                Configuración
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Ayuda
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
