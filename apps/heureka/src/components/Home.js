import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Icon,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Container,
} from "juno-ui-components"
import {
  DetailSection,
  DetailSectionBox,
  DetailContentHeading,
  DetailSectionHeader,
} from "../styles"
import { getServices, getUsers } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import ServicesList from "./ServicesList"
import HintLoading from "./HintLoading"
import UsersList from "./UsersList"

const ITEMS_PER_PAGE = 10

const Home = () => {
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const [servicesPaginationOptions, setServicesPaginationOptions] = useState({
    limit: ITEMS_PER_PAGE,
    offset: 0,
  })
  const [servicesSearchOptions, setServicesSearchOptions] = useState({
    operators: "D038720",
  })
  const services = getServices(endpoint, {
    ...servicesPaginationOptions,
    ...servicesSearchOptions,
  })
  const [usersPaginationOptions, setUsersPaginationOptions] = useState({
    limit: ITEMS_PER_PAGE,
    offset: 0,
  })
  const [usersSearchOptions, setUsersSearchOptions] = useState({
    sapId: "D038720",
    sapId: "D058266",
  })
  const users = getUsers(endpoint, {
    ...usersPaginationOptions,
    ...usersSearchOptions,
  })

  console.log("HOME: ", services)

  return (
    <Container px={false}>
      {/* <h1 className={DetailContentHeading}>
        <Icon className="mr-2" icon="manageAccounts" /> Services Team
      </h1> */}
      <div className={DetailSection}>
        <div className={DetailSectionBox}>
          <DataGrid gridColumnTemplate="1fr 9fr">
            <DataGridRow>
              <DataGridCell>
                <b>Attr: </b>
              </DataGridCell>
              <DataGridCell>123</DataGridCell>
            </DataGridRow>
          </DataGrid>
        </div>
      </div>
      <div className={DetailSection}>
        <p className={DetailSectionHeader}>Support groups</p>
        <div className="mt-4">
          {users.isLoading && !users.data ? (
            <HintLoading text="Loading users..." />
          ) : (
            <UsersList users={users.data?.Results} />
          )}
        </div>
      </div>
      <div className={DetailSection}>
        <p className={DetailSectionHeader}>Owned services</p>
        <div className="mt-4">
          {services.isLoading && !services.data ? (
            <HintLoading text="Loading services..." />
          ) : (
            <ServicesList services={services.data?.Results} />
          )}
        </div>
      </div>
    </Container>
  )
}

export default Home
