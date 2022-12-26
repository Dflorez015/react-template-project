import dayjs from "dayjs";
/**
 * Gets the current date 
 * @returns 
 */
export const getCurrentDate = () => {
    let currentDate = dayjs().format('YYYY-MM-DDTHH:mm')
    return currentDate
}