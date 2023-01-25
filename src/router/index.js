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
            }
        ],
    },
    {
        path: "/student",
        name: "student",
        component: StudentLayout,
        children: [
            {
                path: "",
                component: MyClassView,
            },
            {
                path: "my_class",
                name: "my_class",
                component: MyClassView,
            },
            {
                path: "knowledge_world",
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
        children: [
            {
                path: "",
                component: MyPublishView,
            },
            {
                path: "my_publish",
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
        children: [
            {
                path: "",
                component: StudentListView,
            },
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
                path: "course_evaluation",
                name: "course_evaluation",
                component: CourseEvaluationView,
            },

            {
                path: "results_analysis",
                name: "results_analysis",
                component: ResultsAnalysisView,
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
