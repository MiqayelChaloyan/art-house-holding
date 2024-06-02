export const query = `
*[_type == "portfolio-design"] {
    "_id": _id,
    "image": image,
    "advantages": advantages[][$language],
}`;
