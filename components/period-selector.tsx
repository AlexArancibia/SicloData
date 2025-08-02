"use client"

import * as React from "react"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface PeriodSelectorProps {
  dateRange?: DateRange
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  className?: string
}

export function PeriodSelector({ 
  dateRange, 
  onDateRangeChange,
  className 
}: PeriodSelectorProps) {
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>(
    dateRange || {
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: new Date(),
    }
  )

  // State to control which month is displayed in each calendar
  const [fromMonth, setFromMonth] = React.useState<Date>(
    selectedRange?.from || new Date()
  )
  const [toMonth, setToMonth] = React.useState<Date>(
    selectedRange?.to || new Date()
  )

  React.useEffect(() => {
    if (dateRange) {
      setSelectedRange(dateRange)
      setFromMonth(dateRange.from || new Date())
      setToMonth(dateRange.to || new Date())
    }
  }, [dateRange])

  const handleRangeChange = (range: DateRange | undefined) => {
    setSelectedRange(range)
    onDateRangeChange?.(range)
  }

  const quickOptions = [
    { label: "Hoy", value: "today" },
    { label: "Ayer", value: "yesterday" },
    { label: "Última semana", value: "1w" },
    { label: "Último mes", value: "1m" },
    { label: "Últimos 3 meses", value: "3m" },
    { label: "Último año", value: "1y" },
    { label: "Este mes", value: "currentMonth" },
    { label: "Este año", value: "currentYear" },
  ]

  const handleQuickSelect = (value: string) => {
    const today = new Date()
    let from: Date
    let to: Date

    switch (value) {
      case "today":
        from = today
        to = today
        break
      case "yesterday":
        from = new Date(today.getTime() - 24 * 60 * 60 * 1000)
        to = from
        break
      case "1w":
        from = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        to = today
        break
      case "1m":
        from = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
        to = today
        break
      case "3m":
        from = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate())
        to = today
        break
      case "1y":
        from = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
        to = today
        break
      case "currentMonth":
        from = new Date(today.getFullYear(), today.getMonth(), 1)
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
      case "currentYear":
        from = new Date(today.getFullYear(), 0, 1)
        to = new Date(today.getFullYear(), 11, 31)
        break
      default:
        from = new Date(today.getFullYear(), today.getMonth(), 1)
        to = today
    }

    const newRange = { from, to }
    handleRangeChange(newRange)
    setFromMonth(from)
    setToMonth(to)
  }

  // Generate years (current year - 10 to current year + 1)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i)
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const handleYearMonthChange = (type: 'from' | 'to', field: 'year' | 'month', value: string) => {
    const currentDate = type === 'from' ? selectedRange?.from : selectedRange?.to
    if (!currentDate) return

    const newDate = new Date(currentDate)
    if (field === 'year') {
      newDate.setFullYear(parseInt(value))
    } else {
      newDate.setMonth(parseInt(value))
    }

    const newRange = {
      from: type === 'from' ? newDate : selectedRange?.from,
      to: type === 'to' ? newDate : selectedRange?.to,
    }
    handleRangeChange(newRange)
    
    // Update the corresponding calendar month
    if (type === 'from') {
      setFromMonth(newDate)
    } else {
      setToMonth(newDate)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal h-9 px-3",
            !selectedRange && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedRange?.from ? (
            selectedRange.to ? (
              <>
                {format(selectedRange.from, "dd/MM/yyyy", { locale: es })} -{" "}
                {format(selectedRange.to, "dd/MM/yyyy", { locale: es })}
              </>
            ) : (
              format(selectedRange.from, "dd/MM/yyyy", { locale: es })
            )
          ) : (
            <span>Seleccionar período</span>
          )}
          <ChevronDown className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Left side - Quick shortcuts */}
          <div className="w-48 p-3 border-r border-border">
            <div>
              <h4 className="font-medium text-xs mb-2">Atajos rápidos</h4>
              <div className="space-y-1">
                {quickOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickSelect(option.value)}
                    className="w-full justify-start text-xs h-7"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Two independent calendars */}
          <div className="p-3">
            <h4 className="font-medium text-xs mb-3">Calendarios</h4>
            
            <div className="flex gap-4">
              {/* From Calendar */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-center">Desde</div>
                
                {/* From Year/Month selectors */}
                <div className="flex gap-1">
                  <Select
                    value={selectedRange?.from?.getFullYear().toString()}
                    onValueChange={(value) => handleYearMonthChange('from', 'year', value)}
                  >
                    <SelectTrigger className="h-7 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedRange?.from?.getMonth().toString()}
                    onValueChange={(value) => handleYearMonthChange('from', 'month', value)}
                  >
                    <SelectTrigger className="h-7 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  mode="range"
                  month={fromMonth}
                  onMonthChange={setFromMonth}
                  selected={selectedRange}
                  onSelect={handleRangeChange}
                  numberOfMonths={1}
                  locale={es}
                  className="rounded-md border"
                />
              </div>

              {/* To Calendar */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-center">Hasta</div>
                
                {/* To Year/Month selectors */}
                <div className="flex gap-1">
                  <Select
                    value={selectedRange?.to?.getFullYear().toString()}
                    onValueChange={(value) => handleYearMonthChange('to', 'year', value)}
                  >
                    <SelectTrigger className="h-7 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedRange?.to?.getMonth().toString()}
                    onValueChange={(value) => handleYearMonthChange('to', 'month', value)}
                  >
                    <SelectTrigger className="h-7 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  mode="range"
                  month={toMonth}
                  onMonthChange={setToMonth}
                  selected={selectedRange}
                  onSelect={handleRangeChange}
                  numberOfMonths={1}
                  locale={es}
                  className="rounded-md border"
                />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
} 