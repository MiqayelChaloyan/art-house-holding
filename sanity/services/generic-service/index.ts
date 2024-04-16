export const partnersQuery = 
`*[_type == "partners"] {
    "company_name": company_name[$language],
    "cooperation": cooperation[$language],
    "implemented_projects": implemented_projects[$language],
    "_id": _id,
    "slug": slug.current,
    "logo": logo
}`;