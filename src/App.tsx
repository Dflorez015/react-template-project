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
    isSearch: true
  },
  { label: "Total titulares", param: "rues_total_titulares", filter: { signal: "=", type: "text", param: "rues_total_titulares" } },
  {
    label: "Titulares con email y teléfono",
    param: "rues_total_titulares_con_email_telefono",
  },
  {
    label: "Titulares encontrados",
    param: "rues_total_titulares_encontrados",
    isSearch: true
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
    filter: { param: "rues_total_titulares_solo_telefono", groupSignal: "and", type: "number", signal: "contains" }
  },
  {
    label: "Progreso", param: "",
    style: { minWidth: "200px" },
  },
  {
    label: "Fech. creación", param: "createAt", canSort: true,
    filter: { param: "createAt", groupSignal: "and", type: "date", signal: "contains" }
  },
]

function App() {

  return (
    <>
      <div style={{ display: "flex", width: "100vw", height: "100vh", flexDirection: "column", overflowX: "auto" }}>
        <Grilla thead={[...ejemplo]} url="yyyyyy" children={<tbody />} />
      </div>

      <div style={{ display: "flex", width: "100vw", height: "100vh", flexDirection: "column", overflowX: "auto" }}>
        <Grilla thead={[{
          label: "Acciones",
          param: "",
          isAction: true,
        }, { label: "bbb", param: "bbbb", canSort: true }, { label: "sdddss", param: "ss" }]} url="zzzzzz" children={<tbody />} />
      </div>
    </>
  )
}

export default App
