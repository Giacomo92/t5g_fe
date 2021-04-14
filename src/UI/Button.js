import './Button.css'

const Button = ({ children, clicked, className }) => {
  return (
    <button onClick={clicked} className={className}>
      {children}
    </button>
  )
}

export default Button
