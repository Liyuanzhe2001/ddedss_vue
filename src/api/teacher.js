import axios from "@/plugins/axios";

export function haveAnnounceResultsNotice() {
    return axios({
        url: "/result/haveAnnounceResultsNotice",
        method: "GET"
    })
}

export function queryClassAndSubjectByTeacherId() {
    return axios({
        url: "/teacher/queryClassAndSubjectByTeacherId",
        method: "GET"
    })
}

export function getManagedClass() {
    return axios({
        url: "/instructor/getManagedClass",
        method: "GET"
    })
}

export function queryStudentListByClassId(selectClassId) {
    return axios({
        url: `/student/queryStudentListByClassId/${selectClassId}`,
        method: "GET"
    })
}

export function queryTeacherListByClassId(selectClassId) {
    return axios({
        url: `/teacher/queryTeacherListByClassId/${selectClassId}`,
        method: "GET"
    })
}

export function queryTeacherSubjectLevel() {
    return axios({
        url: "/teacherSubject/queryTeacherSubjectLevel",
        method: "GET",
    })
}

export function queryKnowledgeListByTeacherId(currentPage, pageSize) {
    return axios({
        url: "/knowledge/queryKnowledgeListByTeacherId",
        method: "GET",
        params: {
            currentPage,
            pageSize
        }
    })
}

export function deleteKnowledge(knowledgeId) {
    return axios({
        url: `/knowledge/deleteKnowledge/${knowledgeId}`,
        method: "DELETE"
    })
}

export function getClassNameById(classId) {
    return axios({
        url: `/class/getClassNameById/${classId}`,
        method: "GET"
    })
}

export function getSubjectNameById(subjectId) {
    return axios({
        url: `/subject/getSubjectNameById/${subjectId}`,
        method: "GET"
    })
}

export function getStudentScoreList(classId, subjectId) {
    return axios({
        url: "/result/getStudentScoreList",
        method: "GET",
        params: {
            classId,
            subjectId
        }
    })
}

export function modifyStudentsScore(subjectId, students) {
    return axios({
        url: "/result/modifyStudentsScore",
        method: "PUT",
        data: {
            subjectId,
            ...students
        }
    })
}

export function addKnowledge(form) {
    return axios({
        url: "/knowledge/addKnowledge",
        method: "POST",
        data: {
            ...form
        }
    })
}

export function modifyTeacherSubjectLevel(subjectLevelList) {
    return axios({
        url: "/teacherSubject/modifyTeacherSubjectLevel",
        method: "PUT",
        data: {
            subjectLevelList
        }
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
        method: "PUT",
        data: {
            password
        }
    })
}

export function createInvite(selectClassId){
    return axios({
        url:`/teacher/createInvite/${selectClassId}`,
        method:"GET"
    })
}
