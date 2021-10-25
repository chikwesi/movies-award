import style from "./notification-banner.module.css";

const NotificationBanner = ({ onSetHasBanner, children }) => {
  return (
    <div >
      <button
        className="open-nominations"
        onClick={() => onSetHasBanner(false)}
      >  x close
      </button>
      <div className={style.flex}>
        <div>
          <h4 className={style.heading4}>
            Nominations Complete
          </h4>
          <p className={style.info}>
            You have reached the mximum number of nominations
          </p>
        </div>
        <div>
          <button className={style.submitButton}>submit</button>
          <button className={style.saveButton}>save</button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default NotificationBanner