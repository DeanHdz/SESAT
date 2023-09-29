import { Usuario } from "./ISESAT"

export interface PaginatedUser
{
  "items": Usuario[],
  "meta": {
    "totalItems": number,
		"itemCount": number,
		"itemsPerPage": number,
		"totalPages": number,
		"currentPage": number
  }
  "links": {
    "first": string,
		"previous": string,
		"next": string,
		"last": string
  }
}