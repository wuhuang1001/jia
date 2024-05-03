import { FormData } from "../data-context/index";

export const analyse = (formData :FormData) => {
    const size = (formData.size as string | null)?.trim().replaceAll(":", "")
    var state
    var result
    
    if (size === undefined) {
        console.log("size undefined\n -------------")
        return { message: "undefined" }
    }else
    if (size === "" || size ==="0" ) {
        state = 0
        return {
            state: state,
            result: result
        }
    }else
    if (!/^\d{1,}$/.test(size)) {
        state = 0
        return {
            state: state,
            result: result
        }
    }
    var sizeNum = Number(size)
    if (sizeNum <= 5) {
        state = 1   
        return {
            state: state,
            result: result
        }
    }


    const change = (formData.change as unknown as number | null )
    if ( change === null) {
        console.log("change null\n ------------")
        return { message: "error" }
    } 
    if (change == 2) {
        const time = (formData.time as unknown as number | null )
        const kind = (formData.kind as unknown as number | null )
        if (time === null || kind ===  null) {
            console.log("time || kind null\n ------------")
            return { message: "error" }
        }
        if (kind == 1) {
            if (time >= 1 && time < 2){
                state = -1
                result = 12
                return {
                    state: state,
                    result: result
                }
            }else
            if (time >= 2) {
                state = 1
                return {
                    state: state,
                    result: result
                }
            }
        }
        if (kind == 2) {
            if (time < 5) {
                state = -1
                result = 12
                return {
                    state: state,
                    result: result
                }
            }else {
                state = 1
                return {
                    state: state,
                    result: result
                }
            }
        }
    }
    if (change == 1) {
        const length = (formData.length as unknown as number | null )
        if (length === null) {
            console.log("length null\n ------------")
            return { message: "error" }
        }
        if (length < 6) {
            state = -1
            result = 6
            return {
                state: state,
                result: result
            }
        }else 
        if (length < 8) {
            state = -1
            result = 3
            return {
                state: state,
                result: result
            }
        }else
        if (length < 20) {
            const sign = (formData.sign as unknown as number | null )
            if (sign === null) {
                console.log("sign null\n ------------")
                return { message: "error" }
            }
            if (sign == 1) {
                if (length < 10) {
                    state = "3b"
                    return {
                        state: state,
                        result: result
                    }
                }else {
                    state = 4
                    return {
                        state: state,
                        result: result
                    }
                }
            }else
            if (sign == 2) {
                if (length < 10) {
                    state = "3a"
                    return {
                        state: state,
                        result: result
                    }
                }else {
                    state = "3b"
                    return {
                        state: state,
                        result: result
                    }
                } 
            }
        }else
        if (length <= 30) {
            state = "3c"
            return {
              state: state,
              result: result
            }
        }
    }

};
