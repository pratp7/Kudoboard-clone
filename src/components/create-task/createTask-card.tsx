import React, {useState} from 'react'
import closeIcon from '../../images/closeicon.png'
import classes from '../css/createTask.module.css'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {closeModal as closeModalFunc} from '../utilities/methods'
import {useSelector} from 'react-redux'
import {userSelector, displayNameSelector} from '../../store/reducers/authreducer'
import taskTileDataFormat from '../utilities/constants'
import {sendData} from '../../store/actions'
import { bindActionCreators } from 'redux'
import {v4} from 'uuid'

type Props = {
  closeModal?: () => void
}

const CreateTaskCard = ({closeModal}: Props) => {
  const [formData, setFormData] = useState(taskTileDataFormat)
  const [forUsers, setForUsers] = useState([{idx:0,firstName:'', lastName:''}])
  const user = useSelector(userSelector)
  const displayName = useSelector(displayNameSelector)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const formDataFunc = bindActionCreators(sendData, dispatch)

  const submitHandler = (e:React.FormEvent<HTMLFormElement>) : void => {
    e.preventDefault()
    closeModalFunc(dispatch)
    formDataFunc(formData)
    setFormData(taskTileDataFormat)
    user ? navigate(`/dashboard/createboard/${formData.idx}`) : navigate('/login-page')

  }

  const createAnotherLabel = (e: React.SyntheticEvent): void => {
    e.preventDefault()
    const newUser = [...forUsers, {idx: forUsers.length, firstName: '', lastName:''}]
    setForUsers(newUser)

  }

  const formDataHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      title: e.target.value,
      creator: displayName,
      created: new Date().toLocaleDateString(),
      idx: v4()
    })
    
  }

  const formDataHandlerUser = (e:React.ChangeEvent<HTMLInputElement>, id: number):void => {
    type forNames = {
      firstName: string,
      lastName: string
    }
    const {name, value} = e.target
    let newArr = [...forUsers]
    newArr[id][name as keyof forNames] = value
    setForUsers(newArr)
    setFormData({
      ...formData,
      forUser: forUsers
    })

  }

  const deleteInput = (id: number):void => {
    const updatedUsers = forUsers.filter((item) => item.idx !==id)
    setForUsers(updatedUsers)
    setFormData({
      ...formData,
      forUser: updatedUsers
    })
  }
  return (
    <div className={classes['create-task-card']}>
      <header>
        <h1>Create new Kudoboard</h1>
        {closeModal && <img src={closeIcon} alt="close-icon" onClick={closeModal} />}
      </header>
      <hr />
      <form className={classes['create-task-form']} onSubmit={submitHandler}>
        <section>
       <label><h3>Who is this kudoboard for?</h3></label>
       <div className={classes['input-style']}>
        {forUsers.map((item) => (
            <div key={item.idx}>
              <input type='text' name='firstName'placeholder='First name' onChange={(e)=>formDataHandlerUser(e,item.idx)} required value={item.firstName} />
              <input type='text' name='lastName' placeholder='Last Name' onChange={(e)=>formDataHandlerUser(e,item.idx)} required value={item.lastName} />
              {item.idx!==0 && <span className={classes['cross-icon']} onClick={()=>deleteInput(item.idx)}>X</span>}
            </div>
        ))}
       </div>
       <button className={forUsers.length<5 ? classes['add-recipient']:''} onClick={createAnotherLabel} disabled={forUsers.length>=5}> <span>+</span> Add Another Recipient</button>
       </section>
       <section>
        <label htmlFor='title'><h3>What title would you like on top of the Kudoboard?</h3></label>
        <div><input type='text' name='title' placeholder={`Happy Bday, Get Well Soon, You're Amazing, etc.`} onChange={formDataHandler} value={formData.title} required /></div>
       </section>
       <section>
        <button type='submit' className={classes['create-board-button']}>Create Board</button>
       </section>
      </form>
    </div>
  )
}

export default CreateTaskCard