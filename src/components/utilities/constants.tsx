export type forUserType = {idx: number,firstName:string, lastName:string}

export type taskTileDataFormatType = {
    idx:string
    title: string,
    forUser: forUserType[],
    creator?: string,
    created?: string,
    posts: string[],
    lastPostCreated: string
}


const taskTileDataFormat:taskTileDataFormatType = {
    idx:'',
    title: '',
    forUser: [],
    creator: '',
    created : '',
    posts : [],
    lastPostCreated:''
}

export default taskTileDataFormat