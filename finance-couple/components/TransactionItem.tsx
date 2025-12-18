"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; 
import { EditTransaction } from "./EditTransaction";

type TransactionProps = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  created_at: string;
  is_shared: boolean;
};

// Mapping kategori ke Bahasa Indonesia
const LABELS: { [key: string]: string } = {
  food: "Makan", transport: "Transport", date: "Date", groceries: "Belanja", 
  bills: "Tagihan", salary: "Gaji", other: "Lainnya",
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
};

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

export function TransactionItem({ transaction }: { transaction: TransactionProps }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Konfirmasi sebelum hapus
    if (!confirm(`Hapus "${transaction.title}"?`)) return;
    
    setIsDeleting(true);
    const { error } = await supabase.from("transactions").delete().eq("id", transaction.id);
    
    if (!error) { 
      router.refresh(); 
    } else { 
      alert("Gagal menghapus data!"); 
      setIsDeleting(false); 
    }
  };

  return (
    <div className={`group py-5 border-b border-neutral-100 dark:border-neutral-800 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50 ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        
        {/* === BAGIAN KIRI: Metadata & Judul === */}
        <div className="flex-1 min-w-0"> {/* min-w-0 agar truncate berfungsi */}
          
          {/* Baris Atas: Kategori • Tanggal */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {LABELS[transaction.category || "other"] || "General"}
            </span>
            <span className="text-[10px] text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              {formatDate(transaction.created_at)}
            </span>
          </div>

          {/* Judul Transaksi */}
          <h3 className="font-serif text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-200 leading-tight mb-1 truncate">
            {transaction.title}
          </h3>
          
          {/* Subtitle Tipe */}
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-sans">
            {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            {transaction.is_shared && ' • Shared'}
          </p>
        </div>

        {/* === BAGIAN KANAN: Nominal & Tombol Aksi === */}
        <div className="text-right whitespace-nowrap pt-1">
           
           {/* Nominal Uang */}
           <span className={`font-mono text-sm md:text-base font-medium tracking-tight ${transaction.type === 'income' ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-900 dark:text-neutral-200'}`}>
            {transaction.type === 'income' ? "+" : "-"} Rp {formatRupiah(transaction.amount)}
          </span>

          {/* Tombol Aksi (Edit & Hapus) 
              LOGIKA CSS:
              - opacity-100    : Selalu terlihat di HP (Mobile First)
              - md:opacity-0   : Sembunyi di layar Laptop (Medium screen ke atas)
              - md:group-hover : Muncul lagi kalau di-hover di Laptop
          */}
          <div className="flex justify-end gap-2 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
            <EditTransaction transaction={transaction} />
            
            <button 
              onClick={handleDelete} 
              disabled={isDeleting} 
              className="text-neutral-300 dark:text-neutral-600 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1"
              title="Hapus"
            >
              <Trash2 size={16} />
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}