import dayjs from "dayjs";

type typeMonth = 'short' | 'full'

const DateFormat = (date: string | null, typeMonth: typeMonth, showTime: boolean = false) => {

    const thaiMonthAbbreviations = [
        "ม.ค.", // มกราคม
        "ก.พ.", // กุมภาพันธ์
        "มี.ค.", // มีนาคม
        "เม.ย.", // เมษายน
        "พ.ค.", // พฤษภาคม
        "มิ.ย.", // มิถุนายน
        "ก.ค.", // กรกฎาคม
        "ส.ค.", // สิงหาคม
        "ก.ย.", // กันยายน
        "ต.ค.", // ตุลาคม
        "พ.ย.", // พฤศจิกายน
        "ธ.ค."  // ธันวาคม
    ];

    const thaiMonths = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
    ];



    if (!date || date == null) {
        return ''
    }
    date = date.replace('T', ' ').split('.')[0]
    const d = dayjs(date)
    let time = ''
    if (showTime) {
        time = dayjs(date).format('HH:ss')
    }
    if (typeMonth == 'short') {
        return `${d.date()} ${thaiMonthAbbreviations[d.month()]} ${d.year() + 543} ${time}`
    }
    return `${d.date()} ${thaiMonths[d.month()]} ${d.year() + 543} ${time}`
}

export default DateFormat