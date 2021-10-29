import { isNull } from "lodash";

export default function checkTokenErrors() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const tokenExpiryTime = localStorage.getItem('expiry_time');
    if (isNull(tokenExpiryTime) || tokenExpiryTime === '' || timestamp > tokenExpiryTime)
        return 'expired';
    return false;
}
