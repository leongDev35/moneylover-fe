export function getSurroundingDates(targetDateStr) {
    // Chuyển đổi ngày đích từ chuỗi sang đối tượng Date
    const targetDate = new Date(targetDateStr);

    // Tạo danh sách 20 ngày trước và 20 ngày sau
    const precedingDates = [];
    const followingDates = [];

    for (let i = 20; i > 0; i--) {
        const precedingDate = new Date(targetDate);
        precedingDate.setDate(targetDate.getDate() - i);
        precedingDates.push(precedingDate.toISOString().split('T')[0]);
    }

    for (let i = 1; i <= 20; i++) {
        const followingDate = new Date(targetDate);
        followingDate.setDate(targetDate.getDate() + i);
        followingDates.push(followingDate.toISOString().split('T')[0]);
    }

    // Kết hợp danh sách và sắp xếp chúng theo thứ tự tăng dần
    const surroundingDates = precedingDates.concat(targetDateStr, followingDates);

    return surroundingDates;
}

// Sử dụng hàm với ngày cụ thể
const targetDateStr = '2023-01-01';
const resultDates = getSurroundingDates(targetDateStr);
console.log(resultDates);

//! Lấy 20 tháng trước tháng hiện tại và trả về một mảng các đối tượng chứa tháng từ táng hiện tại để lấy tiêu đề và các id của pill
export function getPast20Months() {
    const today = new Date();
    const result = [];
  
    for (let i = 0; i < 20; i++) {
      const pastMonth = new Date(today);
      pastMonth.setMonth(today.getMonth() - i);
      let month = pastMonth.getMonth();
      let year = pastMonth.getFullYear();
        console.log(`${month}-${year}`);
        // console.log(year);
      // Định dạng ngày tháng theo ý muốn, ví dụ: "Tháng Năm"
      const formattedMonth = new Intl.DateTimeFormat('vi-VN', { year: 'numeric', month: 'long' }).format(pastMonth);
      const idMonthYear = `${month}-${year}`

      let obj = {
        idMonthYear: idMonthYear,
        formattedMonth: formattedMonth
      }
      result.push(obj);
    }
  
    return result;
  }
  
  // Sử dụng hàm để lấy mảng 20 tháng trước
  const past20Months = getPast20Months();
  console.log(past20Months);