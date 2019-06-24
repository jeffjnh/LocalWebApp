export const reportDate = (date) => {
    let month = dath.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    return date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + date.getHours() + ':' + minutes;
}

export const getFormateTime = (time) => {
    let minutes = "0" + Math.floor(time / 60);
    let seconds = "0" + (time - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}