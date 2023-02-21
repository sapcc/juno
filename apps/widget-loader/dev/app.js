(() => {
  // src/index.js
  window.__junoWidgetLoader = window.__junoWidgetLoader || function() {
    const shimUrl = "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.js";
    window.process = { env: { NODE_ENV: "production" } };
    window.esmsInitOptions = {
      shimMode: true,
      mapOverrides: true
    };
    const originManifests = {};
    const originImportmaps = {};
    const loadShim = new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${shimUrl}"]`))
        return resolve(true);
      const shimScriptTag = document.createElement("script");
      shimScriptTag.setAttribute("async", true);
      shimScriptTag.setAttribute("src", shimUrl);
      shimScriptTag.onload = (e) => {
        resolve(true);
      };
      shimScriptTag.onerror = () => reject("Could not load es-module-shim");
      document.head.append(shimScriptTag);
    });
    const loadImportmap = async (importmapUrl) => {
      const importmapOrigin = new URL(importmapUrl).origin;
      if (document.querySelector(
        `script[data-juno-importmap="${importmapOrigin}"]`
      ))
        return Promise.resolve(true);
      await loadShim;
      originImportmaps[importmapOrigin] = originImportmaps[importmapOrigin] || fetch(importmapUrl).then((r) => r.json()).then((importmap) => {
        const script = document.createElement("script");
        script.setAttribute("type", "importmap-shim");
        script.setAttribute("data-juno-importmap", importmapOrigin);
        script.text = JSON.stringify(importmap);
        document.head.append(script);
      });
      return originImportmaps[importmapOrigin];
    };
    const loadManifest = async (origin) => {
      originManifests[origin] = originManifests[origin] || fetch(`${origin}/manifest.json`).then((res) => res.json()).then((manifest) => {
        if (!manifest)
          throw new Error(
            "===WIDGET LOADER: could not load manifest from ",
            origin
          );
        originManifests[origin] = manifest;
        return originManifests[origin];
      });
      return originManifests[origin];
    };
    const load = async () => {
      let currentScript = document.currentScript;
      if (!currentScript) {
        let scripts = document.getElementsByTagName("script");
        currentScript = scripts[scripts.length - 1];
      }
      let currentURL = new URL(currentScript.src);
      let {
        name,
        version = "latest",
        url,
        origin = currentURL.origin,
        importmapOnly,
        importmapUrl,
        showLoading,
        debug,
        dev,
        ...props
      } = currentScript.dataset;
      debug = debug === "true";
      showLoading = showLoading === "true";
      dev = dev === "true";
      const manifest = await loadManifest(origin);
      debug && console.log("===WIDGET LOADER: manifest", manifest);
      origin = manifest._global?.baseUrl || origin;
      debug && console.log("===WIDGET LOADER: origin", origin);
      if (!importmapUrl)
        importmapUrl = origin + manifest?._global?.importMap[dev ? "dev" : "prod"];
      debug && console.log("===WIDGET LOADER: params", {
        name,
        version,
        url,
        origin,
        importmapOnly,
        importmapUrl,
        showLoading,
        debug,
        dev,
        props
      });
      await loadImportmap(importmapUrl);
      const loadedEvent = new CustomEvent("junoImportmapLoaded", {
        detail: { origin: importmapUrl }
      });
      window.dispatchEvent(loadedEvent);
      if (importmapOnly === "true")
        return;
      let appURL = url;
      if (!appURL) {
        if (debug && (!manifest || !manifest[name] || !manifest[name][version])) {
          console.log(
            `===WIDGET LOADER: could not find app ${name} with version ${version} in manifest`
          );
        }
        appURL = new URL(manifest[name][version].entryFile, origin).href;
      }
      let appProps = { currentHost: url || origin };
      for (let key in props) {
        if (key.indexOf("props") === 0) {
          let newKey = key.replace("props", "");
          newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
          appProps[newKey] = props[key];
          appProps[newKey.toLowerCase()] = props[key];
        }
      }
      const appWrapper = document.createElement("div");
      appWrapper.setAttribute("data-juno-app", name || url);
      appWrapper.setAttribute("style", "height: 100%;");
      if (showLoading)
        appWrapper.textContent = "Loading...";
      if (debug)
        console.log(`===WIDGET LOADER: load ${appURL}`);
      importShim(appURL + "?" + Date.now()).then((app) => {
        const mount = app.mount || app.default;
        mount(appWrapper, { props: appProps });
      }).catch((error) => console.warn(error.message));
      currentScript.replaceWith(appWrapper);
    };
    return { load };
  }();
  window.__junoWidgetLoader.load();
})();
