import axios from "@/plugins/axios"

export function addProfessional(professionalInfo) {
    return axios({
        url: "/admin/addProfessional",
        method: "POST",
        data: {
            ...professionalInfo
        }
    })
}

export function addTeacher(professionalInfo) {
    return axios({
        url: "/admin/addProfessional",
        method: "POST",
        data: {
            ...professionalInfo
        }
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

export function deleteKnowledge(knowledgeId) {
    return axios({
        url: `/admin/deleteKnowledge/${knowledgeId}`,
        method: "DELETE"
    })
}

export function queryAllUserList(searchInput, currentPage, pageSize) {
    return axios({
        url: "/admin/queryAllUserList",
        method: "GET",
        params: {
            searchInput,
            currentPage,
            pageSize
        }
    })
}

export function deleteUser(userId) {
    return axios({
        url: `/admin/deleteUser/${userId}`,
        method: "DELETE"
    })
}

export function initPassword(userId) {
    return axios({
        url: `/admin/initPassword/${userId}`,
        method: "PUT"
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

export function judgePassword(password) {
    return axios({
        url: "/user/judgePassword",
        method: "POST",
        data: {
            password
        }
    })
}
