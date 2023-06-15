import ApiService from "./apiService"

/**
 * This module implements a service to retrieve alerts from AlertManager.
 * @module silenceService
 */

/**
 * This function implements the actual service.
 * @param {object} initialConfig
 */
function SilenceService(initialConfig) {
  const service = new Service(initialConfig)

  return service
}

export default SilenceService
