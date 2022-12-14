export type forUserType = {idx: number,firstName:string, lastName:string}

export type taskTileDataFormatType = {
    idx:string
    title: string,
    image?: string,
    forUser: forUserType[],
    creator?: string,
    created?: string,
    posts:{post:string, image:string, idx:string}[],
    lastPostCreated: string
}


const taskTileDataFormat:taskTileDataFormatType = {
    idx:'',
    title: '',
    forUser: [],
    creator: '',
    created : '',
    posts : [],
    lastPostCreated:'',
    image:''
}

export default taskTileDataFormat