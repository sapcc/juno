import React from "react"
import PropTypes from "prop-types"
import { AppBody } from "../AppBody/index"
import { PageHeader } from "../PageHeader/index"
import { MainContainer } from "../MainContainer/index"
import { ContentContainer } from "../ContentContainer/index"
import { ContentAreaHeading } from "../ContentAreaHeading/index"
import { ContentArea } from "../ContentArea/index"
import { PageFooter } from "../PageFooter/index"
import { SideNavigation } from "../SideNavigation/"

/**
 * Body of the app. Treat this like the body tag of an html page.
 */
export const AppShell = ({ 
  children, 
  className,
  contentHeading, 
  embedded, 
  pageHeader, 
  pageFooter, 
  sideNavigation,
  topNavigation, 
  ...props 
}) => {
  return (
    <AppBody className={className} {...props}>
    
      { contentHeading && contentHeading.length ? 
          console.warn("AppShell: The contentHeading prop is obsolete and will be removed in a future version. In order to render a content heading, use a ContentHeading (TBD) element as a child in your main content.")
        :
          ""
      }
          
      { embedded ?
        <MainContainer>
          { sideNavigation && sideNavigation }
          <ContentContainer>
            {children}
          </ContentContainer>
        </MainContainer>

        :

        <>
          { pageHeader && (typeof pageHeader === 'string' || pageHeader instanceof String) ?
            <PageHeader heading={pageHeader} />
            :
            pageHeader
          }
          { topNavigation && topNavigation }
          {/* Wrap everything except page header and footer and navigations  in a main container: */}
          <MainContainer>
            { sideNavigation && sideNavigation }
            {/* Content Container. This is the place to add the app's main content */}
            <ContentContainer>
              {children}
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
  /** Pass either the `<PageHeader>` component or if you don't need to add any content to the page header pass a string to be used as the app name in the standard page header. */
  pageHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  /** Optional. If specified pass a `<PageFooter>` component. If undefined will use default PageFooter */
  pageFooter: PropTypes.element,
  /** Optional. If specified expects a `<TopNavigation>` component. If undefined no top navigation is rendered. */
  topNavigation: PropTypes.element,
  /** Optional. If specified expects a `<SideNavigation>` component. If undefined no side navigation is rendered. */ 
  sideNavigation: PropTypes.element,
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
  topNavigation: undefined,
  sideNavigation: undefined,
  contentHeading: "",
  embedded: false,
  className: "",
}
