"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#171717", "#404040", "#737373", "#a3a3a3", "#d4d4d4", "#e5e5e5", "#f5f5f5"];

const CATEGORY_LABELS: { [key: string]: string } = {
  food: "Makan", transport: "Ojol", date: "Date", groceries: "Belanja", 
  bills: "Tagihan", salary: "Gaji", other: "Lainnya",
};

export function ExpenseChart({ transactions }: { transactions: any[] }) {
  const data = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const grouped = expenses.reduce((acc, curr) => {
      const cat = curr.category || "other";
      acc[cat] = (acc[cat] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(grouped).map((key) => ({
      name: CATEGORY_LABELS[key] || key,
      value: grouped[key],
    }));
  }, [transactions]);

  if (data.length === 0) return (
    <div className="h-40 bg-neutral-50 rounded flex items-center justify-center text-xs text-neutral-400 font-sans border border-dashed border-neutral-200">
      Belum ada pengeluaran
    </div>
  );

  return (
    <div className="w-full">
      {/* AREA GRAFIK - DIBESARKAN (h-72) */}
      <div className="h-72 w-full relative mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60} // Lubang tengah
              outerRadius={100} // Lingkaran luar (DIBESARKAN)
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ background: '#171717', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px', padding: '8px 12px' }}
               itemStyle={{ color: '#fff' }}
               formatter={(value: number) => new Intl.NumberFormat("id-ID").format(value)}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Label Total di Tengah Donut */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Total</span>
        </div>
      </div>

      {/* LEGEND / KETERANGAN (Grid di Bawah) */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm border-b border-neutral-100 pb-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-neutral-600 dark:text-neutral-400 truncate max-w-[80px] font-sans">{item.name}</span>
            </div>
            <span className="font-bold text-neutral-900 dark:text-white font-mono">
               {((item.value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}