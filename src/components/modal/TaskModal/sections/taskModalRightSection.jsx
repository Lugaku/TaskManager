export default function TaskModalRightSection({task, handleDeleteComment, setCommentText, commentText, handleAddComment}){

    return(
        <div className="w-2/5 flex flex-col bg-black/30 border-l border-white/10">
            <div className="p-4 bg-[#0e0e0e] border-b border-white/10">
              <h1 className="text-lg font-medium text-white/80">
                Activity
              </h1>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
              {(task.comments || []).map((c) => (
                <div
                    key={c.id}
                    className="
                        w-full min-w-0
                        flex flex-col
                        bg-[#101111]
                        border border-white/5
                        rounded-xl
                        px-4 py-3
                        gap-2
                        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                    "
                    >
                    {/* Header */}
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-white/60 min-w-0">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white shrink-0">
                            U
                        </div>
                        <span className="font-medium text-white/70 truncate">
                            Username
                        </span>
                        </div>

                        <span className="text-white/30 tracking-wide shrink-0">
                        {new Date(c.id).toLocaleString()}
                        </span>
                    </div>

                    {/* Content */}
                    <p className="
                        w-full
                        text-sm
                        text-white/80
                        leading-relaxed
                        whitespace-pre-wrap
                        break-words
                    ">
                        {c.text}
                    </p>

                    {/* Footer */}
                    <div className="flex justify-end pt-1">
                        <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-xs text-white/40 hover:text-red-400 transition-colors"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="p-3 flex flex-col gap-2 bg-[#0e0e0e] border border-white/10 rounded-md">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="h-16 resize-none bg-transparent text-sm text-white/80 outline-none"
                />

                <button
                  onClick={handleAddComment}
                  className="self-end px-3 py-1 text-sm bg-white/10 rounded-md hover:bg-white/20 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
    )
}