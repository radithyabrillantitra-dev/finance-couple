"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type WishlistProps = {
  wishlist: {
    id: number;
    title: string;
    target_amount: number;
    current_amount: number;
    image_url: string | null;
  }
};

export function EditWishlist({ wishlist }: WishlistProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(wishlist.title);
  const [target, setTarget] = useState(wishlist.target_amount.toString());
  const [current, setCurrent] = useState(wishlist.current_amount.toString());
  const [image, setImage] = useState(wishlist.image_url || "");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("wishlist")
      .update({
        title,
        target_amount: parseInt(target),
        current_amount: parseInt(current),
        image_url: image,
      })
      .eq("id", wishlist.id);

    setLoading(false);

    if (!error) {
      setOpen(false);
      router.refresh();
    } else {
      alert("Gagal update!");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin mau menghapus target ini?");
    if (!confirm) return;

    setLoading(true);
    const { error } = await supabase.from("wishlist").delete().eq("id", wishlist.id);
    
    if (!error) {
      setOpen(false);
      router.refresh();
    } else {
      alert("Gagal hapus!");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 text-neutral-300 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <Pencil size={16} />
        </button>
      </DialogTrigger>
      
      {/* DIALOG DARK MODE */}
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#171717] text-neutral-900 dark:text-white font-sans border-neutral-200 dark:border-neutral-800">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Edit Target ✏️</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleUpdate} className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label className="dark:text-neutral-300">Nama Impian</Label>
            <Input className="dark:bg-neutral-900 dark:border-neutral-700" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label className="dark:text-neutral-300">Link Gambar</Label>
            <Input className="dark:bg-neutral-900 dark:border-neutral-700" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Target (Rp)</Label>
              <Input className="dark:bg-neutral-900 dark:border-neutral-700" type="number" value={target} onChange={(e) => setTarget(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label className="dark:text-neutral-300">Terkumpul</Label>
              <Input className="dark:bg-neutral-900 dark:border-neutral-700" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} required />
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:justify-between items-center mt-4">
            <button 
              type="button"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1 hover:underline px-2 transition-colors"
            >
              <Trash2 size={14} /> Hapus Target
            </button>

            <Button type="submit" disabled={loading} className="bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200">
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}