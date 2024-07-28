import { ClientList } from "../Components/Dashboard/ClientList";

export const ClientsPage = () => {
  return (
    <div className="bg-light w-full">
    <h1 className="text-xl font-bold pt-12 pl-12">Liste des clients</h1>
    <h2 className="text-lg pl-12 mt-1">
        <span className="font-bold text-red-500">7</span> clients enregistrés 
        | <span className="font-bold text-red-500">14</span> réservations
    </h2>
    <ClientList />
</div>
  )
}
