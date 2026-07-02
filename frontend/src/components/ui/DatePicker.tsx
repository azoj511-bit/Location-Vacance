'use client';

import React from 'react';

interface DatePickerProps {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
  minDate?: string;
  placeholder?: string;
  className?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  minDate,
  placeholder = 'Sélectionner',
  className = '',
}: DatePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val ? val : null);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value || ''}
          min={minDate}
          onChange={handleChange}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent transition-all cursor-pointer font-medium"
        />
        {!value && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none font-medium">
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
}
