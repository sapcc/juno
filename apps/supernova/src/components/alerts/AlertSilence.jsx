import React, { useMemo, useState } from "react"
import {
  Modal,
  Button,
  Box,
  Form,
  TextareaRow,
  TextInputRow,
  SelectRow,
  SelectOption,
  Stack,
  Icon,
} from "juno-ui-components"
import AlertLabels from "./AlertLabels"
import { Markup } from "interweave"
import { descriptionParsed } from "../../lib/utils"
import { useAuthData } from "../../hooks/useStore"

const detailsCss = (show) => {
  return `      
      transition-all
      ease-out
      max-h-0
      overflow-y-scroll
			${show ? "duration-1000 max-h-[34rem]" : `duration-300`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const AlertSilence = ({ alert }) => {
  const [displayNewSilence, setDisplayNewSilence] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const authData = useAuthData()

  const name = useMemo(() => {
    return authData?.parsed?.fullName
  }, [authData])

  return (
    <>
      <Button
        size="small"
        onClick={() => setDisplayNewSilence(!displayNewSilence)}
      >
        Silence
      </Button>
      {displayNewSilence && (
        <Modal
          title="New Silence"
          size="large"
          open={true}
          onCancel={function noRefCheck() {}}
          onConfirm={null}
        >
          <span className="text-lg">
            Alert <b>{alert?.labels?.alertname}</b>
          </span>

          <Stack className="mb-4" alignment="center" distribution="end">
            <div
              className="cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Stack alignment="center">
                <Icon
                  color="jn-global-text"
                  icon={showDetails ? "expandLess" : "expandMore"}
                />
                Show details
              </Stack>
            </div>
          </Stack>

          <div className="overflow-hidden">
            <div className={detailsCss(showDetails)}>
              <AlertLabels alert={alert} />
              <Box className="mt-4">
                <Markup
                  content={descriptionParsed(
                    alert.annotations?.description?.replace(
                      /`([^`]+)`/g,
                      "<code class='inline-code'>$1</code>"
                    )
                  )}
                  tagName="div"
                  className="text-theme-light"
                />
              </Box>
            </div>
          </div>

          <Form className="mt-4">
            <TextInputRow
              required
              label="Silenced by"
              value={name}
              disabled
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
            />
            <TextareaRow
              label="Description"
              onChange={function noRefCheck() {}}
              required
            />
            <SelectRow
              required
              label="Duration"
              defaultValue="2h"
              onChange={function noRefCheck() {}}
              onOpenChange={function noRefCheck() {}}
              onValueChange={function noRefCheck() {}}
            >
              <SelectOption label="2 hours" value="2h" />
              <SelectOption label="12 hours" value="12h" />
              <SelectOption label="1 day" value="1d" />
              <SelectOption label="3 days" value="3d" />
              <SelectOption label="7 days" value="7d" />
            </SelectRow>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default AlertSilence
