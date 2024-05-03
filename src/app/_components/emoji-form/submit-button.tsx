import { CornerDownLeft } from "lucide-react"
import React from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { Loader } from "../loader"
import { useEffect } from 'react';
import { analyse } from "../data-analyse"
import { RefreshContext } from "../data-refresh/index";

export const SubmitButton = React.forwardRef<React.ElementRef<"button">>((_, ref) => {
  const { pending } = useFormStatus()
  const { triggerRefresh } = React.useContext(RefreshContext);

  const handleSubmit = () => {
    triggerRefresh();
  };

  return (
    <button
      onClick={handleSubmit}
      ref={ref}
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
    >
      {/* 在这里显示结果 */}
      {pending ? <Loader /> : <CornerDownLeft size={16} className="-ml-px" />}
    </button>
  ) 
})
SubmitButton.displayName = "SubmitButton"
