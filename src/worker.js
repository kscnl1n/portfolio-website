export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const originalPath = url.pathname;

    // Serve the homepage file for root requests.
    if (originalPath === "/") {
      url.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    // For extensionless paths like /pages/projects, try .html first.
    if (!originalPath.includes(".") && !originalPath.endsWith("/")) {
      const htmlUrl = new URL(url.toString());
      htmlUrl.pathname = `${originalPath}.html`;
      const htmlResponse = await env.ASSETS.fetch(new Request(htmlUrl.toString(), request));
      if (htmlResponse.status !== 404) {
        return htmlResponse;
      }
    }

    // For directory paths like /pages/, try /pages/index.html.
    if (originalPath.endsWith("/")) {
      const indexUrl = new URL(url.toString());
      indexUrl.pathname = `${originalPath}index.html`;
      const indexResponse = await env.ASSETS.fetch(new Request(indexUrl.toString(), request));
      if (indexResponse.status !== 404) {
        return indexResponse;
      }
    }

    // Fall back to direct static asset handling (e.g., /pages/resume.html, /assets/*).
    return env.ASSETS.fetch(request);
  },
};
