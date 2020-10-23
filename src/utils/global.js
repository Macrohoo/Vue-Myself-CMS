export default {
    install(Vue){
        /** 时间字符串
         * @method $getDateDiff
         * @param timespan
         */        
        Vue.prototype.$getDateDiff = function(timespan){
            var dateTime = new Date(timespan)
            var year = dateTime.getFullYear()
            var month = (dateTime.getMonth() + 1) < 10 ? "0" + (dateTime.getMonth() + 1) : (dateTime.getMonth() + 1)
            var day = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()
            var hour = dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours()
            var minute = dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes()
            var seconds = dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds()
            var now = new Date()
            var nowNew = now.getTime()
            var milliseconds = 0
            var timeSpanStr
            milliseconds = nowNew - dateTime
      
            if (milliseconds <= 1000 * 60 * 1) {
              timeSpanStr = "刚刚"
            } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
              timeSpanStr = Math.round((milliseconds / (1000 * 60))) + "分钟前"
            } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
              timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + "小时前"
            } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 3) {
              timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + "天前"
            } else if (milliseconds > 1000 * 60 * 60 * 24 * 3 && year === now.getFullYear()) {
              timeSpanStr = month + "-" + day + " " + hour + ":" + minute + ":" + seconds
            } else {
              timeSpanStr = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds
            }
            return timeSpanStr            
        }
    }
}