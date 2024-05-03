"use client"

import React, { useState } from 'react';

export const FormDataContext = React.createContext<FormData | null>(null);

export const GlobalData = (formData:FormData) => {
  const [globalformData, setFormData] = useState<FormData | null>(null);
  setFormData(formData)

  return (
    <FormDataContext.Provider value={globalformData}/>
  );
}; 