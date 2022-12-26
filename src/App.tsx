import { ITheadGrid } from "@components/grilla/context"
import { Grilla } from "@components/index"


const ejemplo: ITheadGrid[] = [
  {
    label: "Acciones",
    param: "",
    isAction: true,
  },
  {
    label: "Descripción",
    param: "description",
    style: { minWidth: "1271px" },
  },
  { label: "Total titulares", param: "rues_total_titulares", filter: { signal: "=", type: "text", param: "rues_total_titulares" } },
  {
    label: "Titulares con email y teléfono",
    param: "rues_total_titulares_con_email_telefono",
  },
  {
    label: "Titulares encontrados",
    param: "rues_total_titulares_encontrados",
  },
  {
    label: "Titulares no encontrados",
    param: "rues_total_titulares_no_encontrados",
    canSort: true
  },
  { label: "Titulares pendientes", param: "rues_total_titulares_pendientes" },
  {
    label: "Titulares solo correo",
    param: "rues_total_titulares_solo_correo",
  },
  {
    label: "Titulares solo teléfono",
    param: "rues_total_titulares_solo_telefono",
    filter: { param: "rues_total_titulares_solo_telefono", groupSignal: "and", type: "number", signal: "contain" }
  },
  {
    label: "Progreso", param: "",
    style: { minWidth: "200px" },
  },
  {
    label: "Fech. creación", param: "createAt", canSort: true,
    filter: { param: "rues_total_titulares_solo_telefono", groupSignal: "and", type: "date", signal: "contain" }
  },
]

function App() {

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", flexDirection: "column", overflowX: "auto" }}>
      <Grilla thead={[...ejemplo]} url="yyyyyy" children={<tbody />} />
      {/* <Grilla thead={[{ label: "bbb", param: "bbbb" }]} url="zzzzzz" children={<tbody />} /> */}
    </div>
  )
}

export default App
