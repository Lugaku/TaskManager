import { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function UniversalModal({
  title,
  fields,
  onSubmit,
  submitText = "Submit",
  onClose,
  desc = "",
}) {
  const ref = useRef(null);

  // form state
  const [form, setForm] = useState(
    Object.fromEntries(fields.map(f => [f.name, ""]))
  );

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleChange(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    onSubmit(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[999] bg-black/10">
      <div
        ref={ref}
        className="w-120"
      >
       <section className="flex flex-col p-6 bg-[#1b1c1c]  border border-white/10 rounded-t-lg ">
         <div className="flex flex-col gap-2 mb-8 ">
          <div className="flex flex-row justify-between items-start ">
            <h2 className="text-white text-lg">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white/80"
            >
              <IoClose className="text-lg"/>
            </button>
          </div>
          <p className="text-xs text-white/30">{desc}</p>
        </div>

        <div className="flex flex-col gap-3">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col w-full justify-start items-start gap-1">
              {field.label && <p className="text-white/60 text-sm">{field.label} <span className="text-sx text-white/30">{field.optional}</span> </p>}
              <input
                type="text"
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full bg-white/10 text-white px-3 py-2 rounded outline-none"
              />
            </div>
          ))}
        </div>

       </section>
       
        
           <div className="bg-[#151616] p-3 border border-white/10 rounded-b-lg border-t-0 flex items-end justify-end">
             <button
                onClick={handleSubmit}
                className="h-7 px-2 text-sm rounded-lg flex gap-1 items-center justify-center bg-white/80 hover:bg-white text-black/80"
                >
                {submitText}
            </button>
           </div>
        
      </div>
    </div>
  );
}