import React from "react";

interface RefreshContextType {
    trigger: number;
    triggerRefresh: () => void;
  }

export // 在创建Context时，提供一个符合IRefreshContext形态的默认值
const RefreshContext = React.createContext<RefreshContextType>({
  trigger: 0,
  triggerRefresh: () => {},
});

export function RefreshProvider({ children }) {
    const [trigger, setTrigger] = React.useState(0);
    
    // 定义一个函数用于改变 trigger 的值
    const triggerRefresh = () => setTrigger(prevTrigger => prevTrigger + 1);
    
    return (
      <RefreshContext.Provider value={{ trigger, triggerRefresh }}>
        {children}
      </RefreshContext.Provider>
    );
  }
  