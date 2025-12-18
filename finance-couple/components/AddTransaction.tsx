"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function AddTransaction() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("transactions").insert([
      { title, amount: parseInt(amount), type, category, is_shared: false },
    ]);

    setLoading(false);

    if (!error) {
      setOpen(false);
      setTitle("");
      setAmount("");
      router.refresh();
    } else {
      alert("Gagal menyimpan!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-neutral-900 dark:bg-white text-white dark:text-black w-full py-3 rounded-full font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg flex items-center justify-center gap-2">
          <Plus size={18} />
          <span>Tulis Transaksi Baru</span>
        </button>
      </DialogTrigger>
      
      {/* UPDATE WARNA DIALOG: dark:bg-[#171717] dark:border-neutral-800 */}
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#171717] text-neutral-900 dark:text-white font-sans border-neutral-200 dark:border-neutral-800">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Catat Transaksi ✍️</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label className="dark:text-neutral-300">Judul</Label>
            <Input className="dark:bg-neutral-900 dark:border-neutral-700" placeholder="Makan Siang / Gaji" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Nominal (Rp)</Label>
              <Input className="dark:bg-neutral-900 dark:border-neutral-700" type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Tipe</Label>
              <Select value={type} onValueChange={setType}>
                {/* SELECT TRIGGER: dark:bg-neutral-900 */}
                <SelectTrigger className="dark:bg-neutral-900 dark:border-neutral-700">
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                {/* SELECT CONTENT: dark:bg-[#171717] */}
                <SelectContent className="bg-white dark:bg-[#171717] border-neutral-200 dark:border-neutral-800 dark:text-white">
                  <SelectItem value="expense">Pengeluaran</SelectItem>
                  <SelectItem value="income">Pemasukan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="dark:text-neutral-300">Kategori</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="dark:bg-neutral-900 dark:border-neutral-700">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#171717] border-neutral-200 dark:border-neutral-800 dark:text-white">
                <SelectItem value="food">🍔 Makan</SelectItem>
                <SelectItem value="transport">🛵 Transport</SelectItem>
                <SelectItem value="date">🌹 Date</SelectItem>
                <SelectItem value="groceries">🛒 Belanja</SelectItem>
                <SelectItem value="bills">⚡ Tagihan</SelectItem>
                <SelectItem value="salary">💰 Gaji</SelectItem>
                <SelectItem value="other">✨ Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black mt-2 hover:bg-neutral-800 dark:hover:bg-neutral-200">
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}