
interface Props{
  text: string,
  className: string
}

export const Notification:React.FC<Props>=({text,className}) =>{

  return (
    <div className={className}>
      {text}
    </div>
  )
}