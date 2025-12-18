import { supabase } from "@/lib/supabase";
import { AddWishlist } from "../../components/AddWishlist"; 
import { EditWishlist } from "../../components/EditWishlist";

export const revalidate = 0;

export default async function WishlistPage() {
  const { data: wishlists, error } = await supabase
    .from("wishlist")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching wishlist:", error);

  const formatRupiah = (val: number) => new Intl.NumberFormat("id-ID").format(val);

  return (
    // TAMBAHKAN: dark:bg-[#0a0a0a] dark:text-neutral-100
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 pb-20 font-serif transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Header - Border disesuaikan */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-100 dark:border-neutral-800 pb-8 gap-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              Future Plans.
            </h1>
            <p className="font-sans text-neutral-500 dark:text-neutral-400 font-light text-lg">
              Hal-hal yang sedang kita usahakan bersama.
            </p>
          </div>
          <div className="hidden md:block">
            <AddWishlist />
          </div>
        </div>

        {/* List Wishlist */}
        <div className="space-y-12">
          {wishlists?.map((item) => {
            const progress = Math.min((item.current_amount / item.target_amount) * 100, 100);
            
            return (
              <div key={item.id} className="group">
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                  
                  {/* KOLOM TEKS (Kiri) */}
                  <div className="flex-1 w-full order-2 md:order-1">
                    
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
                            Goal
                          </span>
                          {progress >= 100 && (
                            <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100 text-[10px] px-2 py-0.5 rounded-full font-sans font-bold uppercase tracking-wide">
                              Completed
                            </span>
                          )}
                       </div>
                       
                       <EditWishlist wishlist={item} />
                    </div>
                    
                    {/* Judul: dark:text-white */}
                    <h2 className="font-serif text-3xl font-bold mb-4 text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {item.title}
                    </h2>

                    {/* KARTU PROGRESS: dark:bg-neutral-900 dark:border-neutral-800 */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-100 dark:border-neutral-800 transition-colors">
                      <div className="flex justify-between text-sm font-sans mb-2 font-medium">
                        <span className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wide">Progress</span>
                        <span className="text-neutral-900 dark:text-white">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      
                      {/* Bar Background: dark:bg-neutral-800 */}
                      <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mb-4">
                        {/* Bar Isi: dark:bg-white */}
                        <div 
                          className="h-full bg-neutral-900 dark:bg-white transition-all duration-1000 ease-out" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-end font-sans">
                        <div>
                          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Terkumpul</p>
                          <p className="font-medium text-lg dark:text-neutral-200">Rp {formatRupiah(item.current_amount)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">Target</p>
                          <p className="font-medium text-neutral-600 dark:text-neutral-400">Rp {formatRupiah(item.target_amount)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KOLOM GAMBAR (Kanan) - dark:border-neutral-800 */}
                  <div className="w-full md:w-56 shrink-0 order-1 md:order-2">
                    <div className="aspect-[4/3] md:aspect-square overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 relative shadow-sm border border-neutral-100 dark:border-neutral-800">
                       <img 
                        src={item.image_url || "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=800&auto=format&fit=crop"} 
                        alt={item.title}
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 opacity-90 hover:opacity-100"
                       />
                    </div>
                  </div>

                </div>
                
                <hr className="border-neutral-100 dark:border-neutral-800 mt-12" />
              </div>
            );
          })}

          {wishlists?.length === 0 && (
             <div className="text-center py-20 text-neutral-400 dark:text-neutral-600 font-sans italic">
               Belum ada target impian.
             </div>
          )}
        </div>

        <div className="md:hidden">
          <AddWishlist />
        </div>

      </div>
    </main>
  );
}