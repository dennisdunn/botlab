
export default class CoordinateTransforms {
    constructor(offset) {
        this.offset = offset
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
        if (point.x < 0) theta = theta + Math.PI
        if (point.x > 0 && point.y < 0) theta = theta + 2 * Math.PI
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

    static polarToCanvas(point) {
        return {
            r: point.r,
            theta: 2 * Math.PI - point.theta
        }
    }

    static eventToCanvas(e) {
        var rect = document.getElementById(e.target.id).getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}