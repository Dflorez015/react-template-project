import { ITheadGrid } from "@grilla/context"
import { Grilla } from "@grilla/index"
import { useGridInfo } from "@grilla/hooks"
import { NavBarMenu } from "@components/nav"
import { Fragment, useState } from "react"
import { CustomeModal } from "@ui/components/modal"
import { MenuItem } from "@szhsin/react-menu"
import { TdActionComponent, TdExpandGridButton, RowNestedGridExpanded } from "@ui/components/grilla/utils"


const ejemplo: ITheadGrid[] = [
  {
    label: "Acciones",
    param: "",
    isAction: true,
  },
  {
    label: "Expandir",
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
    <div style={{ display: "flex", gap: "1.4rem" }}>

      <NavBarMenu />

      <div style={{
        display: "flex", width: "100vw", height: "60vh", flexDirection: "column",
        overflowX: "auto", gap: "1.2rem", padding: "10px"
      }}>

        <Grilla thead={[...ejemplo]} url="yyyyyy" gridOptions={<GridOptions />} children={
          <AAA />
        } />

      </div>
    </div>
  )
}

const GridOptions = () => {
  const [modalStatus, setModalStatus] = useState({ first: false, second: false })
  return (
    <>
      <MenuItem onClick={() => setModalStatus({ ...modalStatus, first: true })}>Add Modal</MenuItem>


      <CustomeModal isOpen={modalStatus.first} shouldCloseOnEsc={true}
        onRequestClose={() => setModalStatus({ ...modalStatus, first: false })} closeButton>
        <div>Modal 1</div>
        <button onClick={() => setModalStatus({ ...modalStatus, first: false })}>Close</button>
        <button onClick={() => setModalStatus({ ...modalStatus, second: true })}>Modal 2</button>
      </CustomeModal>


      <CustomeModal isOpen={modalStatus.second} shouldCloseOnOverlayClick={false} onRequestClose={() => setModalStatus({ ...modalStatus, second: false })}>
        aaaaaaaaaaaaaaaa
        <button onClick={() => setModalStatus({ ...modalStatus, second: false })}>Close modal 2</button>
      </CustomeModal>
    </>
  )
}

function AAA() {
  const { queryParams, thead } = useGridInfo()

  return (
    <tbody>
      <tr>
        <TdActionComponent children={<TrActions />} />
        <TdExpandGridButton rowId="mondongo" />

        {thead.map(({ param, hiddeColumn, isAction }, index) => (
          <Fragment key={index}>
            {(!hiddeColumn && !isAction) && (
              <td>{param}</td>
            )}
          </Fragment>
        ))}
      </tr>

      <RowNestedGridExpanded rowId="mondongo">
        <>
          <Grilla thead={[...ejemplo2]} url="uuuuuu" gridOptions={<GridOptions />} withoutTopActions children={
            <BBB />
          } />
        </>
      </RowNestedGridExpanded>

    </tbody>
  )
}

function BBB() {
  const { queryParams, thead } = useGridInfo()
  return (
    <tbody>
      <tr><td>{queryParams}</td></tr>
    </tbody>
  )
}

const TrActions = () => {
  return <MenuItem>aaaaaaaaaaa</MenuItem>
}

export default App
