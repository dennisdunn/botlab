/**
 * Exposes the coordinate transform library as
 * a service.
 */
import Coord from 'libcoord'

const origin = { x: 150, y: 150 }

const lib = new Coord(origin)

export default lib