"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export function EditTransaction({ transaction }: { transaction: any }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [type, setType] = useState(transaction.type);
  const [category, setCategory] = useState(transaction.category);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("transactions")
      .update({ title, amount: parseInt(amount), type, category })
      .eq("id", transaction.id);

    setLoading(false);

    if (!error) {
      setOpen(false);
      router.refresh();
    } else {
      alert("Gagal update!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-neutral-300 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white p-1 rounded transition-colors">
          <Pencil size={16} />
        </button>
      </DialogTrigger>
      
      {/* DIALOG DARK MODE */}
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#171717] text-neutral-900 dark:text-white font-sans border-neutral-200 dark:border-neutral-800">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Edit Transaksi ✏️</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleUpdate} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label className="dark:text-neutral-300">Judul</Label>
            <Input className="dark:bg-neutral-900 dark:border-neutral-700" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Nominal (Rp)</Label>
              <Input className="dark:bg-neutral-900 dark:border-neutral-700" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Tipe</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="dark:bg-neutral-900 dark:border-neutral-700">
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
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
            {loading ? "Simpan Perubahan" : "Simpan Perubahan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}