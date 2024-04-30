

type ButtonProps={
    type:'button'|'submit',
    title:string,
    icon?:JSX.Element,
    variant?:string,
    onClick?: () => void
}

const Button = ({type,title,icon,variant,onClick}:ButtonProps) => {
    return (
      <button
      type={type}
      onClick={onClick}
      className={` p-1.5 px-3   gap-3 rounded-full   ${variant}`}>
      <label className=' cursor-pointer'>{title}</label>
      {icon} 
      </button>
    )
  }
  
  export default Button