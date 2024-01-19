import './clientForm.css'
import { Client } from '../../models/client'
import { useEffect, useState } from 'react'
import { clientsService } from '../../services/clients'
import { Input } from '../Input/Input'
import { Notification } from '../../pages/Clients'

interface Props {
  client: Client
  edition?:boolean
  setNotification: React.Dispatch<React.SetStateAction<Notification>>
}
const emptyNotification:Notification = {
  message:"",
  type:""
}
export interface HttpError {
  response?: {
    data?: {
      errors: { msg: string }[]
    }
  }
  msg?: string // Agregado para permitir errores de validación directos
}
export const ClientForm:React.FC<Props> = ({client,edition,setNotification})=> {
    const [name, setName] = useState(client.name)
    const [last_name, setLastName] = useState(client.last_name)
    const [birth_date, setBirthDate] = useState(client.birth_date || "")
    const [cuit, setCuit] = useState(client.cuit)
    const [address, setAddress] = useState(client.address || "")
    const [phone_number, setPhoneNumber] = useState(client.phone_number)
    const [email, setEmail] = useState(client.email)
    const [errors, setErrors] = useState<HttpError[]>([])
    const clearForm = () => {
      setName('')
      setLastName('')
      setBirthDate('')
      setCuit('')
      setAddress('')
      setPhoneNumber('')
      setEmail('')
    }
    const submitForm = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const clientToUpdate = new Client(client.id, name, last_name, birth_date!=""?birth_date:null, cuit, address!=""?address:null, phone_number, email)

      if(!edition){
        try{
          await clientsService.create(clientToUpdate)
          clearForm()
          setNotification({
            message:"Cliente creado correctamente",
            type:"success"
          })
          setTimeout(() => {
            setNotification(emptyNotification)
          }, 5000)
        }
        catch(error:any){
          console.log("errores",error.response.data.errors)
          setErrors(error.response.data.errors)
          setNotification({
            message:"Error al crear el cliente",
            type:"error"
          })
          setTimeout(() => {
            setErrors([])
            setNotification(emptyNotification)
          }, 5000)
          return error
        }

      }else{
        try{
          await clientsService.edit(clientToUpdate,client.id)
          setNotification({
            message:"Cliente editado correctamente",
            type:"success"
          })
          setTimeout(() => {
            setNotification(emptyNotification)
          }, 5000)
        }
        catch(error:any){
          console.log("errores",error.response.data.errors)
          setErrors(error.response.data.errors)
          setNotification({
            message:"Error al editar el cliente",
            type:"error"
          })
          setTimeout(() => {
            setErrors([])
            setNotification(emptyNotification)
          }, 5000)
          return error
        }
      }
    }

    const deleteClient = async (e:React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      try{
        await clientsService.delete(client.id)
        setNotification({
          message:"Cliente eliminado correctamente",
          type:"success"
        })
        setTimeout(() => {
          setNotification(emptyNotification)
        }, 5000)
      }
      catch(error:any){
        console.log("errores",error.response.data.errors)
        setErrors(error.response.data.errors)
        setNotification({
          message:"Error al eliminar el cliente",
          type:"error"
        })
        setTimeout(() => {
          setErrors([])
          setNotification(emptyNotification)
        }, 5000)

        return error
      }
    }
    useEffect(() => {
    }, [errors])
    return (
      <article className='user-form'>
        <form  onSubmit={submitForm}>
          <Input type="text" placeholder="Nombre" value={name} setValue={setName} id={`name-${client.id}`} label={'Nombre'} required setErrors={setErrors}/>
          <Input type="text" placeholder="Apellido" value={last_name} setValue={setLastName}id={`last_name-${client.id}`} label={'Apellido'} required  setErrors={setErrors}/>
          <Input type="date" placeholder="Fecha de Nacimiento" value={birth_date} setValue={setBirthDate}id={`birth_date-${client.id}`} label={'Fecha de Nacimiento'} setErrors={setErrors} />
          <Input type="text" placeholder="CUIT" value={cuit} setValue={setCuit}id={`cuit-${client.id}`} label={'CUIT'}required setErrors={setErrors}/>
          <Input type="text" placeholder="Dirección" value={address} setValue={setAddress}id={`address-${client.id}`} label={'Dirección'} setErrors={setErrors}/>
          <Input type="text" placeholder="Teléfono" value={phone_number} setValue={setPhoneNumber}id={`phone_number-${client.id}`} label={'Teléfono'} required setErrors={setErrors}/>
          <Input type="text" placeholder="Email" value={email} setValue={setEmail}id={`email-${client.id}`} label={'Email'} required setErrors={setErrors}/>
          <button className={edition?"user-form_button-edit":"user-form_button-add"}type="submit">{edition? "Guardar":"Agregar"}</button>
          {edition && <button className='user-form_button-delete' type="button" onClick={deleteClient}>Eliminar</button>}
        <div className='errors-container'>
        {errors&&errors.map((currentError,index)=>{ return <span key={index} className="error-message">{currentError.msg}</span>})}
      </div>
        </form>
      </article>
    )
  }