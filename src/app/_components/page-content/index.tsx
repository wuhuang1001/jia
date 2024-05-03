import React from "react";
import { Suspense } from "react";
import { EmojiForm } from "../emoji-form";
import { ShowResult } from "../result-show/index";
import { FormDataProvider } from "../data-context/index";

interface PageContentProps extends React.PropsWithChildren {
  prompt?: string;
}

export const PageContent = ({ children, prompt }: PageContentProps) => {
  return (
    <>
      {/* 使用FormDataProvider包裹整个组件树 */}
      <FormDataProvider>
        <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">
          <h1 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
            在此处输入👇
          </h1>
          {/* <EmojiCount /> */}

          <div className="max-w-full space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
            <EmojiForm initialPrompt={prompt} />
            {children}
          </div>
        </div>

        <Suspense>
          <ShowResult />
          {/* <EmojiGrid prompt={prompt} /> */}
        </Suspense>
      </FormDataProvider>
    </>
  );
};