/**
 * Created by qgg on 2017/3/28.
 */
import * as types from '../types'
import api from '../../api'

const actions = {
  [types.POST_APPOINTMENT](comtext, {app_label, mobile, code}){
    console.log(app_label)
    return new Promise((resolve, reject) => {
      if(code.trim() == ''){
        reject({mes: '请输入预约码!'})
        return
      }
      if(mobile.trim() == ''){
        reject({mes: '请输入手机号码!'})
        return
      }
      if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobile.trim()))){
        reject({mes: '手机号码格式不正确!'})
        return
      }
      if(app_label == -1){
        reject({mes: '请选择手机类型!'})
        return
      }
      var data = {
        app_label:app_label,
        mobile:mobile,
        code:code
      }
      api.appointmentCreate(data).then(res => {
        console.log(res)
        resolve(res.data)
      },() => console.log('网络异常，请稍后重试!'))
    })
  }
}


export default {
  actions
}
