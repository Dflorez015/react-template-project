import { ITheadGrid } from "@grilla/context"
import { Grilla } from "@grilla/index"
import { useGridInfo } from "@grilla/hooks"

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
  { label: "Titulares pendientes", param: "rues_total_titulares_pendientes", filter: { signal: "=", type: "text", param: "rues_total_titulares_pendientes" } },
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

const ejemplo2: ITheadGrid[] = [
  {
    label: "Acciones",
    param: "",
    isAction: true,
  },
  {
    label: "Titulares ffff",
    param: "titulares_fff",
    canSort: true,
  },
  {
    label: "Fech. creación", param: "createAt", canSort: true,
    filter: { param: "createAt", groupSignal: "and", type: "date", signal: "contains" },
    style: { width: "100px" }
  },
]

function App() {

  return (
    <>
      <div style={{ display: "flex", width: "100vw", height: "60vh", flexDirection: "column", overflowX: "auto", gap: "1.2rem" }}>
        <Grilla thead={[...ejemplo]} url="yyyyyy" children={
          <tbody >
            <tr><td>dds</td><td><AAA /></td></tr>
            <tr>
              <td>adasdsd</td>
              <td>
                <div style={{ width: "50vw", height: "40vh", padding: "1.2rem" }}>
                  <Grilla thead={[...ejemplo2]} url="lllll" withoutTopActions>
                    <tbody>
                      <tr><td><AAA /></td></tr>
                    </tbody>
                  </Grilla>
                </div>
              </td>
            </tr>
            <tr><td>adasdsd</td><td>jjjj</td></tr>
          </tbody>
        } />
      </div>
    </>
  )
}

function AAA() {
  const { queryParams } = useGridInfo()
  return (
    <>
      {queryParams}
    </>
  )
}

export default App
