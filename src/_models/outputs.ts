export type MemberListItem = {
    id:number,
    name:string,
    email:string,
    dataset:number,
    role:"admin" | "supervison" | "collector"
}