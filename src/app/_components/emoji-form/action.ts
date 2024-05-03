"use server"

import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"
import { z } from "zod"
// import FormDataContext from './FormDataContext';  // 路径为你创建context的文件路径
// import AnalyseData from './AnalyseContext';  // 路径为你创建context的文件路径
// import { GlobalData } from "./form-data";
// import handler from "../../api/data";
import React, { createContext, useState, useEffect } from 'react';

const jwtSchema = z.object({
  ip: z.string(),
  isIOS: z.boolean(),
})

const ratelimit = {
  free: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(500, "1 d"),
  }),
  ios: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(3, "7 d"),
    prefix: "ratelimit:ios",
  }),
}

interface FormState {
  message: string
}

export async function createEmoji(prevFormState: FormState | undefined, formData: FormData): Promise<FormState | void> {
  const size = (formData.get("size") as string | null)?.trim().replaceAll(":", "")
  const length = (formData.get("length") as string | null)?.trim().replaceAll(":", "")
  const time = (formData.get("time") as string | null)?.trim().replaceAll(":", "")

  // const others = (formData.get("others") as string | null)?.trim().replaceAll(":", "")
  // const token = formData.get("token") as string | null
  // if (!size) return // no need to display an error message for blank prompts
  // const id = nanoid()
  // 在此处获得输入框内容
  // console.log(analyse(formData))
  // console.log("---------------------")
  // console.log(formData)
  // console.log(analyse(formData))
  // AnalyseData(analyse(formData))

  // console.log("---------------------")

  try {
    // const verified = await jwtVerify(token ?? "", new TextEncoder().encode(process.env.API_SECRET ?? ""))
    // const { ip, isIOS } = jwtSchema.parse(verified.payload)
    // const { remaining } = await (isIOS ? ratelimit.ios.limit(ip) : ratelimit.free.limit(ip))
    // if (remaining <= 0) return { message: "Free limit reached, download mobile app for unlimited access." }
    // const safetyRating = await replicate.classifyPrompt({ prompt })
    // alert(prompt)
    // const data = { id, prompt, safetyRating }
    // if (safetyRating >= 9) {
      // await prisma.emoji.create({ data: { ...data, isFlagged: true } })
      // return { message: "Nice try! Your prompt is inappropriate, let's keep it PG." }
    // }
    // await Promise.all([prisma.emoji.create({ data }), replicate.createEmoji(data)])
  } catch (error) {
    console.error(error)
    return { message: "Connection error, please refresh the page." }
  }

  // redirect(`/p/${id}`)
}
