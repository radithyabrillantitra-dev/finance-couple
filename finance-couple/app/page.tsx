import { supabase } from "@/lib/supabase";
import { TransactionItem } from "../components/TransactionItem";
import { AddTransaction } from "../components/AddTransaction";
import { ExpenseChart } from "../components/ExpenseChart";
import { MemoBoard } from "../components/MemoBoard";
import { ExportButton } from "../components/ExportButton";

export const revalidate = 0;

export default async function Home() {
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching:", error);

  const totalIncome = transactions?.filter((t) => t.type === "income").reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const totalExpense = transactions?.filter((t) => t.type === "expense").reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const currentBalance = totalIncome - totalExpense;
  const formatRupiah = (val: number) => new Intl.NumberFormat("id-ID").format(val);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      
      {/* PADDING MOBILE: px-4 py-6 (Lebih rapat) | DESKTOP: px-6 py-12 */}
      <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-12">
        
        <div className="flex flex-col-reverse md:grid md:grid-cols-[1fr_320px] gap-8 md:gap-20">
          
          {/* === KOLOM KIRI: TRANSAKSI === */}
          <div>
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4 md:mb-6 flex justify-between items-center sticky top-16 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur z-10 pt-2">
              <h2 className="font-sans text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                Riwayat
              </h2>
              <ExportButton /> 
            </div>

            <div className="space-y-0 pb-20 md:pb-0"> {/* Tambah padding bawah di HP biar gak ketutup tombol Add */}
              {transactions?.map((trx) => (
                <TransactionItem key={trx.id} transaction={trx} />
              ))}
              
              {transactions?.length === 0 && (
                <div className="py-20 text-center text-neutral-400 dark:text-neutral-600 font-sans text-sm">
                  Belum ada data transaksi.
                </div>
              )}
            </div>
          </div>

          {/* === KOLOM KANAN: SIDEBAR (HEADER DI HP) === */}
          <div className="relative">
            <div className="md:sticky md:top-24 space-y-6 md:space-y-10">
              
              {/* SALDO: Font Mobile Lebih Kecil (text-4xl) */}
              <div>
                <p className="font-sans text-[10px] md:text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                  Total Saldo
                </p>
                <div className="flex items-start">
                  <span className="font-sans text-base md:text-lg text-neutral-400 dark:text-neutral-600 mt-1 mr-2 font-light">Rp</span>
                  <h1 className="font-serif text-4xl md:text-6xl text-neutral-900 dark:text-white font-medium tracking-tight leading-none">
                    {formatRupiah(currentBalance)}
                  </h1>
                </div>
                {/* Status Keuangan */}
                <p className="font-sans text-xs text-neutral-400 dark:text-neutral-500 mt-2 md:mt-4 leading-relaxed line-clamp-1 md:line-clamp-none">
                  {currentBalance < 0 
                    ? "⚠️ Pengeluaran > Pemasukan." 
                    : "✅ Keuangan aman terkendali."}
                </p>
              </div>

              {/* MEMO & CHART: Di HP kita sembunyikan Chart kalau terlalu penuh, atau biarkan tapi kecil */}
              {/* Kita pakai 'hidden md:block' kalau mau hide chart di HP. Tapi biar keren biarin aja. */}
              
              <div className="grid grid-cols-1 gap-6">
                <MemoBoard />
                
                <div className="bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-lg md:bg-transparent md:p-0">
                   <p className="font-sans text-[10px] md:text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-4">
                     Recap Bulan Ini
                   </p>
                   <ExpenseChart transactions={transactions || []} />
                </div>
              </div>

              {/* Tombol Add Desktop */}
              <div className="hidden md:block pt-4 border-t border-neutral-100 dark:border-neutral-800">
                 <div className="pt-6">
                   <AddTransaction />
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Tombol Add Mobile (Floating) */}
      <div className="md:hidden fixed bottom-6 right-4 z-50 shadow-2xl rounded-full">
        <AddTransaction />
      </div>
    </main>
  );
}