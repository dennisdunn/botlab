
export default class CoordinateTransforms {
    constructor(props) {
    }

    static eventToDom(e) {
        var rect = document.getElementById(e.target.id).getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    static domToCartesian(point, offset) {
        return {
            x: point.x - offset.x,
            y: offset.y - point.y
        }
    }

    static cartesianToDom(point, offset) {
        return {
            x: point.x + offset.x,
            y: offset.y - point.y
        }
    }

    static polarToDom(point) {
        return {
            r: point.r,
            theta: 2 * Math.PI - point.theta
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
}