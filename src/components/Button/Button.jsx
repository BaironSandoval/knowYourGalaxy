import "./Button.css"

const Button = ({ handlerClick }) => {
  return (
    <div>
        <button className="switch_btn" onClick={handlerClick}>
            <i class='bx bx-refresh'></i>
        </button>
    </div>
  )
}

export default Button