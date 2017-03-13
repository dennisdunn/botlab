
export default class CoordinateTransforms {
    constructor(props) {
        this.offset = props;
    }

    eventToDom(e) {
        var rect = document.getElementById(e.target.id).getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    domToCartesian(point, offset = this.offset) {
        return {
            x: point.x - offset.x,
            y: offset.y - point.y
        }
    }

    cartesianToDom(point, offset = this.offset) {
        return {
            x: point.x + offset.x,
            y: offset.y - point.y
        }
    }

    cartesianToPolar(point) {
        let theta = Math.atan2(point.y, point.x);
        theta = theta < 0 ? 2 * Math.PI + theta : theta;
        return {
            r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
            theta: theta
        }
    }

    polarToCartesian(point) {
        return {
            x: point.r * Math.cos(point.theta),
            y: point.r * Math.sin(point.theta)
        }
    }
}