import React, { useCallback } from "react"
import { useParams } from "react-router-dom"
import { getService } from "../queries"
import useStore from "../store"
import { useStore as useMessageStore } from "../messageStore"
import { useLocation } from "react-router-dom"
import {
  Icon,
  DataList,
  DataListRow,
  DataListCell,
  Stack,
  Spinner,
} from "juno-ui-components"

const ServiceDetail = () => {
  let { serviceId } = useParams()
  const location = useLocation()
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const setMessage = useMessageStore((state) => state.setMessage)
  const { isLoading, isError, isFetching, data, error } = getService(
    endpoint,
    serviceId
  )

  const placeholderData = location.state?.placeholderData
  console.log("service detail placeholderData: ", placeholderData)
  console.log("service detail DATA: ", data)

  return (
    <>
      {isLoading && !data ? (
        <Stack alignment="center">
          <Spinner variant="primary" />
          Loading details...
        </Stack>
      ) : (
        <>
          {!isError && (
            <>
              {data ? (
                <>
                  <DataList>
                    <DataListRow className="relative">
                      <DataListCell>
                        <Icon className="mr-2" icon="autoAwesomeMosaic" />{" "}
                        {data.Name}
                      </DataListCell>
                    </DataListRow>
                  </DataList>
                </>
              ) : (
                <Stack
                  alignment="center"
                  distribution="center"
                  direction="vertical"
                  className="h-full"
                >
                  <p>{`No details found for service id ${serviceId}`}</p>
                </Stack>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default ServiceDetail
