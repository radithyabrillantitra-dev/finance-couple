"use client";

import { Download } from "lucide-react";
import { supabase } from "../lib/supabase";

export function ExportButton() {
  const handleDownload = async () => {
    // 1. Ambil semua data
    const { data: transactions } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!transactions || transactions.length === 0) {
      alert("Belum ada data untuk di-export.");
      return;
    }

    // 2. Buat Header CSV
    const headers = ["ID", "Judul", "Jumlah", "Tipe", "Kategori", "Tanggal"];
    
    // 3. Convert Data ke Format CSV
    const csvContent = [
      headers.join(","), // Baris Header
      ...transactions.map(t => 
        `${t.id},"${t.title}",${t.amount},${t.type},${t.category},${t.created_at}`
      )
    ].join("\n");

    // 4. Trigger Download File
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `finance_backup_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleDownload}
      className="flex items-center gap-2 text-xs font-sans font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-colors"
    >
      <Download size={14} />
      Export Data (CSV)
    </button>
  );
}