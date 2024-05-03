import { ResultHandle } from "../result-handle/index";

export const ShowResult = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
            <div className="grid grid-cols-1 gap-2 justify-items-stretch w-full">
              <h3 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out"></h3>
              <ResultHandle/>
            </div> 
        </div>
        )
} 