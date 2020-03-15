export const phone = (value: string) => /^[1]([3-9])[0-9]{9}$/.test(value);
export const idCard = (idcard: string)=> {
    const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdCard.test(idcard)) {
        return false;
    } else {
        return true;
    }
}