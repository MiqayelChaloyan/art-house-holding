export const partnersQuery = 
`*[_type == "partners"] {
    "_id": _id,
    "company_name": company_name[$language],
    "cooperation": cooperation[$language],
    "implemented_projects": implemented_projects[$language],
    "logo": logo
}`;