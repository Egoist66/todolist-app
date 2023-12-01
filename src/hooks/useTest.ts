export const useTest = () => {
    const expect = (prop: any) => {
        const toBe = (prop2: any) => {
            return prop === prop2
        }

        const toEqual = (prop2: any) => {
            return Object.is(prop, prop2)
        }


        return {
            toBe,
            toEqual
        }
    }

    const group = (name: string, prop1: any, prop2: any) => {
        console.group(name,  prop1)

        console.group(name, prop2)
    }

    const table = (arr: Array<{}>) => {
        arr.forEach(item => {
            console.table(item)
        })
    }

    return {
        expect,
        group,
        table
    }
}


