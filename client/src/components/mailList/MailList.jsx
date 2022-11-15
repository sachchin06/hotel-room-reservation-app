import './mailList.css'

export const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitlle">Save time, Save money!</h1>
        <span className="mailDesc">Sign up and we will send</span>
        <div className="mailInputContainer">
            <input type="text" placeholder='Your Email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}
