import { type } from "os"

interface ArtistsPaginationQuery {
    year ?: number,
    limit : number,
    skip : number,
}

export type{
    ArtistsPaginationQuery
}