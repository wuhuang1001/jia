"use client"

import React, { createContext, useState, useContext } from 'react';

// 定义一个类型别名来精确表示formData的类型
export type FormData = {
  // 根据实际情况定义字段
  // 例如：
  size?: string;
  time?: string;
  change?: string;
  kind?: string;
  sign?: string;
  length?: string;
  // ...其他字段
};

export type FormDataContextType = {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  };

// 使用正确的类型定义setFormData，默认值为一个空的dispatch函数，接受一个参数
const FormContext = createContext<FormDataContextType>({
    formData: {},
    setFormData: () => {},
  });

const FormDataProvider = ({ children } : {children:any}) => {
  const [formData, setFormData] = useState<FormData>({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export  { FormContext, FormDataProvider };