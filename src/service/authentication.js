import app from './connection'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from 'firebase/auth'
import axios from 'axios'

const authentication = getAuth(app)

export const signUpAccount = (account, alertSuccess, alertError, alertWarning) => {
    createUserWithEmailAndPassword(authentication, account.email, account.password)
    .then((userCredential) => {
        const user = userCredential.user
        const user_account = {
            email: user.email,
            username: account.username,
        }
        axios.post(`${process.env.REACT_APP_API}/sign-up-account`, user_account)
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', response.data.payload, 'ตกลง')
            }else{
                alertError('ล้มเหลว', 'การสร้างบัญชีล้มเหลว', 'ตกลง')
            }
        })
        .catch((error) => {
            alertError('ล้มเหลว', 'การสร้างบัญชีล้มเหลว', 'ตกลง')
        })
    })
    .catch((error) => {
        const errorCode = error.code
        if(errorCode === 'auth/invalid-email'){
            alertWarning('เตือน', 'รูปแบบอีเมลไม่ถูกต้อง', 'ตกลง')
        }else if(errorCode === 'auth/email-already-in-use'){
            alertWarning('เตือน', 'มีผู้ใช้งานอีเมลนี้แล้ว กรุณาเปลี่ยนอีเมล', 'ตกลง')
        }else{
            alertError('ผิดพลาด', 'เกิดข้อผิดพลาดที่ไม่รู้จัก', 'ตกลง')
        }
    })
}

export const signInAccount = (account, alertSuccess, alertError, alertWarning) => {
    signInWithEmailAndPassword(authentication, account.email.toLowerCase(), account.password)
    .then((userCredential) => {
        axios.post(`${process.env.REACT_APP_API}/sign-in-account`, {email: userCredential.user.email}, {withCredentials: true})
        .then((response) => {
            if(response.data.status){
                alertSuccess('สำเร็จ', "เข้าสู่ระบบสำเร็จ", 'ตกลง')
            }else{
                alertWarning('เตือน', response.data.payload, 'ตกลง')
            }
        })
        .catch((error) => {
            alertError('ผิดพลาด', 'เกิดข้อผิดพลาดที่ไม่รู้จัก', 'ตกลง')
        })
    })
    .catch((error) => {
        alertWarning('เตือน', 'ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง', 'ตกลง')
    })
}

export const resetPasswordAccount = (email, alertSuccess, alertError, alertWarning) => {
    sendPasswordResetEmail(authentication, email)
    .then(() => {
        alertSuccess('สำเร็จ', 'ส่งอีเมลแล้ว กรุณาตรวจสอบ', 'ตกลง')
    })
    .catch(() => {
        alertError('ล้มเหลว', 'การกู้คืนรหัสผ่านล้มเหลว', 'ตกลง')
    })
}

export const updatePasswordAccount = (email,oldPass,newPass,alertSuccess, alertError, alertWarning) => {
    signInWithEmailAndPassword(authentication,email,oldPass)
    .then((userCredential) => {
        const user = userCredential.user
        updatePassword(user,newPass)
        .then(() => {
            alertSuccess('สำเร็จ','แก้ไขรหัสผ่านเสร็จสิ้น','ตกลง')
        })
        .catch((error) => {
            // alertError('ล้มเหลว', 'การแก้ไขรหัสผ่านล้มเหลว ควรใส่รหัสผ่านอย่างน้อย 6 ตัวอักษร', 'ตกลง')
        })
    })
    .catch(() => {
        alertWarning('ล้มเหลว', 'รหัสผ่านเก่าไม่ถูกต้อง', 'ตกลง')
    })
    
}