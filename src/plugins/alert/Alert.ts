import swal from 'sweetalert'
import { IAlert } from '../../interfaces/Alert'

export function AlertMsgInfo(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'info'
  })
}

export function AlertMsgSuccess(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'success'
  })
}

export function AlertMsgWarning(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'warning',
    dangerMode: true
  })
}

export function AlertMsgError(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'error',
    dangerMode: true
  })
}

export function AlertMsgWithButtonInfo(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'info',
    buttons: data.buttons
  })
}

export function AlertMsgWithButtonSuccess(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'success',
    buttons: data.buttons
  })
}

export function AlertMsgWithButtonWarning(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'warning',
    dangerMode: true,
    buttons: data.buttons
  })
}

export function AlertMsgWithButtonError(data: IAlert) {
  return swal({
    title: data.title,
    text: data.text,
    icon: 'error',
    dangerMode: true,
    buttons: data.buttons
  })
}