import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AppThunk, AppThunkDispatch } from "../utils/types";
import { CursosPedagogicaResponse, CursosPedagogicaState } from "../utils/cursosState.model";
import axiosInstance from "../../services/api.services";

const initialState: CursosPedagogicaState = {
    cursos: [
        {
            descripcion: "En esta ocasión, te presento este curso, de formación docente, dirigido a administradores, directores, rectores de escuela, profesores, disertantes, instructivos, y todo quien quiera el sueño de dar clases de enseñar lo que saben. Como también todo público que requiera trabajar a distancia con su equipo de trabajo. En la era digital actual, la educación se ha transformado por completo, y la enseñanza en línea se ha convertido en una parte esencial de la experiencia educativa. Este curso Herramientas Digitales para Educación está diseñado para capacitar a educadores y profesionales de la enseñanza en el uso efectivo de herramientas digitales que mejoran la experiencia de aprendizaje en línea y en el aula.",
            ofertante: "Universidad de Cuenca",
            skills: [],
            titulo: "Curso Pedagogico para gestionar el aprendizaje con herramientas digitales y muchas cosas cheveres mas",
            url: "https://www.udemy.com/course/herramientas-digitales-para-gestionar-el-aprendizaje/",
            url_img: "https://img-c.udemycdn.com/course/480x270/3503396_7fe8_4.jpg",
            url_img_logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/2560px-Udemy_logo.svg.png"
        },
        {
            descripcion: "En esta ocasión, te presento este curso, de formación docente, dirigido a administradores, directores, rectores de escuela, profesores, disertantes, instructivos, y todo quien quiera el sueño de dar clases de enseñar lo que saben. Como también todo público que requiera trabajar a distancia con su equipo de trabajo. En la era digital actual, la educación se ha transformado por completo, y la enseñanza en línea se ha convertido en una parte esencial de la experiencia educativa. Este curso Herramientas Digitales para Educación está diseñado para capacitar a educadores y profesionales de la enseñanza en el uso efectivo de herramientas digitales que mejoran la experiencia de aprendizaje en línea y en el aula.",
            ofertante: "Universidad de Cuenca",
            skills: [
                "Aprender de forma simple a usar herramientas TICs para dar clases",
                "Como crear clases online de forma sencilla y eficaz",
                "Como crear clases disruptivas con Juegos didácticos en línea",
                "Evaluar con diversos cuestionarios on line, de forma divertida y educativa",
                "Como crear clases y que puedas administrar notas, calificaciones y evaluaciones de tus alumnos",
                "Como hacer mas interactivas con Aulas virtuales por medio de Aplicaciones de videollamadas grupales",
                "Creación de contenidos digitales, y mapas conceptuales en forma divertida",
                "Obtener capturas de pantalla de calidad, para crear el contenido digital que todo alumno quiere",
                "Crear y editar Crucigramas y sopa de letras, y otras dinámicas",
                "Crear cuestionarios para evaluar contenidos de forma sencilla",
                "Subir Videos a Youtube y emitir en directo",
                "Aprender a editor de Videos geniales facilidad",
                "Como crear presentaciones de clases con pizarras digitales interactivas"
            ]
            ,
            titulo: "Aprendiendo a aprender Poderosas herramientas mentales con las que podrás dominar temas difíciles Learning How to Learn",
            url: "https://www.coursera.org/learn/aprendiendo-a-aprender",
            url_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/07/afaf4999d64f6e86c092608620f500/logo.png?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=216&fit=crop&q=50",
            url_img_logo:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZpZXdCb3g9IjAgMCAxMTU1IDE2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiPjxwYXRoIGQ9Ik0xNTkuNzUgODEuNTRjMC00NC40OSAzNi42My04MC40NyA4Mi40My04MC40NyA0Ni4xMiAwIDgyLjc2IDM2IDgyLjc2IDgwLjQ3IDAgNDQuMTYtMzYuNjQgODAuOC04Mi43NiA4MC44LTQ1LjggMC04Mi40My0zNi42OC04Mi40My04MC44em0xMjUuNjEgMGMwLTIyLjI0LTE5LjMtNDEuODctNDMuMTgtNDEuODctMjMuNTUgMC00Mi44NSAxOS42My00Mi44NSA0MS44NyAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yIDIzLjkyIDAgNDMuMTgtMTkuNjMgNDMuMTgtNDIuMnptNzA1LjYzIDEuMzFjMC00OC43NCAzOS41OC04MS43OCA3NS41Ny04MS43OCAyNC41MyAwIDM4LjYgNy41MiA0OC4wOCAyMS45MmwzLjc3LTE5aDM2Ljc5djE1NS40aC0zNi43OWwtNC43NS0xNmMtMTAuNzkgMTEuNzgtMjQuMjEgMTktNDcuMSAxOS0zNS4zMy0uMDUtNzUuNTctMzEuMTMtNzUuNTctNzkuNTR6bTEyNS42MS0uMzNjLS4wOS0yMy41MjctMTkuNDctNDIuODM1LTQzLTQyLjgzNS0yMy41OSAwLTQzIDE5LjQxMS00MyA0M3YuMTY1YzAgMjEuNTkgMTkuMyA0MC44OSA0Mi44NiA0MC44OSAyMy44NSAwIDQzLjE0LTE5LjMgNDMuMTQtNDEuMjJ6TTk0NS43OCAyMlY0aC00MC4yM3YxNTUuMzloNDAuMjNWNzUuNjZjMC0yNS4xOSAxMi40NC0zOC4yNyAzNC0zOC4yNyAxLjQzIDAgMi43OS4xIDQuMTIuMjNMOTkxLjM2LjExYy0yMC45Ny4xMS0zNi4xNyA3LjMtNDUuNTggMjEuODl6bS00MDQuMjcuMDF2LTE4bC00MC4yMy4wOS4zNCAxNTUuMzcgNDAuMjMtLjA5LS4yMi04My43MmMtLjA2LTI1LjE4IDEyLjM1LTM4LjI5IDMzLjkzLTM4LjM0IDEuMzc2LjAwNCAyLjc1Mi4wODEgNC4xMi4yM0w1ODcuMSAwYy0yMSAuMTctMzYuMjIgNy4zOS00NS41OSAyMi4wMXpNMzM4Ljg4IDk5LjJWNC4wMWg0MC4yMlY5NC4zYzAgMTkuOTUgMTEuMTIgMzEuNzMgMzAuNDIgMzEuNzMgMjEuNTkgMCAzNC0xMy4wOSAzNC0zOC4yOFY0LjAxaDQwLjI0djE1NS4zOGgtNDAuMjF2LTE4Yy05LjQ4IDE0LjcyLTI0Ljg2IDIxLjkyLTQ2LjEyIDIxLjkyLTM1Ljk4LjAxLTU4LjU1LTI2LjE2LTU4LjU1LTY0LjExem0zOTEuNzQtMTcuNDhjLjA5LTQzLjUxIDMxLjIzLTgwLjc0IDgwLjYyLTgwLjY1IDQ1LjguMDkgNzguMTEgMzYuNzggNzggODAgLjAxIDQuMjczLS4zMyA4LjU0LTEgMTIuNzZsLTExOC40MS0uMjJjNC41NCAxOC42NSAxOS44OSAzMi4wOSA0My4xMiAzMi4xNCAxNC4wNiAwIDI5LjEyLTUuMTggMzguMy0xNi45NGwyNy40NCAyMmMtMTQuMTEgMTkuOTMtMzkgMzEuNjYtNjUuNDggMzEuNjEtNDYuNzUtLjE2LTgyLjY3LTM1LjIzLTgyLjU5LTgwLjd6bTExOC4xMi0xNi4xNGMtMi4yNi0xNS43LTE4LjU5LTI3Ljg0LTM3Ljg5LTI3Ljg3LTE4LjY1IDAtMzMuNzEgMTEuMDYtMzkuNjMgMjcuNzNsNzcuNTIuMTR6bS0yNjEuNCA1OS45NGwzNS43Ni0xOC43MmM1LjkxIDEyLjgxIDE3LjczIDIwLjM2IDM0LjQ4IDIwLjM2IDE1LjQzIDAgMjEuMzQtNC45MiAyMS4zNC0xMS44MiAwLTI1LTg0LjcxLTkuODUtODQuNzEtNjcgMC0zMS41MiAyNy41OC00OC4yNiA2MS43Mi00OC4yNiAyNS45NCAwIDQ4LjkyIDExLjQ5IDYxLjQgMzIuODNsLTM1LjQ0IDE4Ljc1Yy01LjI1LTEwLjUxLTE1LjEtMTYuNDItMjcuNTgtMTYuNDItMTIuMTQgMC0xOC4wNiA0LjI3LTE4LjA2IDExLjQ5IDAgMjQuMyA4NC43MSA4Ljg3IDg0LjcxIDY3IDAgMzAuMjEtMjQuNjIgNDguNTktNjQuMzUgNDguNTktMzMuODItLjAzLTU3LjQ2LTExLjE5LTY5LjI3LTM2Ljh6TTAgODEuNTRDMCAzNi43MyAzNi42My43NCA4Mi40My43NGMyNy45NDctLjE5NiA1NC4xODIgMTMuNzM3IDY5LjY3IDM3bC0zNC4zNCAxOS45MmE0Mi45NzIgNDIuOTcyIDAgMDAtMzUuMzMtMTguMzJjLTIzLjU1IDAtNDIuODUgMTkuNjMtNDIuODUgNDIuMiAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yYTQyLjUwMiA0Mi41MDIgMCAwMDM2LjMxLTIwbDM0IDIwLjI4Yy0xNS4zMDcgMjMuOTU1LTQxLjkwMiAzOC40MzEtNzAuMzMgMzguMjhDMzYuNjMgMTYyLjM0IDAgMTI1LjY2IDAgODEuNTR6IiBmaWxsPSIjMDA1NkQyIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4="
        },
        {
            descripcion: "En este curso se presenta el Modelo Multi Estratégico para la Enseñanza en Línea (MEL). Este modelo, que usa los últimos hallazgos sobre cómo aprendemos (neuroaprendizaje), permite establecer prácticas específicas y concretas que al usarse correctamente aumentan el aprovechamiento académico del estudiante. No solo mejorarás tus cursos en línea y la satisfacción de tus estudiantes de forma significativa, también estarás capacitado para ayudar a otros docentes a hacer lo mismo, ya que conocerás la razones detrás de cada decisión de diseño. Mi interés es que todos pueden crear experiencias educativas efectivas en línea. Se incluye en el curso las presentaciones para que luego de estudiar y aprobar el curso puedas capacitar a otros en este modelo.",
            ofertante: "Universidad de Cuenca",
            skills: [],
            titulo: "Modelo Multi Estratégico para la Enseñanza Efectiva en Línea",
            url: "https://www.udemy.com/course/modelo-multi-estrategico-para-la-ensenanza-efectiva-en-linea/",
            url_img: "https://img-b.udemycdn.com/course/480x270/3507240_3b88.jpg",
            url_img_logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/2560px-Udemy_logo.svg.png"
        }
    ],
    info: {
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 3,
        nextPage: null,
        prevPage: null,
        total: 3,
        totalPages: 1
    }

};

export const CursosPedagogicaGetAllSlice = createSlice({
    name: "getAllPedagogica",
    initialState,
    reducers: {
        CursosPedagogicaGetAllRequest: (state): CursosPedagogicaState => {
            return {
                ...state,
            };
        },
        CursosPedagogicaGetAllSuccess: (
            state,
            action: PayloadAction<CursosPedagogicaResponse>
        ): CursosPedagogicaState => {
            return {
                ...state,
                cursos: action.payload.respuesta.cursos,
                info: action.payload.respuesta.info,
            };
        },
        CursosPedagogicaGetAllReset: (): CursosPedagogicaState => {
            return initialState;
        },
    },
});

export const getCursosPedagogica =
    (page: number = 0, size: number = 3): AppThunk =>
        async (dispatch: AppThunkDispatch): Promise<void> => {
            dispatch(CursosPedagogicaGetAllRequest());
            try {
                const { data }: AxiosResponse<CursosPedagogicaResponse> =
                    await axiosInstance.get("/notice/list",
                        {
                            params: { page, size },
                        });
                dispatch(CursosPedagogicaGetAllSuccess(data));
            } catch (error) {
                console.log(error)
            }
        };

export const {
    CursosPedagogicaGetAllSuccess,
    CursosPedagogicaGetAllRequest,
    CursosPedagogicaGetAllReset,
} = CursosPedagogicaGetAllSlice.actions;

export const CursosPedagogicaGetAllReducer = CursosPedagogicaGetAllSlice.reducer;