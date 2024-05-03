"use client"

import React from 'react';
import { useContext } from 'react';
import { analyse } from '../data-analyse/index';
import { FormContext } from '../data-context/index';
// import { analyse } from "../data-analyse/index";

export const ResultHandle = () => {

  // 正确类型推断，无需as unknown as
  const { formData } = useContext(FormContext);

  React.useEffect(() => {
    if(formData){
      // 当formData更新时，打印或处理数据
      console.log("formData:", formData); 
      console.log("analyse:", analyse(formData)?.state);
    }
  }, [formData]);

  // console.log("analyse:", analyse(formData));
  // analyse(formData);

  return (
    <div>
      {/* 根据formData渲染结果 */}
      {analyse(formData)?.state !== null && (analyse(formData)?.state !== -1) ? (
        <div>
          <h3 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out"
          >您的评级为: {analyse(formData)?.state}</h3>
        </div>
      ):(
        <div>
          <h3 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out"
          >建议进行LDCT检查: {analyse(formData)?.result}个月</h3>
        </div>
      )
      }
    </div>
  );
}

 