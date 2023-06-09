import axios from '@/plugins/axios'

export function getEvaluationByTeacherName(likeInputValue,currentPage,pageSize) {
    return axios({
        url:"/evaluateFinal/getEvaluationByTeacherName",
        method:"GET",
        params:{
            likeInputValue,
            currentPage,
            pageSize
        }
    })
}

