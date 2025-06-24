"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import moment from "moment";

interface MonthYearPickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function MonthYearPicker({
  value,
  onChange,
  placeholder = "Select month/year...",
  disabled = false,
  required = false,
}: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentYear = moment().year();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const months = moment.months();

  const [selectedMonth, setSelectedMonth] = useState<number>(
    value ? moment(value, "YYYY-MM").month() : 0
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    value ? moment(value, "YYYY-MM").year() : currentYear
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMonthYearSelect = (month: number, year: number) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    const dateValue = moment().month(month).year(year).format("YYYY-MM");
    onChange(dateValue);
    setIsOpen(false);
  };

  const displayValue = value 
    ? moment(value, "YYYY-MM").format("MMMM YYYY")
    : "";

  return (
    <div className={`relative`} ref={dropdownRef}>
      <div
        className={`w-full px-3 py-2 border border-slate-300 rounded-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent cursor-pointer bg-white min-h-[42px] flex items-center justify-between ${
          disabled ? "bg-slate-100 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={displayValue ? "text-slate-900" : "text-slate-500"}>
          {displayValue || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-300 rounded-md shadow-lg">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  Month
                </label>
                <div className="max-h-32 overflow-y-auto border border-slate-200 rounded">
                  {months.map((month, index) => (
                    <div
                      key={month}
                      className={`px-3 py-2 cursor-pointer hover:bg-slate-50 ${
                        selectedMonth === index ? "bg-indigo-50 text-indigo-600" : ""
                      }`}
                      onClick={() => setSelectedMonth(index)}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  Year
                </label>
                <div className="max-h-32 overflow-y-auto border border-slate-200 rounded">
                  {years.map((year) => (
                    <div
                      key={year}
                      className={`px-3 py-2 cursor-pointer hover:bg-slate-50 ${
                        selectedYear === year ? "bg-indigo-50 text-indigo-600" : ""
                      }`}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-2 border-t border-slate-200">
              <Button
                type="button"
                size="sm"
                onClick={() => handleMonthYearSelect(selectedMonth, selectedYear)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Select
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
