import HeaderPageLayout from '../layouts/header-page-layout'
import CreateBoard from '../create-board/create-board'
import { useSelector } from 'react-redux'
import { formDataArraySelector, getIdSelector } from '../../store/reducers/datareducer'
import { taskTileDataFormatType } from '../utilities/constants'

const styles = {
  backgroundColor: '#922F4D',
  fontWeight: 'bold',
  color:'white',
  height:'100vh',
  display:'flex',
  justifyContent:'center'
  
}
const CreateTask = () => {
   const formArrayData:taskTileDataFormatType[] = useSelector(formDataArraySelector)
   const getID: string = useSelector(getIdSelector)
   let clickedFormArrayData = formArrayData.filter(item=> item?.idx === getID)[0]
  return (
    <>
    {clickedFormArrayData ? <HeaderPageLayout>
       <CreateBoard title={clickedFormArrayData?.title} displayName={clickedFormArrayData?.creator || ''} posts={clickedFormArrayData?.posts} getID={getID}/>
    </HeaderPageLayout>: <div style={styles}>
        <h3>404 Not Found</h3>
      </div> }
    </>
   )
}

export default CreateTask