import { useEffect } from 'react'
import HeaderPageLayout from '../layouts/header-page-layout'
import CreateBoard from '../create-board/create-board'
import { useSelector } from 'react-redux'
import { formDataArraySelector, getIdSelector } from '../../store/reducers/datareducer'
import { taskTileDataFormatType } from '../utilities/constants'
import { useNavigate } from 'react-router-dom'
const CreateTask = () => {
   const formArrayData:taskTileDataFormatType[] = useSelector(formDataArraySelector)
   const getID: number = useSelector(getIdSelector)
   const navigate = useNavigate()

   useEffect(()=>{
      if(!(formArrayData && formArrayData.length)){
         navigate('/dashboard')
      }
   }, [formArrayData, navigate])
   console.log(formArrayData,'formdata')
  return (
    <HeaderPageLayout>
        <CreateBoard title={formArrayData[getID]?.title || ''} displayName={formArrayData[getID]?.creator || ''} posts={formArrayData[getID]?.posts || []} getID={getID}/>
    </HeaderPageLayout>
   )
}

export default CreateTask