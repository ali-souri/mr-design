type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;

let cachedWebGLSupport: boolean | undefined;
let detectionCount = 0;

export function detectWebGLSupport(documentRef: Pick<Document, 'createElement'> = document) {
  if (cachedWebGLSupport !== undefined) return cachedWebGLSupport;

  detectionCount += 1;
  try {
    const canvas = documentRef.createElement('canvas');
    const context = (canvas.getContext('webgl2', { powerPreference: 'high-performance' }) || canvas.getContext('webgl')) as WebGLContext | null;
    cachedWebGLSupport = Boolean(context);
    if (context) {
      const loseContext = context.getExtension('WEBGL_lose_context');
      loseContext?.loseContext();
    }
    canvas.remove();
    canvas.width = 1;
    canvas.height = 1;
  } catch {
    cachedWebGLSupport = false;
  }

  return cachedWebGLSupport;
}

export function getWebGLDetectionCount() {
  return detectionCount;
}

export function resetWebGLCapabilityCacheForTests() {
  cachedWebGLSupport = undefined;
  detectionCount = 0;
}
