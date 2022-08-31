
import { showNewBoardAction, showImageModalAction } from '../../store/actions'


export const newboardHandler = (dispatch: any): void => {
  dispatch(showNewBoardAction(true))
  document.body.style.overflow = 'hidden'
}

export const imageModalHandler = (dispatch: any): void => {
  dispatch(showImageModalAction(true))
  document.body.style.overflow = 'hidden'
}
export const closeModal = (dispatch: any): void => {
  dispatch(showNewBoardAction(false))
  document.body.style.overflow = 'unset'
}
export const imageCloseModal = (dispatch: any): void => {
  dispatch(showImageModalAction(false))
  document.body.style.overflow = 'unset'
}

export function timeSince(date: Date) {

  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
}
