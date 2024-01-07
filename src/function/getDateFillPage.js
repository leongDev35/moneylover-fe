function getLastDayOfMonth(year, month) {
    // Note: month trong JavaScript đếm từ 0 đến 11 (0 là tháng 1, 11 là tháng 12)
    const lastDay = new Date(year, month + 1, 0);
    return lastDay.getDate();
}

function generateDateRangeObject(startYear, endYear, startMonth, endMonth) {
    const startDate = `${startYear}/${String(startMonth + 1).padStart(2, '0')}/01`;
    const endDate = `${endYear}/${String(endMonth + 1).padStart(2, '0')}/${getLastDayOfMonth(endYear, endMonth)}`;

    return  `${startDate} - ${endDate}`
        // Nếu cần thêm các trường khác, bạn có thể mở rộng đối tượng ở đây
   
}


export function generateDateRange() {
    const today = new Date();
    //! tìm ngày đầu và cuối tháng hiện tại
    let month = today.getMonth();
    let year = today.getFullYear();
    let obj = [
        {
            title: 'This month',
            range: generateDateRangeObject(year, year, month, month)
        },
        {
            title: 'Last month',
            range: month - 1 == -1 ? generateDateRangeObject(year - 1,year - 1, 11, 11) : generateDateRangeObject(year,year - 1, month - 1, month - 1)

        },
        {
            title: 'Last 3 months',
            range: month - 3 < 0 ? generateDateRangeObject(year - 1, month - 1 == -1?  year-1: year, 12 - (3- month), month - 1 == -1? 11: month -1) : generateDateRangeObject(year, year, month - 3, month - 1)

        },
        {
            title: 'Last 6 months',
            range: month - 6 < 0 ? generateDateRangeObject(year - 1, month - 1 == -1?  year-1: year, 12 - (6- month), month - 1 == -1? 11: month -1) : generateDateRangeObject(year, year, month - 6, month - 1)

        },
        {
            title: 'This year',
            range: generateDateRangeObject(year, year, 0, 11)

        }
        ,
        {
            title: 'Last year',
            range: generateDateRangeObject(year-1, year-1, 0, 11)

        }
    ]



    return obj

}