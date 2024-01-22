
import axios from 'axios'
import { Client } from '../models/client'

const rest_server_url = 'http://localhost:3000'
class ClientsService {
    async allInstances(search:string) {
        const buildParams = search ? `?search=`+search : ''
        const json = await axios.get(`${rest_server_url}/client${buildParams}`)
        const items = json.data.data.map((item:Client) => {
          return new Client(item.id, item.name, item.last_name, item.birth_date, item.cuit, item.address, item.phone_number, item.email)
        })
        return items
    }

    async create(item:Client) {
            return axios.post(`${rest_server_url}/client`, item)
    }

    async edit(item:Client,id:number) {
            return axios.patch(`${rest_server_url}/client/${id}`, item)
    }

    async delete(id:number) {
            return axios.delete(`${rest_server_url}/client/${id}`)
    }

    async get(id:number) {
            const response = await axios.get(`${rest_server_url}/client/${id}`)
            const client = response.data
            return new Client(client.id, client.name, client.last_name, client.birth_date, client.cuit, client.address, client.phone_number, client.email)
    }
}

export const clientsService = new ClientsService()