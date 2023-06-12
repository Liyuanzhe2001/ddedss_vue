import axios from "@/plugins/axios";

export function haveEvaluateCourseNotice() {
    return axios({
        url: "/evaluate/haveEvaluateCourseNotice",
        method: "GET"
    })
}

export function queryClassName() {
    return axios({
        url: "/student/queryClassName",
        method: "GET"
    })
}

export function queryTeacherListByClassId(classId) {
    return axios({
        url: `/teacher/queryTeacherListByClassId/${classId}`,
        method: "GET"
    })
}

export function gradeTeacher(gradeTeachers) {
    return axios({
        url: "/evaluateFinal/gradeTeacher",
        method: "POST",
        data: {
            ...gradeTeachers
        }
    })
}

export function getExamListByStudentId() {
    return axios({
        url: "/exam/getExamListByStudentId",
        method: "GET"
    })
}

export function getResultByExamId(examId) {
    return axios({
        url: `/result/getResultByExamId/${examId}`,
        method: "GET"
    })
}

export function getAvgScoreByExamId(examId) {
    return axios({
        url: `/result/getAvgScoreByExamId/${examId}`,
        method: "GET"
    })
}

export function queryKnowledgeList(currentPage, pageSize) {
    return axios({
        url: "/knowledge/queryKnowledgeList",
        method: "GET",
        params: {
            currentPage,
            pageSize
        }
    })
}
