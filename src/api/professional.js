import axios from '@/plugins/axios'

export function getEvaluationByTeacherName(likeInputValue, currentPage, pageSize) {
    return axios({
        url: "evaluateFinal/getEvaluationByTeacherName",
        method: "GET",
        params: {
            likeInputValue,
            currentPage,
            pageSize
        }
    })
}

export function getAllSubject() {
    return axios({
        url: "subject/getAllSubject",
        method: "GET"
    })
}

export function getFiveYearResult(subjectIds) {
    return axios({
        url: "result/getFiveYearResult",
        method: "GET",
        params: {
            subjectIds
        }
    })
}


export function getAllClass() {
    return axios({
        url: "class/getAllClass",
        method: "GET"
    })
}

export function getAllExamByClassId(key) {
    return axios({
        url: `exam/getAllExamByClassId/${key}`,
        method: "GET"
    })
}

export function getExaminationResults(classId, examId) {
    return axios({
        url: "result/getExaminationResults",
        method: "GET",
        params: {
            classId,
            examId
        }
    })
}

export function getTeachersBySubjectId(subjectId) {
    return axios({
        url: `teacherSubject/getTeachersBySubjectId/${subjectId}`,
        method: "GET"
    })
}

export function getLessonsByClassId(classId) {
    return axios({
        url: `lesson/getLessonsByClassId/${classId}`,
        method: "GET"
    })
}

export function getLessonsByTeacherId(teacherId) {
    return axios({
        url: `lesson/getLessonsByTeacherId/${teacherId}`,
        method: "GET"
    })
}

export function queryStudentListByClassId(classId) {
    return axios({
        url: `student/queryStudentListByClassId/${classId}`,
        method: "GET"
    })
}

export function judgePassword(password) {
    return axios({
        url: "/user/judgePassword",
        method: "POST",
        data: {
            password
        }
    })
}

export function updatePassword(password) {
    return axios({
        url: "/user/updatePassword",
        method: "put",
        data: {
            password
        }
    })
}

export function getEvaluationTime(){
    return axios({
        url:"/evaluate/getEvaluationTime",
        method:"GET"
    })
}


export function setCourseEvaluation(time){
    return axios({
        url:"/evaluate/setCourseEvaluation",
        method:"POST",
        data:{
            time
        }
    })
}
