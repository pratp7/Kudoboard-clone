import { useEffect } from 'react'
import HeaderPageLayout from '../layouts/header-page-layout'
import CreateBoard from '../create-board/create-board'
import { useSelector } from 'react-redux'
import { formDataArraySelector, getIdSelector } from '../../store/reducers/datareducer'
import { taskTileDataFormatType } from '../utilities/constants'
import Loader from '../utilities/Loader'
const CreateTask = () => {
   const formArrayData:taskTileDataFormatType[] = useSelector(formDataArraySelector)
   const getID: string = useSelector(getIdSelector)
   let clickedFormArrayData = formArrayData.filter(item=> item?.idx === getID)[0]
   
  return (
    <HeaderPageLayout>
      <CreateBoard title={clickedFormArrayData?.title || ''} displayName={clickedFormArrayData?.creator || ''} posts={clickedFormArrayData?.posts || []} getID={getID}/>
    </HeaderPageLayout>
   )
}

export default CreateTask