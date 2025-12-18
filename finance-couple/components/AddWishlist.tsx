"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function AddWishlist() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("0");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("wishlist").insert([
      {
        title,
        target_amount: parseInt(target),
        current_amount: parseInt(current),
        image_url: image || "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?q=80&w=800&auto=format&fit=crop",
      },
    ]);

    setLoading(false);

    if (!error) {
      setOpen(false);
      setTitle("");
      setTarget("");
      setCurrent("0");
      setImage("");
      router.refresh();
    } else {
      alert("Gagal menyimpan!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-6 right-6 md:static md:w-full bg-neutral-900 dark:bg-white text-white dark:text-black w-14 h-14 md:h-auto md:py-3 md:px-6 rounded-full flex items-center justify-center gap-2 shadow-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all z-50">
          <Plus size={24} />
          <span className="hidden md:inline font-sans font-medium text-sm">Tambah Target</span>
        </button>
      </DialogTrigger>
      
      {/* UPDATE DIALOG: dark:bg-[#171717] dark:text-white dark:border-neutral-800 */}
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#171717] text-neutral-900 dark:text-white font-sans border-neutral-200 dark:border-neutral-800">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Target Baru 🎯</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label className="dark:text-neutral-300">Nama Impian</Label>
            {/* INPUT DARK: dark:bg-neutral-800 dark:border-neutral-700 */}
            <Input className="dark:bg-neutral-900 dark:border-neutral-700" placeholder="Contoh: Beli PS5 Pro" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label className="dark:text-neutral-300">Link Gambar (URL)</Label>
            <Input className="dark:bg-neutral-900 dark:border-neutral-700" placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} />
            <p className="text-[10px] text-neutral-400">
              Cari di Google Images/Unsplash, klik kanan gambar -&gt; Copy Image Address.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Target (Rp)</Label>
              <Input className="dark:bg-neutral-900 dark:border-neutral-700" type="number" placeholder="0" value={target} onChange={(e) => setTarget(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Sudah Terkumpul</Label>
              <Input className="dark:bg-neutral-900 dark:border-neutral-700" type="number" placeholder="0" value={current} onChange={(e) => setCurrent(e.target.value)} required />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black mt-2 hover:bg-neutral-800 dark:hover:bg-neutral-200">
            {loading ? "Menyimpan..." : "Simpan Impian"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}