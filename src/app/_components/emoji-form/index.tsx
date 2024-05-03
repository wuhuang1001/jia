"use client"

import { SetStateAction, useEffect, useRef, useState } from "react"
import { createEmoji } from "./action"
import { SubmitButton } from "./submit-button"
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom"
import toast from "react-hot-toast"
import useSWR from "swr"
import { GlobalData } from "./form-data";
import { RefreshProvider } from "../data-refresh/index";
import { useContext } from 'react';
import { FormContext, FormDataContextType } from "../data-context/index"; // 导入类型定义
import { analyse } from "../data-analyse/index"

interface EmojiFormProps {
  initialPrompt?: string
}

export function EmojiForm({ initialPrompt }: EmojiFormProps) {
  const [formState, formAction] = useFormState(createEmoji)
  const firstRef = useRef<React.ElementRef<"input">>(null)
  const secondRef = useRef<React.ElementRef<"input">>(null)
  const thirdRef = useRef<React.ElementRef<"input">>(null)
  const submitRef = useRef<React.ElementRef<"button">>(null)
  // const [token, setToken] = useState("")
  const [size, setSize] = useState("")
  const [length, setLength] = useState("")
  const [firstSelectValue, setFirstSelectValue] = useState("");
  const [showKindSelect, setShowSecondSelect] = useState(false);
  const [showLengthSelect, setShowThirdSelect] = useState(false);
  const [timeSelectValue, setTimeSelectValue] = useState("");
  const [kindSelectValue, setKindSelectValue] = useState("");
  const [signSelectValue, setSignSelectValue] = useState("");
  // const [showFoutthSelect, setShowFourthSelect] = useState(false);
  

  useEffect(() => {
    if (!formState) return
    toast.error(formState.message)
  }, [formState])

  const handleSizeChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSize(event.target.value);
  }

  const handleTimeChange = (event: { target: { value: SetStateAction<string> } }) => {
    setTimeSelectValue(event.target.value);
  }

  const handleKindChange = (event: { target: { value: SetStateAction<string> } }) => {
    setKindSelectValue(event.target.value);
  }

  const handleLengthChange = (event: { target: { value: SetStateAction<string> } }) => {
    setLength(event.target.value);
  }

  const handleSignChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSignSelectValue(event.target.value);
  }

  const handleChangeSelectChange = (event: { target: { value: SetStateAction<string> } }) => {
    setFirstSelectValue(event.target.value);
    if (event.target.value === '2') {
      setShowSecondSelect(true);
      setShowThirdSelect(false);
      setLength('')
    } else if(event.target.value === '1'){
      setShowSecondSelect(false);
      setShowThirdSelect(true);
      setLength('')
    }else {
      setShowSecondSelect(false);
      setShowThirdSelect(false);
    }
  }

  // 
  // 使用useContext获取setFormData函数
  const formContext = useContext(FormContext) as FormDataContextType; // 类型断言
  const { setFormData } = formContext;
  // 添加一个处理表单提交的函数
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();



    // 将表单数据设置到context中
    setFormData(getFormData);

    // 如果需要执行其他操作，如API调用，可以在这里做
  };

  const getFormData = () => {
    const formData = {
      size: size || '',
      length: length || '',
      change: firstSelectValue || '',
      time: timeSelectValue || '',
      kind: kindSelectValue || '',
      sign: signSelectValue || '',
      
    };
  
    return formData;
  };

  // 
  
  return (
    <form action={formAction} onSubmit={handleSubmit} className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full">
      <input
        defaultValue={initialPrompt}
        onChange={handleSizeChange}
        type="text"
        name="size"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            // 转到下一个输入框
            submitRef.current?.click()
          }
        }}
        placeholder="结节大小：mm"
        className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
        // style={{color: '#fff', backgroundColor: '#000', fontFamily: 'Arial'}}
      />
      {parseFloat(size) > 5 && 
        <>
        <select
          defaultValue={initialPrompt}
          // type="text"
          name="time"
          onChange={handleTimeChange}
          className="bg-white text-black placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
          style={{color: '#000', backgroundColor: '#fff', fontFamily: 'Arial'}}
        >
          <option value="0">变化时间</option>
          <option value="1">一年内</option>
          <option value="2">两年内</option>
          <option value="3">三年内</option>
          <option value="4">四年内</option>
          <option value="5">五年及以上</option>
        </select>
        
        <select
          defaultValue={initialPrompt}
          onChange={handleChangeSelectChange}
          // type="text"
          name="change"

          className="bg-white text-black placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
          style={{color: '#000', backgroundColor: '#fff', fontFamily: 'Arial'}}
        >
          <option value="0">有无变化</option>
          <option value="1">有变化</option>
          <option value="2">无变化</option>
        </select>


      {showKindSelect && 
        <select
        name="kind"
        onChange={handleKindChange}
        className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
        style={{color: '#fff', backgroundColor: '#000', fontFamily: 'Arial'}}
        >
        <option value="0">请选择结节种类...</option>
        <option value="1">实体结节</option>
        <option value="2">亚实体结节</option>
        </select>
      }

      {showLengthSelect && 
        <input
        defaultValue={initialPrompt}
        onChange={handleLengthChange}
        type="text"
        name="length"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            submitRef.current?.click()
          }
        }}
        placeholder="变化长度：mm"
        className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
        style={{color: '#fff', backgroundColor: '#000', fontFamily: 'Arial'}}
      />
      }
      {parseFloat(length) >= 8 && parseFloat(length) < 20 && 
      <select
        defaultValue={initialPrompt}
        // type="text"
        name="sign"
        onChange={handleSignChange}
        className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
        style={{color: '#fff', backgroundColor: '#000', fontFamily: 'Arial'}}
      >
        <option value="0" >请选择体征种类...</option>
        <option value="1">有恶性体征</option>
        <option value="2">无恶性体征</option>
      </select>
      }
      </>
      }
      {/* <RefreshProvider> */}
      <SubmitButton ref={submitRef} />
      {/* </RefreshProvider> */}
    </form>
  )
}
