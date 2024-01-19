
interface Props{
  type: string,
  id: string,
  label: string,
  placeholder: string,
  value: string|null,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const Input:React.FC<Props> = ({ type, id, label, placeholder, value, setValue }) => {

    return (
      <div className='user-form_inputContainer'>
        <label htmlFor={id}>{label}</label>

          <input
            type={type}
            id={id}
            placeholder={placeholder}
            value={value??''}
            onChange={(e)=>setValue(e.target.value  )} // Actualiza el estado al cambiar el input
          />
      </div>
    )
  }
