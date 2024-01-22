import { useEffect, useState } from "react"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import {SearchBar } from "../components/SearchBar/SearchBar"
import { ListOfCLients, emptyClient } from "../models/client"
import { clientsService } from "../services/clients"
import { ClientForm } from "../components/ClientForm/ClientForm"

export interface Notification {
  message:string
  type:string
}
const emptyNotification:Notification = {
  message:"",
  type:""
}

export default function Clients() {
    const [clients, setClients] = useState<ListOfCLients>([])
    const [searchValue, setSearchValue] = useState('')
    const [notification, setNotification] = useState(emptyNotification)
    const [reload, setReload] = useState(false)
    useEffect(() => {
        const fetchClients = async () => {
            try{
              const response = await clientsService.allInstances(searchValue)
              setClients(response)

            }
            catch(error:any){
              console.log(error)
              setNotification({
                message:"Error al obtener los clientes",
                type:"error"
              })
              setTimeout(() => {
                setNotification(emptyNotification)
              }, 5000)

            }
        }
        fetchClients()

    }, [reload])
    return (
      <>
        <Header />
        <main>
            {
              notification &&
              <div className={`notification notification_${notification.type}`}>
                <p>{notification.message}</p>
              </div>
            }
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} reload={reload} setReload={setReload} />
            <ClientForm  client={emptyClient} setNotification={setNotification}/>
            {
              clients.length > 0 ?
              clients.map((client) => <ClientForm key={client.id} client={client} edition setNotification={setNotification} />)
              :
              <p>No hay clientes</p>
            }
        </main>
        <Footer />
      </>
    )
  }