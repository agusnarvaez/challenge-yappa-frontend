export class Client {
    id: number
    name: string
    last_name: string
    birth_date: string | null
    cuit: string
    address: string | null
    phone_number: string
    email: string

    constructor(id: number, name: string, last_name: string, birth_date: string | null, cuit: string, address: string | null, phone_number: string, email: string) {
        this.id = id
        this.name = name
        this.last_name = last_name
        this.birth_date = birth_date
        this.cuit = cuit
        this.address = address
        this.phone_number = phone_number
        this.email = email
    }
}
export const emptyClient = new Client(0, '', '', '', '', '', '', '')
export type ListOfCLients = Client[]