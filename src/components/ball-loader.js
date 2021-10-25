import style from "./ball-loader.module.css";


const BallLoader = () => {
  return (
    <div className={style.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default BallLoader