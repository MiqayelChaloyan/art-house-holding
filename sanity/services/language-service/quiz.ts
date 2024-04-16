export const query = 
`*[_type == "languages-quiz"] {
    "_id": _id,
    "name": name,
    "question_logo": question_logo,
    "slug": slug.current,
    "questions": questions[] {
        "question": question,
        "slug": slug.current,
        "options": options,
        "answer": answer
    },
}`;

export const quizBySlugQuery = 
`*[_type == "languages-quiz" && slug.current == $slug] {
    "_id": _id,
    "name": name,
    "question_logo": question_logo,
    "slug": slug.current,
    "questions": questions[] {
        "question": question,
        "slug": slug.current,
        "options": options,
        "answer": answer
    },
}`;