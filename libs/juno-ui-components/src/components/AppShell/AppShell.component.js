import React from "react"
import PropTypes from "prop-types"
import { AppBody } from "../AppBody/index"
import { PageHeader } from "../PageHeader/index"
import { MainContainer } from "../MainContainer/index"
import { ContentContainer } from "../ContentContainer/index"
import { ContentAreaHeading } from "../ContentAreaHeading/index"
import { ContentArea } from "../ContentArea/index"
import { PageFooter } from "../PageFooter/index"

/**
 * Body of the app. Treat this like the body tag of an html page.
 */
export const AppShell = ({ pageHeader, pageFooter, contentHeading, embedded, className, children, ...props }) => {
  return (
    <AppBody className={className} {...props}>
          
      { embedded ?
        <ContentArea>
          {children}
        </ContentArea>

        :

        <>
          { pageHeader && (typeof pageHeader === 'string' || pageHeader instanceof String) ?
            <PageHeader heading={pageHeader} />
            :
            pageHeader
          }
          {/* Wrap everything except page header and footer in a main container */}
          <MainContainer>
          
            <ContentContainer>
              <ContentAreaHeading heading={contentHeading} />
              {/* Content Area. This is the place to add the app's main content */}
              <ContentArea>
                {children}
              </ContentArea>
            </ContentContainer>
          </MainContainer>
          
          { pageFooter ?
            pageFooter
            :
            <PageFooter />
          }
        </>
      }

    </AppBody>
  )
}

AppShell.propTypes = {
  /** Pass either the PageHeader component or if you don't need to add any content to the page header pass a string to be used as the app name in the standard page header. */
  pageHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  /** Optional. If specified pass a PageFooter component. If undefined will use default PageFooter */
  pageFooter: PropTypes.element,
  /** Heading for the content area */
  contentHeading: PropTypes.string,
  /** Optional: Defaults to false. Set embedded to true if app is to be rendered embedded in another app/page. 
   * In this case only the content area and children are rendered, no header/footer or remaining layout components */
  embedded: PropTypes.bool,
  /** Add custom class name */
  className: PropTypes.string,
}

AppShell.defaultProps = {
  pageHeader: <PageHeader />,
  pageFooter: <PageFooter />,
  contentHeading: "",
  embedded: false,
  className: "",
}
