"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { PenLine, Save } from "lucide-react";

export function MemoBoard() {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemo();
  }, []);

  const fetchMemo = async () => {
    const { data } = await supabase.from("memos").select("content").eq("id", 1).single();
    if (data) {
      setContent(data.content);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await supabase.from("memos").update({ content }).eq("id", 1);
  };

  if (loading) return <div className="h-32 bg-neutral-50 dark:bg-neutral-900 animate-pulse rounded-lg"></div>;

  return (
    // DARK MODE: Background jadi Yellow-950 (Sangat Gelap), Border jadi Yellow-900
    <div className="bg-[#FEFCE8] dark:bg-yellow-950/30 p-6 rounded-none border-l-4 border-yellow-400 dark:border-yellow-700 shadow-sm relative group transition-all hover:shadow-md">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-serif text-lg font-bold text-neutral-800 dark:text-yellow-100 flex items-center gap-2">
          <span className="text-xl">📌</span> Our Notes
        </h3>
        
        {isEditing ? (
          <button 
            onClick={handleSave}
            className="text-xs bg-neutral-900 dark:bg-yellow-100 text-white dark:text-yellow-900 px-3 py-1 rounded-full font-sans font-medium flex items-center gap-1 hover:bg-neutral-700 transition-colors"
          >
            <Save size={12} /> Simpan
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-neutral-400 hover:text-neutral-900 dark:text-yellow-600 dark:hover:text-yellow-200 transition-colors"
          >
            <PenLine size={16} />
          </button>
        )}
      </div>

      {/* Area Teks */}
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 bg-transparent font-serif text-lg text-neutral-800 dark:text-yellow-100/90 resize-none focus:outline-none placeholder:text-neutral-400"
          placeholder="Tulis pesan..."
          autoFocus
        />
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="font-serif text-lg text-neutral-800 dark:text-yellow-100/90 whitespace-pre-wrap cursor-pointer min-h-[5rem] decoration-neutral-300"
        >
          {content || "Kosong..."}
        </div>
      )}

      {/* Footer Waktu */}
      <div className="mt-4 border-t border-yellow-200/50 dark:border-yellow-800/30 pt-2 flex justify-between items-center">
        <span className="text-[10px] font-sans text-neutral-400 dark:text-yellow-600/60 uppercase tracking-widest">
          Shared Memo
        </span>
      </div>
    </div>
  );
}