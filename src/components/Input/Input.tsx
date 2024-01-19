import { HttpError } from "../ClientForm/ClientForm"

interface Props{
  type: string
  id: string
  label: string
  placeholder: string
  value: string|null
  setValue: React.Dispatch<React.SetStateAction<string>>
  required?: boolean
  setErrors: React.Dispatch<React.SetStateAction<HttpError[]>>
}

export const Input:React.FC<Props> = ({ type, id, label, placeholder, value, setValue, required,setErrors }) => {
  const validateEmail = (email:string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}]))$/
    return re.test(String(email).toLowerCase())
  }

  const validateCUIT = (cuit:string) => {
    const re = /^\d{2}-\d{8}-\d$/
    return re.test(cuit)
  }

  const validateInput = ()=>{
    console.log('validando input',type,value)

    switch (label) {
      case `Email`:
        if(!validateEmail(value!)){
          console.log('email invalido')
          setErrors((prevErrors)=>[...prevErrors,{msg:'Email inválido'}])
          setTimeout(() => { setErrors([])}, 5000)
        }
        break
      case `CUIT`:
        if(!validateCUIT(value!)){
          setErrors((prevErrors)=>[...prevErrors,{msg:'CUIT inválido'}])
          setTimeout(() => { setErrors([])}, 5000)
        }
        break
      default:
        break
    }
    return ''
  }

    return (
      <div className='user-form_inputContainer'>
        <label htmlFor={id}>{label}</label>

          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value??''}
            onChange={(e)=>setValue(e.target.value  )} // Actualiza el estado al cambiar el input
            onBlur={validateInput}
            {...(required && { required: true })}
          />
      </div>
    )
  }
