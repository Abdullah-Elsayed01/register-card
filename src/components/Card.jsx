import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useContext, useEffect, useRef, useState } from 'react';
import { userInfo } from '../Context';
function Card() { 
  const {account, setAccount} = useContext(userInfo);
  const [updatedAccount, setUpdatedAccount] = useState({userName: '', email: '', password: ''});
  const [checkAccount, setCheckAccount] = useState({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState({userName: '', email: '', password: ''})
  const [signIn, setSign] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [login, setLogin] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    resetInputValues(ref.current)
  }, [signIn])
  useEffect(() => {
    const allValid = Object.keys(account).every((key) => {
      return account[key] !== '';
    })
    if (allValid) {
      localStorage.setItem('account', JSON.stringify(account));
    }
  }, [account]); 
  const handleMessage = (inputType) => {
    setErrorMessage({...errorMessage, [inputType]: ''})
  }
  function capitalizeFirstLetter(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const handleChange = (inputType, value) => {
    if (signIn) {
      if (value) {
        if (inputType === 'userName') {
          const userRe = /\w+|\d+/ig;
          if (!(userRe.test(value))) {
            setErrorMessage({...errorMessage, [inputType] : `${capitalizeFirstLetter(inputType)} Invalid`})
            value = '';
          }
        } else if (inputType === 'email') {
          const emailRe = /(\w+|\d+)@\w+\.\w+/g;
          if (!(emailRe.test(value))) {
            setErrorMessage({...errorMessage, [inputType] : `${capitalizeFirstLetter(inputType)} Invalid`})
            value = '';
          }
        }
      } else {
        value = ''
      }
      setCheckAccount({...checkAccount, [inputType]: value})
    } else {
      if (value) {
        if (inputType === 'userName') {
          const userRe = /\w+|\d+/ig;
          if (!(userRe.test(value))) {
            setErrorMessage({...errorMessage, [inputType] : `${capitalizeFirstLetter(inputType)} Invalid`})
            value = '';
          }
        } else if (inputType === 'email') {
          const emailRe = /(\w+|\d+)@\w+\.\w+/g;
          if (!(emailRe.test(value))) {
            setErrorMessage({...errorMessage, [inputType] : `${capitalizeFirstLetter(inputType)} Invalid`})
            value = '';
          }
        }
        setUpdatedAccount({...updatedAccount, [inputType]: value})
      } else {
        value = '';
      }
    }
  }

  const resetInputValues = (formElement) => {
    if (!formElement) return;
    const c = [...formElement.elements]
    const c9 = c.filter((child) => child.localName === 'input')
    c9.forEach((input) => {
      input.value = '';
    })
    const clearedErrors = Object.keys(errorMessage).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setErrorMessage(clearedErrors);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (signIn) {
      const allValid = Object.keys(checkAccount).every((key) => {
        return checkAccount[key] !== '';
      })
      if (allValid) {
        const account = JSON.parse(localStorage.getItem('account'))
        if (account.email === checkAccount.email && account.password === checkAccount.password) {
          setLogin(true)
          resetInputValues(ref.current)
        } else {
          setErrorMessage({...errorMessage, email: 'Email or Password is Incorrect'})
        }
      } else {
        const newErrorMessages = {...errorMessage};
        Object.keys(checkAccount).forEach((key) => {
          if (checkAccount[key] === '' && newErrorMessages[key] === '') {
            let newMessage = `Please Enter ${capitalizeFirstLetter(key)}`
            newErrorMessages[key] = newMessage
          }
        })
        setErrorMessage(newErrorMessages)
      }
    } else {
      const allValid = Object.keys(updatedAccount).every((key) => {
        return updatedAccount[key] !== '';
      })
      if (allValid) {
        setAccount({...account, ...updatedAccount})
        resetInputValues(ref.current)
        setSign(true)
        setToggle(true)
        const show = setTimeout(() => {
          setToggle(false)
        }, 1500)
        return () => clearTimeout(show) 
    } else {
      const newErrorMessages = {...errorMessage};
      Object.keys(updatedAccount).forEach((key) => {
        if (updatedAccount[key] === '' && newErrorMessages[key] === '') {
          let newMessage = `Please Enter ${capitalizeFirstLetter(key)}`
          newErrorMessages[key] = newMessage
        }
      })
      setErrorMessage(newErrorMessages)
    }
  }
}
  return (
    <div>
      {login ? 
        <div className='login-message'>
          <p>Welcome To Your Account</p>
          <div className="check">
            <CheckCircleIcon/>
          </div>
        </div>
      :
        <>
          <div className="card">
            <header>
              <div className="button back"><KeyboardArrowLeftIcon /></div>
              <h1>Welcome There</h1>
            </header>
            <main>
              <form ref={ref} onSubmit={handleSubmit}>
                {signIn ? '' : 
                  <>
                    <input type="text" autoComplete='off' autoFocus placeholder="Username" id="userName" onBlur={(e) => handleChange('userName', e.target.value)} onChange={() => handleMessage('userName')}/>
                    {errorMessage.userName ? <p className='error-message'>{errorMessage.userName}</p>: ''}
                  </>
                }
                <input type="text" autoComplete='off' placeholder="Your Email" id="email" onBlur={(e) => handleChange('email', e.target.value)} onChange={() => handleMessage('email')}/>
                {errorMessage.email ? <p className='error-message'>{errorMessage.email}</p>: ''}
                <input type="password" placeholder="Password" id="password" onBlur={(e) => handleChange('password', e.target.value)} onChange={() => handleMessage('password')}/>
                {errorMessage.password ? <p className='error-message'>{errorMessage.password}</p>: ''}
                <div className="flex info">
                  <h2>{signIn ? 'Sign In':'Sign Up'}</h2>
                  <button type='submit' className='button next'>
                    <KeyboardArrowRightIcon />
                  </button>
                </div>
              </form>
            </main>
            <footer className="flex">
              <div onClick={() => setSign(!signIn)} className="sign">{signIn? 'Sign Up':"Sign In"}</div>
              {/* <div className="fPassword">Forgot Password</div> */}
            </footer>
          </div>
          {toggle ? <div className="message">Account Created Successfully</div>: ''}
        </>
      }
    </div>
  )
}
export default Card