export default ({ evt, applyCameraOffset, domRef, pen, touch, onEnd }) => {
  const ctx = {
    evt,
    applyCameraOffset,
    domRef,
    pen,
    moved: 0,
    initialMouse: globalToLocal(evt, domRef),
    touch,
    onEnd,
  }
  ctx.onpanup = onPanUp.bind(null, ctx)
  ctx.onmove = onMove.bind(null, ctx)
  start(ctx)
}

const start = ctx => {
  ctx.touch.on('panmove', ctx.onmove)
  ctx.touch.on('panend', ctx.onpanup)
  window.addEventListener('mouseup', ctx.onpanup)
}

const onMove = (ctx, e) => {
  ctx.applyCameraOffset(minus(globalToLocal(e, ctx.domRef), ctx.initialMouse))
}

const stop = ctx => {
  ctx.touch.off('panmove', ctx.onmove)
  ctx.touch.off('panend', ctx.onpanup)
  window.removeEventListener('mouseup', ctx.onpanup)
  ctx.onEnd && ctx.onEnd()
}

const onPanUp = (ctx) => {
  stop(ctx)
}

const globalToLocal = (e, { svgPoint, svg }) => {
  svgPoint.x = e.center ? e.center.x : e.clientX
  svgPoint.y = e.center ? e.center.y : e.clientY
  const p = svgPoint.matrixTransform(svg.getScreenCTM().inverse())
  return { x: p.x, y: p.y }
}

const minus = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y })