import Vue from 'vue'

Vue.filter('formatDate', (value) => {
  const date = new Date(Date.parse(value));
    if (!value) {
      return;
    }
    
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let monthIndex = date.getMonth();
    let monthName = months[monthIndex];
    return `${monthName} ${date.getFullYear()}`;
});
