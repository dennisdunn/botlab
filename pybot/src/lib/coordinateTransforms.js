
export default class CoordinateTransforms {
    constructor(offset) {
        this.offset = offset
    }

    /**
     * Convert a poloar coordinate to
     * canvas coordinates.
     */
    toCanvas(point) {
        if (point.unit === 'd') point.theta = CoordinateTransforms.toRadian(point.theta)
        var p = this.polarToCartesian(point)
        return this.cartesianToCanvas(p)
    }

    canvasToCartesian(point) {
        return CoordinateTransforms.canvasToCartesian(point, this.offset)
    }

    cartesianToCanvas(point) {
        return CoordinateTransforms.cartesianToCanvas(point, this.offset)
    }

    cartesianToPolar(point) {
        return CoordinateTransforms.cartesianToPolar(point)
    }

    polarToCartesian(point) {
        return CoordinateTransforms.polarToCartesian(point)
    }

    static toDegrees(radian) {
        return radian * 57.2958
    }

    static toRadian(degree) {
        return degree / 57.2958
    }

    static canvasToCartesian(point, offset) {
        return {
            x: point.x - offset.x,
            y: offset.y - point.y
        }
    }

    static cartesianToCanvas(point, offset) {
        return {
            x: point.x + offset.x,
            y: offset.y - point.y
        }
    }

    static cartesianToPolar(point) {
        let theta = Math.atan2(point.y, point.x);
        if (point.y < 0) theta += 2 * Math.PI
        return {
            r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
            theta: theta
        }
    }

    static polarToCartesian(point) {
        return {
            x: point.r * Math.cos(point.theta),
            y: point.r * Math.sin(point.theta)
        }
    }
}