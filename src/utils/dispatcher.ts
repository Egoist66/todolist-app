
const _dispatcher = (payload: any[], dispatch: Array<(arg: any) => any>, ...actions: Array<(...arg:any) => any>) => {
    return actions.map((action, i) => {
        return  dispatch[i](action(payload[i]))
    })
}

export default _dispatcher
