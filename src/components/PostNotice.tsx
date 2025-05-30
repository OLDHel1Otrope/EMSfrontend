import { useState } from "react";
import { ClipboardSignature, FileText } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { useToast } from "../contexts/CustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const PostNotice = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const showToast = useToast();
  const queryClient = useQueryClient(); // for refetching notices

  const addNotice = async (data) => {
    const response = await axiosInstance.post("/notices", data);
    return response.data;
  };

  const noticeMutation = useMutation({
    mutationFn: addNotice,
    onSuccess: () => {
      showToast("Notice was posted successfully");
      queryClient.invalidateQueries({ queryKey: ["notices"] }); // refetch notices
      onClose();
    },
    onError: (error) => {
      showToast("Failed to post Notice.");
      console.error("Error posting notice:", error);
    },
  });

  const handleSubmit = () => {
  const data = {
    notice_title: String(title).trim(),
    notice_text: String(text).trim(),
  };

  if (!data.notice_title || !data.notice_text) {
    showToast("Both Title and Description are required");
    return;
  }

  noticeMutation.mutate(data);
};

  

  return (
    <div className="flex flex-col gap-8 w-full px-6 py-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-700/30 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] mt-2">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-3 mb-1">
          <ClipboardSignature className="text-stone-400" size={20} />
          <h2 className="text-lg font-semibold text-stone-300">Title</h2>
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter notice title..."
          className="w-full bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-3 mb-1">
          <FileText className="text-stone-400" size={20} />
          <h2 className="text-lg font-semibold text-stone-300">Description</h2>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter notice details..."
          rows={6}
          className="w-full resize-none bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl border border-stone-700/30 p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-600"
        />
      </div>

      <div className="pt-2">
        <button
          onClick={handleSubmit}
          className="w-fit px-6 py-3 rounded-3xl bg-gradient-to-br from-stone-700 to-stone-900 text-white font-semibold shadow-md hover:brightness-110 transition-all"
        >
          Post Notice
        </button>
      </div>
    </div>
  );
};
