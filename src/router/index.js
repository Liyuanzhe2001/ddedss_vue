import {createRouter, createWebHistory} from 'vue-router'
import UserLayout from "@/layout/UserLayout";
import LoginView from "@/views/user/LoginView";
import RegisterView from "@/views/user/RegisterView";
import ForgetPwdView from "@/views/user/ForgetPwdView";
import StudentLayout from "@/layout/StudentLayout";
import MyClassView from "@/views/student/MyClassView";
import KnowledgeWorldView from "@/views/student/KnowledgeWorldView";
import ExamResultsView from "@/views/student/ExamResultsView";
import TeacherLayout from "@/layout/TeacherLayout";
import PublishKnowledgeView from "@/views/teacher/PublishKnowledgeView";
import MyPublishView from "@/views/teacher/MyPublishView";
import AnnounceResultsView from "@/views/teacher/AnnounceResultsView";
import EditClassGradeView from "@/views/teacher/EditClassGradeView";
import ProfessionalLayout from "@/layout/ProfessionalLayout";
import ScheduleCoursesView from "@/views/professional/ScheduleCoursesView";
import StudentListView from "@/views/professional/StudentListView";
import ResultsAnalysisView from "@/views/professional/ResultsAnalysisView";
import EvaluateCoursesView from "@/views/student/EvaluateCoursesView";
import KnowledgeShowLayout from "@/layout/KnowledgeShowLayout";
import CourseEvaluationView from "@/views/professional/CourseEvaluationView";
import ClassListView from "@/views/teacher/ClassListView";
import AdministratorLayout from "@/layout/AdministratorLayout";
import UserListView from "@/views/administrator/UserListView";
import KnowledgeListView from "@/views/administrator/KnowledgeListView";
import AddProfessionalView from "@/views/administrator/AddProfessionalView";
import AddTeacherView from "@/views/administrator/AddTeacherView";
import PerformanceTrendView from "@/views/professional/PerformanceTrendView";

const routes = [
    {
        path: '/',
        name: "user",
        component: UserLayout,
        redirect: '/login',
        children: [
            {
                path: "login",
                name: "login",
                component: LoginView,
            },
            {
                path: "register",
                name: "register",
                component: RegisterView,
            },
            {
                path: "forget_pwd",
                name: "forget_pwd",
                component: ForgetPwdView,
            },
        ],
    },
    {
        path: "/student",
        name: "student",
        component: StudentLayout,
        redirect: "/student/my_class",
        children: [
            {
                path: "my_class",
                name: "my_class",
                component: MyClassView,
            },
            {
                path: "knowledge_world/:currentPage",
                name: "knowledge_world",
                component: KnowledgeWorldView,
            },
            {
                path: "exam_results",
                name: "exam_results",
                component: ExamResultsView,
            },
            {
                path: "evaluate_courses",
                name: "evaluate_courses",
                component: EvaluateCoursesView,
            }
        ]
    },
    {
        path: "/knowledge/:id",
        name: "knowledge",
        component: KnowledgeShowLayout,

    },
    {
        path: "/teacher",
        name: "teacher",
        component: TeacherLayout,
        redirect: "/teacher/my_publish/1",
        children: [
            {
                path: "my_publish/:currentPage",
                name: "my_publish",
                component: MyPublishView,
            },
            {
                path: "class_list",
                name: "class_list",
                component: ClassListView,
            },
            {
                path: "publish_knowledge",
                name: "publish_knowledge",
                component: PublishKnowledgeView,
            },
            {
                path: "announce_results",
                name: "announce_results",
                component: AnnounceResultsView,
            },
            {
                path: "announce_results/:classId/:subjectId",
                name: "edit_class_grade",
                component: EditClassGradeView,
            }
        ]
    },
    {
        path: "/professional",
        name: "professional",
        component: ProfessionalLayout,
        redirect: "/professional/student_list",
        children: [
            {
                path: "student_list",
                name: "student_list",
                component: StudentListView,
            },
            {
                path: "schedule_courses",
                name: "schedule_courses",
                component: ScheduleCoursesView,
            },

            {
                path: "course_evaluation/:currentPage",
                name: "course_evaluation",
                component: CourseEvaluationView,
            },

            {
                path: "results_analysis",
                name: "results_analysis",
                component: ResultsAnalysisView,
            },
            {
                path: "performance_trend",
                name: "performance_trend",
                component: PerformanceTrendView,
            }
        ]
    },
    {
        path: "/admin/user_list",
        redirect: "/admin/user_list/1",
    },
    {
        path: "/admin",
        name: "admin",
        component: AdministratorLayout,
        redirect: "/admin/user_list/1",
        children: [
            {
                path: "user_list/:currentPage",
                name: "user_list",
                component: UserListView,
            },
            {
                path: "knowledge_list/:currentPage",
                name: "knowledge_list",
                component: KnowledgeListView,
            },
            {
                path: "add_teacher",
                name: "add_teacher",
                component: AddTeacherView,
            },
            {
                path: "add_professional",
                name: "add_professional",
                component: AddProfessionalView,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
